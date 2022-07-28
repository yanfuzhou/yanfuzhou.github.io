/* Map */
// Showed layers
var layers = [basemap, footprints];
for (var i = 0; i < thumbnails.length; i++) {
	layers.push(thumbnails[i])
}

var map = new ol.Map({
    layers: layers,
    target: document.getElementById('map'),
    view: new ol.View({
    	projection: 'EPSG:4326',
        center: center,
        maxZoom: maxZoom,
        minZoom: minZoom,
        zoom: zoom
    })
});

var extent = footprints_source.getExtent();
map.getView().fit(extent, map.getSize()); 