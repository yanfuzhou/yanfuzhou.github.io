import io
import os
import sys
import json
import time
import uuid
import Queue
import requests
import subprocess
import numpy as np
from osgeo import ogr
import multiprocessing
from threading import Thread
from datetime import datetime
from pygeotile.tile import Tile
from PIL import Image, ImageDraw
from pyproj import Proj, transform

# field
field = 'sample'
# plot id
plot_id = 123456789098765
# output fixed image
# set to False to use scaled
fixed = True
fixed_length = 128
# Zoom level
# reference: https://wiki.openstreetmap.org/wiki/Zoom_levels
# level 19 | x: 11.748678 inches/pixel, y: 11.761931 inches/pixel
# level 20 | x: 5.874339 inches/pixel, y: 5.880965 inches/pixel
# level 21 | x: 2.937170 inches/pixel, y: 2.940483 inches/pixel
# level 22 | x: 1.468585 inches/pixel, y: 1.470241 inches/pixel
# level 23 | x: 0.734292 inches/pixel, y: 0.735121 inches/pixel
# level 24 | x: 0.367146 inches/pixel, y: 0.367560 inches/pixel
# level 25 | x: 0.183573 inches/pixel, y: 0.183780 inches/pixel
# level 26 | x: 0.091787 inches/pixel, y: 0.091890 inches/pixel
if fixed:
    zoom = 21
else:
    zoom = 24
# plot file path
plot_file = field + "_{}.geojson".format(str(plot_id))
# TMS endpoints
url = "http://localhost:9000/"
# COG endpoints
uri = "http://localhost/" + field
# uri = "http://localhost/demo/cogs/" + field
# COG metadata
band = 1
weight = 1
# use multi threads
turbo_boost = True
# number of threads
if turbo_boost:
    num_threads = multiprocessing.cpu_count()
else:
    num_threads = 1
# debug flag
debug = False
# output cropped image to local
save_to_local = True
# use dummy?
dummy = False


class CogForm(object):
    def __init__(self, _id=str(uuid.uuid4()), _band=band, _uri=uri, _weight=str(weight)):
        self.id = _id
        self.band = _band
        self.uri = _uri
        self.weight = _weight


def param_map(cf):
    payload = dict()
    payload[cf.id] = dict()
    payload[cf.id]['band'] = cf.band
    payload[cf.id]['uri'] = cf.uri
    payload[cf.id]['weight'] = cf.weight
    return payload


class TmsSession(object):
    def __init__(self, cog_app_id=str(uuid.uuid4()), payload=param_map(CogForm())):
        self.cog_app_id = cog_app_id
        self.payload = payload

    def create(self):
        try:
            headers = {'Content-Type': "application/json"}
            response = requests.request("POST", url + self.cog_app_id, data=json.dumps(self.payload), headers=headers)
            if debug:
                print "status: %s" % str(response.status_code)
                print "message: Get 500 because GeoTrellis TMS OverlayServer never return anything"
        except Exception as e:
            print "error: %s" % str(e)


def read_geometry():
    with open(plot_file, 'r') as f:
        json_string = json.loads(f.read())
    f.close()
    return json_string['features'][0]['geometry']


def get_tms_index(longitude, latitude):
    tile = Tile.for_latitude_longitude(longitude=longitude, latitude=latitude, zoom=zoom)
    y = (2 ** zoom) - tile.tms_y - 1
    return [str(tile.tms_x), str(y), tile]


def get_min_max_range(a, b, c, d):
    r = set()
    r.add(a)
    r.add(b)
    r.add(c)
    r.add(d)
    return min(list(r)), max(list(r))


def fill_range_gap(a):
    r = list()
    for i in range(int(a[0]), int(a[-1]) + 1, 1):
        r.append(i)
    return r


def get_2d_matrix(xs, ys):
    r = list()
    for i in xs:
        for j in ys:
            r.append([str(i), str(j)])
    return r


def get_tile(app_id, xy, tile_path, img_bins, querystring):
    try:
        headers = dict()
        _url = url + app_id + '/' + str(zoom) + '/' + '/'.join(xy) + '.png'
        response = requests.request("GET", _url, headers=headers, stream=True, params=querystring)
        if debug:
            print "status: %s" % str(response.status_code)
        if response.status_code == 200:
            img = Image.open(io.BytesIO(response.content))
            if debug:
                img.save(tile_path)
            img_bins.append(img)
            return True
        else:
            return False
    except Exception as e:
        print "error: %s" % str(e)


def _get_tiles(cog_app_id, plot_indices, img_bins, querystring, q):
    for xy in plot_indices:
        # get a tile by index
        _get_tile(cog_app_id, xy, img_bins, querystring, q)


def _get_tile(app_id, xy, img_bins_dict, querystring, q):
    tile_name = str(zoom) + '_' + '_'.join(xy) + '.png'
    try:
        headers = dict()
        _url = url + app_id + '/' + str(zoom) + '/' + '/'.join(xy) + '.png'
        response = requests.request("GET", _url, headers=headers, stream=True, params=querystring)
        if debug:
            print "status: %s" % str(response.status_code)
        if response.status_code == 200:
            # output file path
            tile_path = os.path.join(str(plot_id), tile_name)
            img = Image.open(io.BytesIO(response.content))
            if debug:
                img.save(tile_path)
            img_bins_dict['_'.join(xy)] = img
            q.put(img_bins_dict)
        else:
            print "error: %s - can't get tile: %s" % (response.status_code, tile_name)
    except Exception as e:
        print "error: %s" % str(e)


def get_tiles(plot_indices):
    # create a TMS session
    tms = TmsSession()
    tms.create()
    if debug:
        print "cog_app_id: %s" % tms.cog_app_id
        print "cog_json: %s" % json.dumps(tms.payload)
    # ensure the output folder for the plot exist
    if debug:
        if not os.path.exists(str(plot_id)):
            os.mkdir(str(plot_id))
    # save all tiles binary into a list
    img_bins = list()
    valid_indices = list()
    # ensure use same dummy string
    querystring = None
    if dummy:
        querystring = dict(dummy=str(uuid.uuid4()))
    if len(plot_indices) > num_threads > 1:
        print "number of threads: %s" % num_threads
        img_bins_dict = dict(('_'.join(xy), None) for xy in plot_indices)
        _plot_indices = _chunk_it(plot_indices, num_threads)
        threads = list()
        q = Queue.Queue()
        for i in range(num_threads):
            thread = Thread(target=_get_tiles, args=(tms.cog_app_id, _plot_indices[i], img_bins_dict, querystring, q))
            thread.start()
            threads.append(thread)
        for j in threads:
            j.join()
        result = q.get()
        img_bins = list(result['_'.join(xy)] for xy in plot_indices if result['_'.join(xy)] is not None)
        valid_indices = list(xy for xy in plot_indices if result['_'.join(xy)] is not None)
    else:
        # loop through each TMS indices
        for xy in plot_indices:
            # output file path
            tile_name = str(zoom) + '_' + '_'.join(xy) + '.png'
            tile_path = os.path.join(str(plot_id), tile_name)
            # get a tile by index
            if get_tile(tms.cog_app_id, xy, tile_path, img_bins, querystring):
                valid_indices.append(xy)
                if debug:
                    print "tile name: %s" % tile_name
    if len(valid_indices) <= len(plot_indices):
        missed_num = len(plot_indices) - len(valid_indices)
        if missed_num > 0:
            print "total missing %s tiles" % str(len(plot_indices) - len(valid_indices))
        return img_bins, valid_indices
    else:
        print "really? some wired happens here, only God knows the reason!"


def chunk_it(seq, num):
    return list(seq[i:i + num] for i in xrange(0, len(seq), num))


def _chunk_it(seq, num):
    avg = len(seq) / float(num)
    out = []
    last = 0.0
    while last < len(seq):
        out.append(seq[int(last):int(last + avg)])
        last += avg
    return out


def _img_merge(xy_offsets_img_dict_list, new_im, q):
    for xy_img in xy_offsets_img_dict_list:
        new_im.paste(xy_img[1], xy_img[0])
    q.put(new_im)


def img_merge(img_bins, xs, ys, width, height):
    # reference
    # https://stackoverflow.com/questions/30227466/combine-several-images-horizontally-with-python
    total_width = len(xs) * width
    total_height = len(ys) * height
    new_im = Image.new('RGBA', (total_width, total_height))
    chunk_size = len(ys)
    img_bins = chunk_it(img_bins, chunk_size)
    if len(img_bins) > num_threads > 1:
        xy_offsets_img_dict = dict()
        x_offset = 0
        for ims in img_bins:
            y_offset = 0
            for im in ims:
                xy_offsets_img_dict['_'.join([str(x_offset), str(y_offset)])] = im
                y_offset += height
            x_offset += width
        xy_offsets_img_dict_keys = _chunk_it(xy_offsets_img_dict.keys(), num_threads)
        xy_offsets_img_dict_list = list()
        for ks in xy_offsets_img_dict_keys:
            ks_img_group = list()
            for k in ks:
                ks_img_group.append(((int(k.split('_')[0]), int(k.split('_')[1])), xy_offsets_img_dict[k]))
            xy_offsets_img_dict_list.append(ks_img_group)
        threads = list()
        q = Queue.Queue()
        for i in range(num_threads):
            thread = Thread(target=_img_merge, args=(xy_offsets_img_dict_list[i], new_im, q))
            thread.start()
            threads.append(thread)
        for j in threads:
            j.join()
        new_im = q.get()
    else:
        x_offset = 0
        for ims in img_bins:
            y_offset = 0
            for im in ims:
                new_im.paste(im, (x_offset, y_offset))
                y_offset += height
            x_offset += width
    return new_im


def world2pixel(points, x_min, y_min, x_max, y_max, px_width, px_height):
    polygon = []
    for p in points:
        p_x = ((p[0] - x_min) / (x_max - x_min)) * px_width
        p_y = ((y_max - p[1]) / (y_max - y_min)) * px_height
        polygon.append((int(round(p_x, 0)), int(round(p_y, 0))))
    return polygon


def reproject_list(p1, p2, l):
    coords = list()
    for point in l:
        x, y = transform(p1, p2, x=point[0], y=point[1])
        coords.append([x, y])
    return coords


def reproject_geojson(p1, p2, plot_geojson):
    coords = reproject_list(p1, p2, plot_geojson['coordinates'][0])
    plot_geojson['coordinates'][0] = coords
    plot_geom = ogr.CreateGeometryFromJson(json.dumps(plot_geojson))
    return plot_geom


def clip_coverage(px_width, px_height, polygon, original):
    mask_im = Image.new('L', (px_width, px_height), 0)
    ImageDraw.Draw(mask_im).polygon(polygon, outline=1, fill=1)
    mask = np.array(mask_im)
    clip = np.empty(original.shape, dtype='uint8')
    clip[:, :, :3] = original[:, :, :3]
    clip[:, :, 3] = mask * 255
    return clip


def get_fixed_size(w, h):
    if w >= h:
        return fixed_length, int(round(fixed_length * (float(h) / float(w)), 0))
    else:
        return int(round(fixed_length * (float(w) / float(h)), 0)), fixed_length


def crop_coverage(new_im, p1, p2, plot_bbox, plot_geojson, blt, urt, mercator, wgs84):
    cropped = np.asarray(new_im)
    px_width, px_height = cropped.shape[1], cropped.shape[0]
    # the x_min, y_min of the bottom left tile
    y_min, x_min = blt.bounds[0].latitude, blt.bounds[0].longitude
    # the x_max, y_max of the upper right tile
    y_max, x_max = urt.bounds[1].latitude, urt.bounds[1].longitude
    _x_min, _y_min = transform(p1, p2, x=x_min, y=y_min)
    _x_max, _y_max = transform(p1, p2, x=x_max, y=y_max)
    # map plot bbox to pixel index
    polygon1 = world2pixel(reproject_list(p1, p2, [(plot_bbox[0], plot_bbox[3]), (plot_bbox[1], plot_bbox[3]),
                                                   (plot_bbox[1], plot_bbox[2]),
                                                   (plot_bbox[0], plot_bbox[2])]), _x_min, _y_min, _x_max,
                           _y_max, px_width, px_height)
    # clip with the bbox of the plot
    clip = clip_coverage(px_width, px_height, polygon1, cropped)
    # reduce canvas size to the clipped area
    _cropped = clip[polygon1[0][1]:polygon1[3][1], polygon1[0][0]:polygon1[1][0], :]
    _px_width, _px_height = _cropped.shape[1], _cropped.shape[0]
    plot_geom = reproject_geojson(p1, p2, plot_geojson)
    pts = plot_geom.GetGeometryRef(0)
    __x_min, __y_min = transform(p1, p2, x=plot_bbox[0], y=plot_bbox[2])
    __x_max, __y_max = transform(p1, p2, x=plot_bbox[1], y=plot_bbox[3])
    # map plot footprint to pixel index
    polygon2 = world2pixel(list((pts.GetX(p), pts.GetY(p)) for p in range(pts.GetPointCount()))[0:-1], __x_min, __y_min,
                           __x_max, __y_max, _px_width, _px_height)
    # clip with the footprint of the plot
    _clip = clip_coverage(_px_width, _px_height, polygon2, _cropped)
    clipped = Image.fromarray(_clip, "RGBA")
    if fixed:
        clipped.thumbnail(get_fixed_size(_px_width, _px_height), Image.ANTIALIAS)
    if save_to_local:
        if fixed:
            output_filename = str(plot_id)
        else:
            output_filename = str(zoom) + '_' + str(plot_id)
        png = output_filename + ".png"
        clipped.save(png)
        if not fixed:
            tif = output_filename + ".tif"
            prj_image_name = str(uuid.uuid4()) + '.tif'
            cmd1 = ['gdal_translate', '-of', 'Gtiff', '-a_ullr', str(__x_min), str(__y_max), str(__x_max), str(__y_min),
                    '-a_srs', 'EPSG:' + str(mercator), png, prj_image_name]
            cmd2 = ['gdalwarp', '-s_srs', 'EPSG:' + str(mercator), '-t_srs', 'EPSG:' + str(wgs84), prj_image_name,
                    tif]
            call_cmd(' '.join(cmd1))
            call_cmd(' '.join(cmd2))
            os.remove(prj_image_name)
            return png, tif
        else:
            return png, None
    else:
        with io.BytesIO() as output:
            clipped.save(output, "PNG")
            contents = output.getvalue()
        return contents


def call_cmd(cmd):
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = p.communicate()
    if p.returncode != 0:
        print 'ERROR: %s' % err
        sys.exit(-1)


def main():
    # ensure zoom level is right
    zoom_levels = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
    if zoom not in zoom_levels:
        print "zoom level must in %s" % str(zoom_levels)
        exit(-1)
    # read plot geojson
    plot_geojson = read_geometry()
    # create gdal geometry from json
    plot_geom = ogr.CreateGeometryFromJson(json.dumps(plot_geojson))
    # get envelope of the plot (bounding box)
    plot_bbox = plot_geom.GetEnvelope()
    # convert x_min, x_max, y_min, y_max coordinates to TMS index
    x_min_y_min = get_tms_index(plot_bbox[0], plot_bbox[2])
    x_max_y_min = get_tms_index(plot_bbox[1], plot_bbox[2])
    x_max_y_max = get_tms_index(plot_bbox[1], plot_bbox[3])
    x_min_y_max = get_tms_index(plot_bbox[0], plot_bbox[3])
    # get TMS x range indices and y range indices
    x_range = get_min_max_range(x_min_y_min[0], x_max_y_min[0], x_max_y_max[0], x_min_y_max[0])
    y_range = get_min_max_range(x_min_y_min[1], x_max_y_min[1], x_max_y_max[1], x_min_y_max[1])
    # fill gaps in x_range and y_range
    xs = fill_range_gap(x_range)
    ys = fill_range_gap(y_range)
    # get all TMS indices for the plot
    plot_indices = get_2d_matrix(xs, ys)
    # get all tiles for the plot
    valid_img_bins = get_tiles(plot_indices)
    img_bins = valid_img_bins[0]
    valid_indices = valid_img_bins[1]
    _xs = sorted(list(set(xy[0] for xy in valid_indices)))
    _ys = sorted(list(set(xy[1] for xy in valid_indices)))
    __xs = list(int(i) for i in _xs)
    __ys = list(int(i) for i in _ys)
    if img_bins is not None:
        width, height = img_bins[0].size
        new_im = img_merge(img_bins, __xs, __ys, width, height)
        if debug:
            new_im.save(str(plot_id) + '.png')
        else:
            wgs84 = 4326
            mercator = 3857
            p1 = Proj(init='epsg:' + str(wgs84))
            p2 = Proj(init='epsg:' + str(mercator))
            print crop_coverage(new_im, p1, p2, plot_bbox, plot_geojson, x_min_y_min[2],
                                x_max_y_max[2], mercator, wgs84)
    else:
        print "no images in this area"
        exit(-1)


if __name__ == "__main__":
    start_time = time.time()
    print "Started at: %s" % str(datetime.now())
    main()
    print "Finished at: %ss" % round((time.time() - start_time), 3)
