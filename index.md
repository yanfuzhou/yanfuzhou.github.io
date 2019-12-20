---
layout: yanfu
---

# [](#header-1)Project background

Lidar Point Cloud (LPC) data is a popular source for building high precision and high resolution (>= 1/9 arc-second approximately 3m) 
digital elevation model (DEM). Due to current limitations of image data structure and image rendering architecture, 
not many projects have done massive production of high resolution and high precision **Hexagonal Digital Surface Model (HDSM)**. 
This project targeted at above challenges and tried to create massive production of HDSM by using 
[USGS's public LIDAR dataset](ftp://rockyftp.cr.usgs.gov/vdelivery/Datasets/Staged/Elevation/LPC/Projects).

# [](#header-1)Why using hexagonal grid?

Using hexagonal grid to fill a [2d plane](https://www.mathsisfun.com/geometry/plane.html) has three major advantages over using square/circle/octagon grid: 

1. Hexagonal grid could fill a 2d plane without creating gaps or overlaps  
![](./images/s1_adv_01.png)
2. For the interpolation process, hexagonal grid desires 13.4% less sampling points than square grid requires  
![](./images/s1_adv_02.png)
3. For building drainage networks on an elevation model, hexagonal grid could maintain streamflow directon better than square grid 
(See paper: [De Sousa, 2006](./pdfs/2006_Assessing_the_accuracy_of_hexagonal_versus_square_tilled_grids_in_preserving_DEM_surface_flow_directions.pdf))

# [](#header-1)Experimental locations
![](./images/s2_aoi_01.png)
## [](#header-2)Result comparison
![](./images/s2_aoi_01_hexagon_vs_grid.png)
