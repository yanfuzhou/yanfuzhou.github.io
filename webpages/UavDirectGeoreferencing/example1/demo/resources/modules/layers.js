/* Layers */
// + Vector Source
var thumbnail_flag = false;
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url.concat(thumbnail_json), false);
xmlhttp.send();
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var thumbnail_data = JSON.parse(xmlhttp.responseText);
    thumbnail_flag = true;
}
else {
    var thumbnail_data = null;
}
var thumbnails = [];
if (thumbnail_flag) {
    var minxs = [];
    var minys = [];
    var maxxs = [];
    var maxys = [];
    for (var i = 0; i < thumbnail_data.length; i++) {
         minxs.push(thumbnail_data[i]['bbox'][0]);
         minys.push(thumbnail_data[i]['bbox'][1]);
         maxxs.push(thumbnail_data[i]['bbox'][2]);
         maxys.push(thumbnail_data[i]['bbox'][3]);
         var thumbnail = new ol.layer.Image({
            source: new ol.source.ImageStatic({
                url: "https://raw.githubusercontent.com/yanfuzhou/yanfuzhou.github.io/master/webpages/UavDirectGeoreferencing/example1/demo/data/".concat(thumbnail_data[i]['image']),
                projection: 'EPSG:4326',
                imageExtent: thumbnail_data[i]['bbox']
            })
        });
        thumbnails.push(thumbnail);
    }
    var x_min = Math.min.apply(Math, minxs);
    var y_min = Math.min.apply(Math, minys);
    var x_max = Math.min.apply(Math, maxxs);
    var y_max = Math.min.apply(Math, maxys);
    center = [(x_min + x_max) / 2.0, (y_min + y_max) / 2.0];
}

var boundary_flag = false;
xmlhttp.open("GET", url.concat(boundary_json), false);
xmlhttp.send();
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var boundary_data = JSON.parse(xmlhttp.responseText);
    boundary_flag = true;
}
else {
    var boundary_data = null;
}
var footprints_source = null;
var footprints = null;
if (boundary_flag) {
    footprints_source = new ol.source.Vector({
        features: (new ol.format.GeoJSON({
            defaultDataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326',
            geometryName: 'footprints'
        })).readFeatures(boundary_data)
    });
    footprints = new ol.layer.Vector({
        source: footprints_source,
        style: footprintsStyleFunction
    });
}