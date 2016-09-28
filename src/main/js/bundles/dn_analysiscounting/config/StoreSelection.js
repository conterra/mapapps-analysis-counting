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
define(["dojo/_base/lang", "dojo/_base/declare", "dojo/_base/array", "ct/_lang", "ct/_Connect", "ct/array", "ct/Exception", "ct/_string", "./StoreSelectionWidget", "ct/store/ComplexMemory", "ct/_when"],
    function (d_lang, declare, d_array, ct_lang, _Connect, ct_array, Exception, ct_string, StoreSelectionWidget, ComplexMemoryStore, ct_when) {
        return declare([_Connect],
            {
                createInstance: function () {
                    var whereConfigStore = this._getWhereConfigStore();
                    var whatConfigStore = this._getWhatConfigStore();
                    var i18n = this._i18n.get().ui.storeSelection;
                    var properties = this._properties || {};
                    var opts = d_lang.mixin({
                        i18n: i18n,
                        configAdminService: this._configAdminService,
                        whereConfigStore: whereConfigStore,
                        whatConfigStore: whatConfigStore,
                        config: this._getComponentConfig()
                    }, properties.widgetProperties);
                    var widget = this._widget = new StoreSelectionWidget(opts);
                    this.connectP("model", widget._whatViewModel, "selectedIds", function (type, oldVal, newVal) {
                        var whereStoreIds = this._getComponentConfig().properties.whereStoreIds;
                        widget.fireConfigChangeEvent({
                            whatStoreIds: newVal,
                            whereStoreIds: whereStoreIds
                        });
                    });
                    this.connectP("model", widget._whereViewModel, "selectedIds", function (type, oldVal, newVal) {
                        var whatStoreIds = this._getComponentConfig().properties.whatStoreIds;
                        widget.fireConfigChangeEvent({
                            whereStoreIds: newVal,
                            whatStoreIds: whatStoreIds
                        });
                    });
                    return widget;
                },
                _getComponentConfig: function () {
                    var properties = this._properties.widgetProperties;
                    var config = this._configAdminService.getConfiguration(properties.pid, properties.bid);
                    return config;
                },
                _updateConfig: function (config) {
                    try {
                        this._getComponentConfig().update(config);
                    } catch (e) {
                        e = Exception.wrap(e);
                        var msg = "_Configurable: Can't apply changed configuration! Error:" + e;
                        console.error(msg, e);
                        throw e;
                    }
                },
                destroyInstance: function (instance) {
                    this.disconnect();
                    this._whatConfigStore = null;
                    this._whereConfigStore = null;
                    var window = this._window;
                    if (window) {
                        window.close();
                        this._window = null;
                    }
                    this._widget = null;
                    instance.destroyRecursive();
                },
                _getWhatConfigStore: function () {
                    var i18n = this._i18n.get().ui.storeSelection;
                    if (!this._whatConfigStore) {
                        var store = this._whatConfigStore = new ComplexMemoryStore({
                            data: [],
                            idProperty: "id"
                        });
                        store.getMetadata = function () {
                            return {
                                fields: [{
                                    "title": "id",
                                    "name": "id",
                                    "type": "string",
                                    "identifier": true
                                }, {
                                    "title": i18n.grid.title,
                                    "name": "title",
                                    "type": "string"
                                }, {
                                    "title": i18n.grid.description,
                                    "name": "description",
                                    "type": "string"
                                }]
                            };
                        };
                    }
                    return this._whatConfigStore;
                },
                _getWhereConfigStore: function () {
                    var i18n = this._i18n.get().ui.storeSelection;
                    if (!this._whereConfigStore) {
                        var store = this._whereConfigStore = new ComplexMemoryStore({
                            data: [],
                            idProperty: "id"
                        });
                        store.getMetadata = function () {
                            return {
                                fields: [{
                                    "title": "id",
                                    "name": "id",
                                    "type": "string",
                                    "identifier": true
                                }, {
                                    "title": i18n.grid.title,
                                    "name": "title",
                                    "type": "string"
                                }, {
                                    "title": i18n.grid.description,
                                    "name": "description",
                                    "type": "string"
                                }]
                            };
                        };
                    }
                    return this._whereConfigStore;
                },
                addSelectionStore: function (service, properties) {
                    var whatConfigStore = this._getWhatConfigStore();
                    var whereConfigStore = this._getWhereConfigStore();
                    ct_when(service.getMetadata(), function (data) {
                        if (!whatConfigStore.get(properties.id)) {
                            whatConfigStore.add({
                                "id": properties.id,
                                "title": properties.title,
                                "description": properties.description
                            });
                        }
                        if (data.geometryType === "esriGeometryPolygon")
                            if (!whereConfigStore.get(properties.id)) {
                                whereConfigStore.add({
                                    "id": properties.id,
                                    "title": properties.title,
                                    "description": properties.description
                                });
                            }
                    }, this);
                }
            });
    });
