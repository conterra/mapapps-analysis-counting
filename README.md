# Analysis / Counting Bundle
The Analysis / Counting Bundle allows you to count features and display the results in the map.

### Sample App ###
http://www.mapapps.de/mapapps/resources/apps/downloads_analysis_counting/index.html

### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`

Installation Guide
------------------
- Just add the bundle "dn_analysiscounting" to your app.

#### Configurable Components:
```
"dn_analysiscounting": {
  "CountingWidgetFactory": {
    "whereStoreIds": [
      "_AGS_STORE_1447515012761",
      "_AGS_STORE_1447515265638",
      "_AGS_STORE_1447515368626",
      "_AGS_STORE_1469027163329",
      "_AGS_STORE_1469027174072",
      "_AGS_STORE_1469027182634"
    ],
    "whatStoreIds": [
      "_AGS_STORE_1446801354388",
      "_AGS_STORE_1469026369117"
    ]
  }
}
```
