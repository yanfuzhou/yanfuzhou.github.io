map.on('click', function(evt) {
    displayFeatureInfo(evt.pixel);
});
/*map.on('pointermove', function(evt) {
    if (evt.dragging) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
});*/
/*---------------------------------------*/
/* Initialize and define highlight style */
/*---------------------------------------*/	
var highlightStyleCache = {};
var featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: function(feature, resolution) {
        var text = resolution < 5000 ? feature.get('mission.name') : '';
        if (!highlightStyleCache[text]) {
            highlightStyleCache[text] = [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(0,0,0,0.5)',
                    width: 1
				}),
				fill: new ol.style.Fill({
                    color: 'rgba(0,0,0,0.3)'
                }),
				text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',
                    text: text,
                    fill: new ol.style.Fill({
                        color: 'rgba(0,0,0,0.9)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(255,255,255,0.9)',
                        width: 3
                    })
                })
            })];
        }
        return highlightStyleCache[text];
    }
});
/*----------------------------------------------------------*/
/* Highlight selected features and return query information */
/*----------------------------------------------------------*/		
var highlight;
var displayFeatureInfo = function(pixel) {
    var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        return feature;
    });
    var chartarea = document.getElementById('chartarea');
    var chartpanel = document.getElementById('chartpanel');
    if (feature) {
        chartarea.innerHTML = 'mission.geohash: ' + feature.get('mission.geohash') + '<hr>' 
                            + 'mission.date: ' + feature.get('mission.date') + '<hr>' 
                            + 'mission.name: ' + feature.get('mission.name') + '<hr>' 
                            + 'sensor.make: ' + feature.get('sensor.make') + '<hr>'
                            + 'sensor.model: ' + feature.get('sensor.model') + '<hr>'
                            + 'sensor.focal: ' + feature.get('sensor.focal') + '<hr>'
                            + 'sensor.width: ' + feature.get('sensor.width') + '<hr>'
                            + 'sensor.height: ' + feature.get('sensor.height') + '<hr>'
                            + 'sensor.orientation: ' + feature.get('sensor.orientation') + '<hr>'
                            + 'sensor.pixel_x_dimension: ' + feature.get('sensor.pixel_x_dimension') + '<hr>'
                            + 'sensor.pixel_y_dimension: ' + feature.get('sensor.pixel_y_dimension') + '<hr>'
                            + 'quadrant: ' + feature.get('quadrant') + '<hr>'
                            + 'schema_version: ' + feature.get('schema_version') + '<hr>'
                            + 'holes: ' + feature.get('holes') + '<hr>'
                            + 'holes.area_percentage: ' + Number(feature.get('holes.area_percentage').toFixed(1)) + '<hr>'
                            + 'gaps: ' + feature.get('gaps') + '<hr>'
                            + 'gyro_is_zero: ' + feature.get('gyro_is_zero') + '<hr>'
                            + 'gimbal_is_zero: ' + feature.get('gimbal_is_zero');              
        chartpanel.style.visibility = 'visible';
    } else {
        chartarea.innerHTML = 'Please selecet a field!';
        chartpanel.style.visibility = 'hidden';
    }
    if (feature !== highlight) {
        if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
            featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
    }
}