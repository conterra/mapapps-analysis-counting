/*
 * Copyright (C) 2017 con terra GmbH (info@conterra.de)
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
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/CountingWidget.html",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Button",
    "ct/util/css",
    "ct/async",
    "ct/_when",
    "ct/_Connect",
    "dojo/dom-geometry",
    "dojo/store/Memory",
    "dijit/form/FilteringSelect"
], function (declare,
        _Widget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        templateStringContent,
        domConstruct,
        d_array,
        BorderContainer,
        ContentPane,
        Button,
        ct_css,
        ct_async,
        ct_when,
        _Connect,
        domGeometry,
        Memory,
        FilteringSelect) {
    return declare([_Widget, _TemplatedMixin,
        _WidgetsInTemplateMixin, _Connect], {
        templateString: templateStringContent,
        baseClass: "countingWidget",
        postCreate: function () {
            this.maxComboBoxHeight = 160;
            var whereStoreData = this._getStoreData(this.source.whereStores);
            ct_when(whereStoreData, function (storeData) {
                var storesStore = new Memory({
                    data: storeData
                });
                this._filteringSelect1 = new FilteringSelect({
                    name: "cvStores",
                    store: storesStore,
                    value: storeData[0].id,
                    searchAttr: "label",
                    style: "width: 155px;",
                    maxHeight: this.maxComboBoxHeight
                }, this._selectNode1);
            }, this);
            var whatStoreData = this._getStoreData(this.source.whatStores);
            ct_when(whatStoreData, function (storeData) {
                var storesStore = new Memory({
                    data: storeData
                });
                this._filteringSelect2 = new FilteringSelect({
                    name: "cvStores",
                    store: storesStore,
                    value: storeData[0].id,
                    searchAttr: "label",
                    style: "width: 155px;",
                    maxHeight: this.maxComboBoxHeight
                }, this._selectNode2);
            }, this);

            this.inherited(arguments);
        },
        resize: function (dims) {
            this._container.resize(dims);
        },
        updateStores: function () {
            var whereStoreData = this._getStoreData(this.source.whereStores);
            var whatStoreData = this._getStoreData(this.source.whatStores);
            ct_when(whereStoreData, function (storeData) {
                var storesStore = new Memory({
                    data: storeData
                });
                this._filteringSelect1.set("store", storesStore);
            }, this);
            ct_when(whatStoreData, function (storeData) {
                var storesStore = new Memory({
                    data: storeData
                });
                this._filteringSelect2.set("store", storesStore);
            }, this);
        },
        _getStoreData: function (stores) {
            var stores = d_array.filter(stores, function(store) {
                return !!store;
            });
            return ct_async.join(d_array.map(stores, function (s) {
                return s.getMetadata();
            })).then(function (metadata) {
                return d_array.map(metadata, function (metadata, index) {
                    var id = stores[index].id;
                    var title = metadata.title || id;
                    return {label: title, id: id};
                });
            });
        },
        getSelectedWhereStore: function () {
            return this._filteringSelect1.get("value");
        },
        getSelectedWhatStore: function () {
            return this._filteringSelect2.get("value");
        },
        _onCount: function () {
            this.source.onCount();
        },
        _onClear: function () {
            this.source.onClear();
        }
    });
});
		