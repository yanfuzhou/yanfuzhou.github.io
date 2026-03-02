---
layout: yanfu
---

# [](#header-1) Welcome to my digital portfolio!

---

#### [](#header-4) **Summary**
<small>Hi, I’m Yanfu Zhou. I’ve been working in the geospatial industry for more than 10 years, and I’m passionate about geospatial technologies and building systems that turn complex spatial data into practical, scalable solutions.</small>

<small>This portfolio highlights selected projects across LiDAR processing, UAV imagery, routing engines, IoT/GPS tracking, and cloud-native spatial infrastructure using tools such as Python, PostGIS, AWS, and GCP. Throughout my career in government, agriculture, and enterprise environments, I’ve focused on transforming research-driven and manual workflows into efficient, production-ready platforms.</small>

<small>If you're looking for someone who combines deep geospatial expertise with strong engineering execution, I’d be happy to connect.([LinkedIn](www.linkedin.com/in/yanfu-z-566a9889))</small>

##### [](#header-5) **Here are the key words on this page!** 
<small>3D print, 3D trajactory, A*, Algorithm, AngularJS, Apache Cordova, ArcGIS Enterprise Server, ArcGIS Javascripts API, ArcGIS Server Restful API, Bambu Lab X-1 Carbon, CH, Compass, CSS3, DEM, Dijkstra, DSM, ESRI's geodatabase, GDAL, GeoMesa, GeoServer, GeoTrillis, Google Earth, GPS, H3, HTML5, kubernetes, LasTools, LiDAR, Linux, MLD, Mobile GIS, Neo4J, NUmpy, Openlayers, OSRM, PDAL, pgRouting, Planter, PostGIS, Postgres, PyTorch, QGIS, Raspiberry PI, Spark, Tensorflow, UAV, vector tiles, viewshed, VNC, Web Mercator</small>

---

## [](#header-2) Things that I want to show...

### [](#header-3) LiDAR Point Cloud - H3 Hexagon & Digital Elevation Model & 3D Printing
  - [How to **3D Print** My Neighorhood on **Bambu Lab X-1 Carbon**](docs/3DPrintMyNeighbors.md)
  - [A data science tool for generate hexagonal **DEM** from **LiDAR** (build by **PDAL**, **NumPy** and more)](docs/AwsLidarH3.md)
  - [Why need to use hexagonal Digital Surface Model (**DSM**)?](docs/WhyUseHexagon.md)
  - [**H3** hexagon visualization on **Google Earth** pro](docs/GoogleEarthH3Vis.md)
  - [Mapping **H3** in **Web Mercator** projection](docs/H3Distortions.md)
  - [Simple **LiDAR** Data Visualization Tool (Wine + **LasTools**) - YouTube Demo](https://www.youtube.com/watch?v=-3u1CQIp5Hw)

---

### [](#header-3) Map Routing - Navigation & Geocoding
  - [Learning **pgRouting** (**A***, **Dijkstra**) in **PostGIS**](docs/gisdata/HowToPrepareRoutingData.md)
  - [**[External Reading]** - Most popular routing engine - **OSRM** (**Contraction Hierarchies (CH)**, **Multi-Level Dijkstra (MLD)**)](https://github.com/Project-OSRM/osrm-backend) ([demo](http://map.project-osrm.org/))
  - [**[External Reading]** - Open Street Map (**OSM**) Wiki Reference](https://wiki.openstreetmap.org/wiki/Open_Source_Routing_Machine)
  - [**[External Reading]** - **OSRM** Project Page](https://project-osrm.org/)
  - [**[External Reading]** - Parallel Routing Analysis using **OSRM** and **Postgres** in **Spark**](https://github.com/UI-Research/spark-osrm)
  - [**[External Reading]** - **OSRM** + **H3** + **Spark** - A New Routing Estimation Method](https://careersatdoordash.com/blog/doordash-fast-travel-estimates/)
  - [**[External Reading]** - Alternative Routing Engine besides **pgRouting** and **OSRM** - the **"Neo4J"**](https://neo4j.com/blog/developer/routing-web-app-neo4j-openstreetmap-leafletjs/)

---

### [](#header-3) ESRI's Geospatial Platform - ArcGIS Enterprise Server

*If budget isn't your consideration...* 😊:

 *Note: start from the **ArcGIS Enterprise Server 11 for Linux**, the required packages may less than before (just need this `gettext*` package group), you can [check detail here](https://enterprise.arcgis.com/en/system-requirements/latest/linux/arcgis-server-system-requirements.htm)

  - [Dockerize **ArcGIS Enterprise Server** 10.0 SP5 For **Linux**](docs/DockerizingArcGISServerForLinux.md)
  - [**[External Reading]** - Required packages for install **ArcGIS Enterprise Server 10.x for Linux** on CentOS](https://desktop.arcgis.com/en/system-requirements/10.5/os-limits-linux.htm)
  - [**[External Reading]** - How to install **ArcGIS Enterprise Server for Linux** Silently](https://enterprise.arcgis.com/en/server/11.4/install/linux/silently-install-arcgis-server.htm)
  - [**[External Reading]** - The **ArcGIS Enterprise Server** Life Cycle](https://support.esri.com/en-us/products/arcgis-enterprise/life-cycle)
  
Potential ways for migrate from ArcGIS Enterprise Server to GeoServer without breaking the frontend:

  - [**[External Reading]** - How to make **GeoServer** mimick the **ArcGIS Server Restful API**](https://docs.geoserver.org/main/en/user/community/gsr/index.html)
  - [**[External Reading]** - Letting **GeoServer** to use the **ESRI's Geodatabase**](https://docs.geoserver.org/2.19.x/en/user/community/arcsde/index.html)

---

### [](#header-3) OpenSource Cloud Native Geospatial Platform - GeoServer

*If budget tight and it's your consideration...* 🙁:

  - [Online **Viewshed** App (**3D trajectory analysis**) - YouTube Demo](https://www.youtube.com/watch?v=OkvwTfUE9yc)
  - [Dockerize **GeoServer** with **GDAL**/**Vector Tiles** plugins and using **GeoMesa** datastore](docs/GeomesaMac.md)
  - [Accessing **GeoTrellis** image server and dynamic tile stitching](docs/Geotrellis.md)
  - [Map Visualization Using **GeoServer** and **OpenLayers** - YouTube Demo](https://www.youtube.com/watch?v=bAyy-3kzrWs)
  - [A **Mobile GIS** App By **AngularJS** - YouTube Demo](https://www.youtube.com/watch?v=FDTTBfp-4wE) (**ArcGIS Javascripts API** + **Apache Cordova** + **HTML5/CSS3**)
  - [Map Publishing on **GeoServer** - YouTube Demo](https://www.youtube.com/watch?v=GUE5KSlLXWs)

---

### [](#header-3) Data Visualization - Water Resources Planning & Bioinformatics
  - [**[State-of-Art/Government Tech]** - Integrated Network of Scientific Information & GeoHydrologic Tools (backend: **ArcGIS Server**)](https://nednr.nebraska.gov/insight/) (**ArcGIS Javascripts API** + **C3.js** + + **HTML5/CSS3**)
  - [A data science tool for grouping proteins in different pathways (build by **D3js**)](docs/ProteomicsGroupingByWeight.md)

---
  
### [](#header-3) Drone Image Stitching - UAV Breeding Crops
  - [Direct georeferencing **UAV** images](docs/UavDirectGeoreferencing.md)
  - [Quadrilateral Transformation **Algorithm**](docs/QuadrilateralTransformation.md)

---
  
### [](#header-3) Realtime GPS+GLONASS Tracking - Digital Farming & IoT
  - [The world's 1st RC Cassette **Planter**](docs/CassettePlanter.md)
  - [DIYMall DY-880TTL **GPS** module on **Raspiberry PI**](docs/DY880TTL.md)
  - [QMC5883L Magnet **Compass**](docs/PyQMC5883L.md)
  
---

### [](#header-3) School Projects - Enviromental Planning Research
  - [School Lab Project: Volunteered Geographic Information (**VGI**) Website (backend: **ArcGIS Server**) - YouTube Demo](https://www.youtube.com/watch?v=IKSWJbKdrSA)
  - [School Lab Project: A **Mobile GIS** App For Environmental Data Collection (backend: **ArcGIS Server**) - YouTube Demo](https://youtube.com/shorts/Gt--0rIEpqg?si=ea1OCwAmG3g33REO)

---

### [](#header-3) Random Geospatial Works & Self Exploration
  - [Dockerize **Geoserver** with **GDAL**/**Vector Tiles** plugins](docs/GeoServer.md)
  - [How to Add BaseMap in **QGIS** - YouTube Demo](https://www.youtube.com/watch?v=4JESmOrHq5M)
  - [P.E.A.N Stack - YouTube Demo](https://www.youtube.com/watch?v=2cR4JLT3pno)

---

### [](#header-3) Motion Pictures - Urban Planning & Architecture
  - [School Lab Project: Cornhusker Corridor LiNK to LNK Plan 2013](https://www.youtube.com/watch?v=8Mej2ZBo0wM)

---
  
### [](#header-3) Linux Hardware - Machine Learning & AI
  - [A budget build eGPU on Linux for **Tensorflow**, **PyTorch** development](docs/LinuxGPU.md)

---
  
### [](#header-3) Tricky Things - Cloud Linux & CI/CD Pipeline
  - [Programmatically setup **VNC** password](docs/VNCansible.md)
  - [Passing local environment variables to **Kubernetes**](docs/AflaskApp.md)


