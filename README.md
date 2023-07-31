# Cartography module Final Project: Impact of Trans-Java Toll Road

This is Stephanie Adeline's final project for the Cartography module of MVTEC.

The online link is here, deployed via vercel: [https://trans-java.vercel.app/](https://trans-java.vercel.app/)

If you wish to run this project locally, you can clone it and run:
`npm i` and `npm run dev`.

This story is Stephanie’s final project for the cartography module in the Master’s in Visual Tools to Empower Citizens program from the University of Girona and the Visualization for Transparency Foundation.

The text in this project has not been fact-checked or edited. Please take it as a proof of concept only.

## Methodology
The spatial data for the toll roads [in operation](https://katalog.data.go.id/dataset/master-data-aset-infrastruktur-jalan-tol-operasi) and [under construction](https://katalog.data.go.id/dataset/master-data-aset-infrastruktur-jalan-tol-konstruksi), along with data on [rest areas](https://katalog.data.go.id/dataset/master-data-aset-infrastruktur-rest-area) and [toll gates](https://katalog.data.go.id/dataset/master-data-aset-infrastruktur-gerbang-tol) were obtained from data.go.id.

The shapefile boundaries for provinces were obtained from [Indonesia Geospasial](https://www.indonesia-geospasial.com/2020/04/download-shapefile-shp-batas.html).

Data for when toll roads started operating was obtained from [Badan Pengatur Jalan Tol](https://bpjt.pu.go.id/konten/progress/jalan-tol-ppjt). This data is then joined in QGIS with the toll-road lines, and manual checks were done to ensure the names joined were perfectly matching.

Satellite imagery was obtained from Landsat 8 via EO browser. Flood raster image was also obtained from [EO browser](https://apps.sentinel-hub.com/eo-browser/) using Sentinel 1 data.

Data to create the choropleth map of additional income earned by province was obtained from a research by [Kompas](https://www.kompas.id/baca/riset/2021/12/20/dampak-pembangunan-tol-trans-jawa-pada-perekonomian).

Further satellite image timelapses were obtained from Google Earth Pro.

This page was built using Svelte, using the [svelte-scroller](https://github.com/sveltejs/svelte-scroller). The main scrolly code is in [App.svelte](https://github.com/stephadeline/trans-java/blob/main/src/App.svelte) and maps were built using MapLibre in the [Map.svelte](https://github.com/stephadeline/trans-java/blob/main/src/components/Map.svelte) file. To display/hide certain layers by slide index, I used the paint property and opacity. The style is from Carto.

The content for the text was created in a [Google Sheet](https://docs.google.com/spreadsheets/d/1aHVn_qIDBXCEVmpZCjRrOSiN5d58kjkRxQ4x2t_nChU/edit?usp=sharing) which was then converted to Json and stored in the [data folder](https://github.com/stephadeline/trans-java/tree/main/src/data), along with other geojson files.

## Challenges, potential improbements, and some work that I did but didn't end up including

I looked into the NDVI of the areas, using a buffer of the toll road but didn't find anything meaningful. See this [Google Earth Script](https://code.earthengine.google.com/85b2e5ced160193150b4eb11200a5c54) for the script I used.

I also wanted to add tool tips for the routes and toll gates, but only had time to do for rest-areas.

Further improvements could also include:
- Optimizing the data and images, so that the performance is better.
- Improving the interface on mobile, so that users can see the full map on mobile.
