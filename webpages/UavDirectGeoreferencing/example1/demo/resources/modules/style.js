/* Style */
// Below is a styling template
/*
var image = new ol.style.Circle({
    radius: 5,
    fill: null,
    stroke: new ol.style.Stroke({color: 'red', width: 1})
});
var styles = {
    'Point': new ol.style.Style({
        image: image
    }),
    'LineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiLineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiPoint': new ol.style.Style({
        image: image
    }),
    'MultiPolygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: 'yellow',
        width: 1
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 0, 0.1)'
        })
    }),
    'Polygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    }),
    'GeometryCollection': new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: 'magenta',
        width: 2
        }),
        fill: new ol.style.Fill({
            color: 'magenta'
        }),
        image: new ol.style.Circle({
            radius: 10,
            fill: null,
            stroke: new ol.style.Stroke({
                color: 'magenta'
            })
        })
    }),
    'Circle': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })
};
var styleFunction = function(feature) {
    return styles[feature.getGeometry().getType()];
};
*/
// Styling start here
// Footprints
var footprints_style = {
    'Polygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 255, 1.0)',
        lineDash: [10],
        width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.33)'
        })
    })
};
var footprintsStyleFunction = function(feature) {
    return footprints_style[feature.getGeometry().getType()];
};