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
    bundleName: "Analysis / Counting Konfiguration",
    bundleDescription: "Konfigurations-Bundle f\u00fcr das Analysis / Counting Bundle",
    windowTitle: "Analysis / Counting Konfiguration",
    description: "Einstellungen f\u00fcr das Analysis / Counting Bundle",
    ui: {
        searchStore: "Suchstores",
        whereStoreSelection: {
            menuTitle: "\"Wo\" Suchstores",
            description: "\"Wo\" Suchstores konfigurieren",
            grid: {
                "title": "Titel",
                "description": "Beschreibung"
            },
            hint: "Bitte w\u00E4hlen Sie die Stores aus, die f\u00FCr die \"Wo?\" Auswahl zur Verf\u00FCgung stehen sollen"
        },
        whatStoreSelection: {
            menuTitle: "\"Was\" Suchstores",
            description: "\"Was\" Suchstores konfigurieren",
            grid: {
                "title": "Titel",
                "description": "Beschreibung"
            },
            hint: "Bitte w\u00E4hlen Sie die Stores aus, die f\u00FCr die \"Was?\" Auswahl zur Verf\u00FCgung stehen sollen"
        }
    }
});
