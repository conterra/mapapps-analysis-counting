/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/Deferred",
    "dojo/aspect",
    "ct/_when",
    "ct/array",
    "ct/_Connect",
    "./CountingWidget"
], function (declare,
             d_array,
             Deferred,
             d_aspect,
             ct_when,
             ct_array,
             _Connect,
             CountingWidget) {
    return declare([_Connect], {
        constructor: function () {
            this.stores = [];
            this.whereStores = [];
            this.whatStores = [];
        },
        createInstance: function () {
            this.inherited(arguments);
            return this.widget;
        },
        activate: function () {
            this.inherited(arguments);
            var i18n = this._i18n.get();
            var properties = this._properties;
            this.whereStoreIds = properties.whereStoreIds;
            this.whatStoreIds = properties.whatStoreIds;

            d_array.forEach(this.whereStoreIds, function (storeId) {
                var store = this._getSelectedStoreObj(storeId);
                this.whereStores.push(store);
            }, this);

            d_array.forEach(this.whatStoreIds, function (storeId) {
                var store = this._getSelectedStoreObj(storeId);
                this.whatStores.push(store);
            }, this);

            var widget = this.widget = new CountingWidget({
                source: this,
                i18n: i18n
            });
            widget.resize();

            this.connect(this._tool, "onDeactivate", function () {
                if (this._drawGeometryHandler)
                    this._drawGeometryHandler.clearGraphics();
            });
        },
        _getSelectedStoreObj: function (id) {
            return ct_array.arraySearchFirst(this.stores, {id: id});
        },
        _setProcessing: function (processing) {
            var tool = this._tool;
            if (tool) {
                tool.set("processing", processing);
            }
        },
        addStore: function (store, serviceproperties) {
            this.stores.push(store);
        },
        onCount: function () {
            this._setProcessing(true);
            this._drawGeometryHandler.clearGraphics();
            var gStore = this._getSelectedStoreObj(this.widget.getSelectedWhereStore());
            var cvStore = this._getSelectedStoreObj(this.widget.getSelectedWhatStore());
            var extent = this._mapState.getExtent();
            ct_when(gStore.query({geometry: {$intersects: extent}}, {
                fields: {
                    "geometry": true,
                    "objectid": 1
                }
            }), function (result) {
                d_array.forEach(result, function (feature) {
                    var geom = feature.geometry;
                    this._drawGeometryHandler.drawGeometry(geom);
                    var deferred = cvStore.query({geometry: {$intersects: geom}}, {count: 0});
                    ct_when(deferred, function (count) {
                        this._drawGeometryHandler.drawDistanceText(geom, count.toString());
                        this._setProcessing(false);
                    }, this);
                }, this);
            }, this);
        },
        onClear: function () {
            this._setProcessing(false);
            this._drawGeometryHandler.clearGraphics();
        }
    });
});
		