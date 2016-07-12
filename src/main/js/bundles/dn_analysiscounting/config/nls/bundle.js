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
define({
    root: {
        bundleName: "Analysis / Counting Bundle Config",
        bundleDescription: "Configuration bundle for Analysis / Counting",
        windowTitle: "Analysis / Counting Config",
        description: "Settings for the Analysis / Counting bundle",
        ui: {
            searchStore: "Searchstores",
            whereStoreSelection: {
                menuTitle: "Where Search Stores",
                description: "Configure Where Search Stores",
                grid: {
                    "title": "Title",
                    "description": "Description"
                },
                hint: "Please specify where search stores"
            },
            whatStoreSelection: {
                menuTitle: "What Search Stores",
                description: "Configure What Search Stores",
                grid: {
                    "title": "Title",
                    "description": "Description"
                },
                hint: "Please specify what search stores"
            }
        }
    },
    de: true
});
