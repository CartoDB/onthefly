/*
var hash = {
    "user": "abel",
    "table": "andrew.atm_transactions",
    "field": "amount",
    "widgets": [
        {
            "type": "formula",
            "options": {
                "title": "Total amount",
                "column": "amount",
                "operation": "sum"
            }
        },
        {
            "type": "histogram",
            "options": {
                "title": "Amount",
                "column": "amount",
                "bins": 10,
                "normalize": true,
                "operation": "count"
            }
        },
        {
            "type": "category",
            "options": {
                "title": "ATMs",
                "column": "atm_id",
                "aggregation_column": "amount",
                "aggregation": "count"
            }
        },
    ]
}

btoa(JSON.stringify(hash));

eyJ1c2VyIjoiYWJlbCIsInRhYmxlIjoiYW5kcmV3LmF0bV90cmFuc2FjdGlvbnMiLCJmaWVsZCI6ImFtb3VudCIsIndpZGdldHMiOlt7InR5cGUiOiJmb3JtdWxhIiwib3B0aW9ucyI6eyJ0aXRsZSI6IlRvdGFsIGFtb3VudCIsImNvbHVtbiI6ImFtb3VudCIsIm9wZXJhdGlvbiI6InN1bSJ9fSx7InR5cGUiOiJoaXN0b2dyYW0iLCJvcHRpb25zIjp7InRpdGxlIjoiQW1vdW50IiwiY29sdW1uIjoiYW1vdW50IiwiYmlucyI6MTAsIm5vcm1hbGl6ZSI6dHJ1ZSwib3BlcmF0aW9uIjoiY291bnQifX0seyJ0eXBlIjoiY2F0ZWdvcnkiLCJvcHRpb25zIjp7InRpdGxlIjoiQVRNcyIsImNvbHVtbiI6ImF0bV9pZCIsImFnZ3JlZ2F0aW9uX2NvbHVtbiI6ImFtb3VudCIsImFnZ3JlZ2F0aW9uIjoiY291bnQifX1dfQ==

*/


(function () {

    window.onthefly = window.onthefly || {};

    var makeUUID = function () {
            var d = Date.now(),
                uuid = 'ONTHEFLY-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var s = (window.crypto) ? window.crypto.getRandomValues(new Uint32Array(1))[0] / 0x100000000 : Math.random();
                    r = (d + s * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            return uuid;
        },
        addWidget = function (dashboard, w) {
            try {
                var layer = dashboard.getMap().getLayer(1);
                switch (w.type) {
                case 'category':
                    dashboard.createCategoryWidget(w.options, layer);
                    break;
                case 'formula':
                    dashboard.createFormulaWidget(w.options, layer);
                    break;
                case 'histogram':
                    dashboard.createHistogramWidget(w.options, layer);
                    break;
                case 'timeseries':
                    dashboard.createTimeSeriesWidget(w.options, layer);
                    break;
                }
                return 'OK';
            } catch (error) {
                return error;
            }
        },
        init = function (a, p) {
            p.uuid = makeUUID();
            p.layerid = makeUUID();
            p.diJSON = {
                "id": p.uuid,
                "version": "3.0.0",
                "title": p.title || "Untitled map",
                "likes": 0,
                "description":  p.description || null,
                "scrollwheel": true,
                "legends": false,
                "map_provider": "leaflet",
                "bounds": p.bounds || [
                [-59.88893689676582, -240.99609375],
                [75.93088543216642, 183.8671875]
            ],
                "center": p.center || "[21.779905342529645, -28.564453125]",
                "zoom": p.zoom || 3,
                "updated_at": "2016-05-24T09:23:25+00:00",
                "layers": [{
                    "options": {
                        "default": "true",
                        "url": "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
                        "subdomains": "abcd",
                        "minZoom": "0",
                        "maxZoom": "18",
                        "name": "Positron",
                        "className": "positron_rainbow_labels",
                        "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
                        "labels": {
                            "url": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
                        },
                        "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
                    },
                    "infowindow": null,
                    "tooltip": null,
                    "id": "c7a050aa-f124-4952-a172-a7c513363aa1",
                    "order": 0,
                    "type": "tiled"
            }, {
                    "type": "layergroup",
                    "options": {
                        "user_name": p.user,
                        "maps_api_template": "https://{user}.cartodb.com:443",
                        "sql_api_template": "https://{user}.cartodb.com:443",
                        "filter": "mapnik",
                        "layer_definition": {
                            "stat_tag": p.uuid,
                            "version": "3.0.0",
                            "layers": [{
                                "id": p.layerid,
                                "type": "CartoDB",
                                "infowindow": {},
                                "tooltip": {},
                                "legend": {},
                                "order": 1,
                                "visible": true,
                                "options": {
                                    "layer_name": "mylayer",
                                    "cartocss": p.css,
                                    "cartocss_version": "2.1.1",
                                    "interactivity": "cartodb_id",
                                    "sql": "SELECT * FROM " + p.table
                                }
                }]
                        },
                        "attribution": ""
                    }
    }, {
                    "options": {
                        "default": "true",
                        "url": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                        "subdomains": "abcd",
                        "minZoom": "0",
                        "maxZoom": "18",
                        "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
                        "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                        "type": "Tiled",
                        "name": "Positron Labels"
                    },
                    "infowindow": null,
                    "tooltip": null,
                    "id": "08ac8c3f-5830-475b-95e5-cf3439c52079",
                    "order": 2,
                    "type": "tiled"
    }],
                "overlays": [{
                    "type": "search",
                    "order": 3,
                    "options": {
                        "x": 20,
                        "y": 60,
                        "display": true
                    },
                    "template": null
    }, {
                    "type": "zoom",
                    "order": 6,
                    "options": {
                        "display": true,
                        "x": 20,
                        "y": 20
                    },
                    "template": "<a href=\"#zoom_in\" class=\"zoom_in\">+</a> <a href=\"#zoom_out\" class=\"zoom_out\">-</a>"
    }, {
                    "type": "loader",
                    "order": 8,
                    "options": {
                        "display": true,
                        "x": 20,
                        "y": 150
                    },
                    "template": "<div class=\"loader\" original-title=\"\"></div>"
    }, {
                    "type": "logo",
                    "order": 9,
                    "options": {
                        "display": true,
                        "x": 10,
                        "y": 40
                    },
                    "template": ""
    }],
                "prev": null,
                "next": null,
                "transition_options": {
                    "time": 0
                },
                "widgets": [],
                "datasource": {
                    "user_name": p.user,
                    "maps_api_template": "https://{user}.cartodb.com:443",
                    "stat_tag": p.uuid
                },
                "user": {
                    "fullname": p.user,
                    "avatar_url": p.logo || "./themes/img/logo.png"
                },
                "analyses": [],
                "vector": false
            };
            cartodb.deepInsights.createDashboard('#dashboard', p.diJSON, {
                no_cdn: false
            }, function (err, dashboard) {
                var result;
                for (var i = 0; i < p.widgets.length; i++) {
                    result = addWidget(dashboard, p.widgets[i]);
                    if (result != 'OK') {
                        document.body.innerHTML = '<h2 class="CDB-Tag is-private CDB-Text is-semibold CDB-Size-small u-iBlock" style="margin: 5em; padding: 2em">Malformed ' + p.widgets[i].type + ' widget: <br><br>' + result + '<br><br>Options set:<br>' + JSON.stringify(p.widgets[i].options) + '</h2>';
                        return;
                    }
                }
            });
        };

    window.onload = function () {
        try {
            var a = window.onthefly,
                p = a.params = JSON.parse(atob(window.location.search.substring(1)));
        } catch (error) {
            document.body.innerHTML = '<h2 class="CDB-Tag is-private CDB-Text is-semibold CDB-Size-small u-iBlock" style="margin: 5em; padding: 2em">Malformed params: <br><br>' + error + '</h2>';
            return;
        }
        p.widgets = p.widgets || [];
        a.sqlclient = new cartodb.SQL({
            user: p.user,
            protocol: "https",
            sql_api_template: "https://{user}.cartodb.com:443"
        });
        a.sqlclient.execute('SELECT GeometryType(the_geom_webmercator) AS type FROM ' + p.table + ' LIMIT 1').done(function (data) {
            p.geometrytype = data.rows[0].type.toLowerCase().replace('multi', '').replace('point', 'marker');
            if (p.geometrytype == 'line') {
                p.css = [
                    '#mytable{',
                    'line-width: 2;',
                    'line-color:#FF6600;',
                    '}'
                ].join('\n');
            } else {
                p.css = [
                    '#mytable{',
                    'marker-allow-overlap: true;',
                    p.geometrytype + '-opacity: 0.9;',
                    p.geometrytype + '-fill:' + ((p.field == void 0) ? '#FF6600;' : 'ramp([' + p.field + '], colorbrewer(YlGnBu));'),
                    ((p.geometrytype == 'marker') ? 'marker-' : '') + 'line-opacity: 1;',
                    ((p.geometrytype == 'marker') ? 'marker-' : '') + 'line-width: 0.5;',
                    ((p.geometrytype == 'marker') ? 'marker-' : '') + 'line-color:#ffffff;',
                    '}'
                ].join('\n');
            }
            init(a, p);
        });
    }
})();
