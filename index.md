---
layout: yanfu
---

### [](#header-3) **Self-introduction** 😎 <small>(This is generated from the ChatGPT after I showed it this page! 😂)</small>
<middle>Hi, I’m Yanfu Zhou. I’ve been working in the geospatial industry for more than 10 years, and I’m passionate about geospatial technologies and building systems that turn complex spatial data into practical, scalable solutions.</middle>

<middle>This portfolio highlights selected projects across LiDAR processing, UAV imagery, routing engines, IoT/GPS tracking, and cloud-native spatial infrastructure using tools such as Python, PostGIS, AWS, and GCP. Throughout my career in government, agriculture, and enterprise environments, I’ve focused on transforming research-driven and manual workflows into efficient, production-ready platforms.</middle>

<middle>If you're looking for someone who combines deep geospatial expertise with strong engineering execution, I’d be happy to connect:</middle>

- [LinkedIn](www.linkedin.com/in/yanfu-z-566a9889).

#### [](#header-4) **Here are the key words on this page!** 🔑
<details>
<summary>Click to see</summary>
<br>3D print, 3D trajactory, A*, Algorithm, Android, AngularJS, Apache Cordova, ArcGIS Enterprise Server, ArcGIS Javascripts API, ArcGIS Server Restful API, AWS EC2, Bambu Lab X-1 Carbon, CH, Compass, CSS3, DEM, Dijkstra, DSM, ESRI's geodatabase, GDAL, GeoMesa, GeoServer, GeoTrillis, Google Earth, Government Tech, GPS, H3, HTML5, iOS, kubernetes, LasTools, LiDAR, Linux, MacOSX, MLD, Mobile GIS, Neo4J, Numpy, Openlayers, OSRM, PDAL, pgRouting, Planter, PostGIS, Postgres, PyTorch, QGIS, Raspiberry PI, scikit-learn, SQL Server, Spark, State-of-Art, Tensorflow, UAV, vector tiles, viewshed, VNC, Web Mercator
</details>

---

## [](#header-2) I. My static pre-recorded demos......👀

### [](#header-3) **ESRI's Geospatial Platform - ArcGIS Enterprise Server** <small>(*If budget 💰 isn't your consideration......*)</small> 😊

<small>Tech Stack:  **ArcGIS Server**, **SQL Server**, **ArcGIS Javascripts API**, **ArcGIS SDK for iOS/Android**, **Apache Cordova**, **C3.js**, **HTML5/CSS3**</small>

  - [How to Run **ArcGIS Server** Anywhere: **macOS** and **Unsupported Linux** with Containers] { Tutorials available soon!!! }
  - [Dockerize **ArcGIS Enterprise Server** 10.0 SP5 For **Linux**](docs/DockerizingArcGISServerForLinux.md) (avoiding **~$50K/year** Kubernetes licensing)
  - [**State-of-Art/Gov. Tech**]-💧Water Resources Planning-[Integrated Network of Scientific Information & GeoHydrologic Tools](https://nednr.nebraska.gov/insight/)
  - [Lab Project]-Enviromental Planning🏫-A **Mobile GIS** App For Environmental Data Collection-[YouTube](https://youtube.com/shorts/Gt--0rIEpqg?si=ea1OCwAmG3g33REO)
  - [Lab Project]-Enviromental Planning🏫-Volunteered Geographic Information (**VGI**) Website-[YouTube](https://www.youtube.com/watch?v=IKSWJbKdrSA)
  
Potential ways for migrate from ArcGIS Enterprise Server to GeoServer without breaking the frontend:

  - [Reference]-[How to make **GeoServer** mimick the **ArcGIS Server Restful API**](https://docs.geoserver.org/main/en/user/community/gsr/index.html)
  - [Reference]-[Letting **GeoServer** to use the **ESRI's Geodatabase**](https://docs.geoserver.org/2.19.x/en/user/community/arcsde/index.html)

---

### [](#header-3) **OpenSource Cloud Native Geospatial Platform - GeoServer** <small>(*If budget is your consideration......*)</small> 🙁
<small>Tech Stack: **GeoServer**, **PostgresSQL/PostGIS**, **Flask**, **Apache Cordova**, **OpenLayers**, **HTML5/CSS3**</small>

  - [Dockerize **GeoServer** with **GDAL**/**Vector Tiles** plugins and using **GeoMesa** datastore](docs/GeomesaMac.md)
  - One of alternatives to **ArcGIS Enterprise** - [Dockerize **Geoserver** with **GDAL**/**Vector Tiles** plugins](docs/GeoServer.md)
  - [Accessing **GeoTrellis** image server and dynamic tile stitching](docs/Geotrellis.md)  
  - Online **Viewshed** App (**3D trajectory analysis**) - **ESRI** offers this capability via **Spatial/3D Analyst** (**~$650/year**) - [YouTube](https://www.youtube.com/watch?v=OkvwTfUE9yc)
  - Map Visualization Using **GeoServer** and **OpenLayers** - [YouTube](https://www.youtube.com/watch?v=bAyy-3kzrWs)
  - A **Mobile GIS** App By **AngularJS** - [YouTube](https://www.youtube.com/watch?v=FDTTBfp-4wE)
  - Map Publishing on **GeoServer** - [YouTube](https://www.youtube.com/watch?v=GUE5KSlLXWs)

---

### [](#header-3) **Remote Sensing - LiDAR Point Cloud & H3 Hexagon & Digital Elevation Model & 3D Printing** 🛰️
<small>Tech Stack: **QGIS**, **LasTool**, **H3**, **NumPy**, **PDAL**, **GDAL**, **geopandas**, **shapely**, **scikit-learn**, **HTML5/CSS3**</small>

  - [How to **3D Print** My Neighorhood on **Bambu Lab X-1 Carbon**](docs/3DPrintMyNeighbors.md)
  - [A data science tool for generate hexagonal **DEM** from **LiDAR** (build by **PDAL**, **NumPy** and more)](docs/AwsLidarH3.md)
  - [Why need to use hexagonal Digital Surface Model (**DSM**)?](docs/WhyUseHexagon.md)
  - [**H3** hexagon visualization on **Google Earth** pro](docs/GoogleEarthH3Vis.md)
  - [Mapping **H3** in **Web Mercator** projection](docs/H3Distortions.md)
  - Downtown Lincoln, Nebraska - Interactive 3D fly over app - [YouTube](https://www.youtube.com/watch?v=uuQkoqJuizM)
  - Simple **LiDAR** Data Visualization Tool (Wine + **LasTools**) - [YouTube](https://www.youtube.com/watch?v=-3u1CQIp5Hw)

---

### [](#header-3) **Map Routing - Navigation & Realtime GPS+GLONASS & Digital Farming & IoT** 🌎
<small>Tech Stack: **QGIS**, **PostgresSQL/PostGIS**, **OSRM**, **Raspiberry PI**</small>

  - [Learning **pgRouting** (**A***, **Dijkstra**) in **PostGIS**](docs/gisdata/HowToPrepareRoutingData.md)
  - [The world's 1st RC Cassette **Planter**](docs/CassettePlanter.md)
  - [DIYMall DY-880TTL **GPS** module on **Raspiberry PI**](docs/DY880TTL.md)
  - [QMC5883L Magnet **Compass**](docs/PyQMC5883L.md)
  - [Reference]-[Most popular routing engine - **OSRM** (**Contraction Hierarchies (CH)**, **Multi-Level Dijkstra (MLD)**)](https://github.com/Project-OSRM/osrm-backend) ([demo](http://map.project-osrm.org/))
  - [Reference]-[Open Street Map (**OSM**) Wiki Reference](https://wiki.openstreetmap.org/wiki/Open_Source_Routing_Machine)
  - [Reference]-[**OSRM** Project Page](https://project-osrm.org/)
  - [Reference]-[Parallel Routing Analysis using **OSRM** and **Postgres** in **Spark**](https://github.com/UI-Research/spark-osrm)
  - [Reference]-[**OSRM** + **H3** + **Spark** - A New Routing Estimation Method](https://careersatdoordash.com/blog/doordash-fast-travel-estimates/)
  - [Reference]-[Alternative Routing Engine besides **pgRouting** and **OSRM** - the **"Neo4J"**](https://neo4j.com/blog/developer/routing-web-app-neo4j-openstreetmap-leafletjs/)

---
  
### [](#header-3) **Drone Image Stitching - UAV Breeding Crops** 🛩️
<small>Tech Stack: **Three.js**, **OpenLayers**, **HTML5/CSS3**</small>
  
  - [Direct georeferencing **UAV** images](docs/UavDirectGeoreferencing.md) - Cutting costs for (**$$$**) image stitching
  - [Quadrilateral Transformation **Algorithm**](docs/QuadrilateralTransformation.md)
  
---

## [](#header-2) II. My interactive live demos......👀

My interactive live demos are hosted on my personal device for development and testing. *Because the system is not running 24/7, please use the [Send Inquiry](mailto:yanfu.zhou@outlook.com) link to let me know when you plan to view the demos.*

**Please be ware that the self-signed certificate will trigger security warnings in browsers when you visit my site, and there is a way to bypass that warnings documented in here:*

How to temporarily bypass (*Chrome, Edge, Firefox*) warnings

- *Google Chrome/Microsoft Edge:* On the warning page, click the Advanced button, then scroll down and click the "Proceed to \[website address\](unsafe)" or "Continue to" link. A quick trick in Chrome is to simply type thisisunsafe anywhere on the error page.
- *Mozilla Firefox:* Click the Advanced button, then click Accept the Risk and Continue.

Access to my interactive live demos requires login credentials. I will provide the login details in my response email. The demos available for viewing are listed below.

- [Georeferencing UAV Orthos](https://geo2map.com/uav-georeference/qaqc/) Saving cost for your expensive (**$$$**) image stitching process
- [Online Viewshed Analysis](http://geo2map.com/viewshed-master/) This functionality is available in ESRI’s **Spatial/3D Analyst** extensions (**~$650/year** for enterprise users)
- [The ArcGIS Server Feature Service](http://geo2map.com/arcgis/rest/services/demo/routing_cost/FeatureServer) Published on **ArcGIS Server for Linux** running in a container, avoiding the **ArcGIS Server on Kubernetes** license (**~$50K/year** for 64 vCPUs).

For future road map, in the next few years......

- Changing all my existing demonstrations to use secured TCP protocol (HTTPS).
- Get a trusted certificate from [Let's encrypt](https://letsencrypt.org/) (by doing this, security warnings in browsers will be gone).
- Purchase a used bare-metal server and host my demos on it so they can run 24/7. This would actually be cheaper and less maintenance work than renting an **R5.4xlarge EC2 instance** on AWS.

---

## [](#header-2) III. Miscellaneous works......👀

### [](#header-3) **Random Geospatial Works & Self Exploration** 🏞️
  - How to Add BaseMap in **QGIS** - [YouTube](https://www.youtube.com/watch?v=4JESmOrHq5M)
  - [A budget build eGPU on Linux for **Tensorflow**, **PyTorch** development](docs/LinuxGPU.md)
  - [P.E.A.N Stack - YouTube Demo](https://www.youtube.com/watch?v=2cR4JLT3pno)

---

### [](#header-3) **Data Visualization -  Bioinformatics** 🧬
  - [A data science tool for grouping proteins in different pathways (build by **D3js**)](docs/ProteomicsGroupingByWeight.md)

---

### [](#header-3) **Motion Pictures - Urban Planning & Architecture** 🌆
  - [Lab Project] - Cornhusker Corridor LiNK to LNK Plan 2013 - [YouTube](https://www.youtube.com/watch?v=8Mej2ZBo0wM)

---
  
### [](#header-3) **Tricky Things - Cloud Linux & CI/CD Pipeline** 🥷
  - [Programmatically setup **VNC** password](docs/VNCansible.md)
  - [Passing local environment variables to **Kubernetes**](docs/AflaskApp.md)

---

*NOTE: most of the code or data demonstrated here are published to public, if you're interested, you can download them from:

- [my Docker Hub](https://hub.docker.com/u/yzhou16) & [my GitHub Repo](https://github.com/yanfuzhou?tab=repositories)

<br><br>