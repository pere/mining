<script>
  import allTollRoadData from "./../data/java-toll-data.json";
  import provinsi from "./../data/provinsi.json";
  import labelData from "./../data/labels.json";
  import industriBatang from "./../data/kawasan-industri-batang.json";
  import restArea from "./../data/rest-area.json";
  import tollGates from "./../data/gerbang-tol.json";
  import brebesTimur from "./../data/brebes-timur.json";
  import underConstruction from "./../data/konstruksi.json";
  import pantura from "./../data/pantura-brebes.json";
  import contentData from "./../data/content.json";
  import desa from "./../data/desa.json";
    import { onMount, onDestroy } from "svelte";
  import maplibregl from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";


  
  export let selectedYear = 2014;
  export let rasterYear;
  export let index = 0;

  let map;
  let mapContainer;
  let slideContent;
  let popupRestArea;
  let allLayerId = ["rest-areas", "toll-gates", "desa"];
  let allLinesId = [
    "construction",
    "pantura",
    "brebes-timur",
    "industri-batang",
  ];
  let allRaster = ["brebes-2014", "brebes-2020", "brebes-2020-annotated"];
  let labelDivCollection = [];

  onMount(() => {
    const initialState = { lng: 110.5, lat: -6.8, zoom: 6.5 };

    map = new maplibregl.Map({
      container: mapContainer,
      style: `https://basemaps.cartocdn.com/gl/positron-gl-style/style.json`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    map.scrollZoom.disable();
    map.dragPan.disable();
    map.dragRotate.disable();
    map.keyboard.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
    map.touchPitch.disable();

    map.on("load", function () {
      popupRestArea = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
      });
      map.addSource("all_toll_roads", {
        type: "geojson",
        data: allTollRoadData,
      });

      map.addSource("rest-areas", {
        type: "geojson",
        data: restArea,
      });

      map.addSource("toll-gates", {
        type: "geojson",
        data: tollGates,
      });

      map.addSource("construction", {
        type: "geojson",
        data: underConstruction,
      });

      map.addSource("pantura", {
        type: "geojson",
        data: pantura,
      });

      map.addSource("desa", {
        type: "geojson",
        data: desa,
      });

      map.addSource("brebes-timur", {
        type: "geojson",
        data: brebesTimur,
      });

      map.addSource("industri-batang", {
        type: "geojson",
        data: industriBatang,
      });

      map.addSource("provinsi", {
        type: "geojson",
        data: provinsi,
      });

      map.addSource("brebes-2014", {
        type: "image",
        url: "assets/brebes2014.jpg",
        coordinates: [
          [108.296246230602279, -6.626304532490591],
          [109.394879043102264, -6.626304532490591],
          [109.394879043102264, -7.096013863041794],
          [108.296246230602279, -7.096013863041794],
        ],
      });

      map.addSource("brebes-2020", {
        type: "image",
        url: "assets/brebes-2020.jpg",
        coordinates: [
          [108.3480128645897, -6.6200220929638665],
          [109.4466456770897, -6.6200220929638665],
          [109.4466456770897, -7.128575515704274],
          [108.3480128645897, -7.128575515704274],
        ],
      });
      map.addSource("brebes-2020-annotated", {
        type: "image",
        url: "assets/brebes-2020-annotated.jpg",
        coordinates: [
          [108.3480128645897, -6.6200220929638665],
          [109.4466456770897, -6.6200220929638665],
          [109.4466456770897, -7.128575515704274],
          [108.3480128645897, -7.128575515704274],
        ],
      });

      map.addLayer({
        id: "brebes-2014",
        source: "brebes-2014",
        type: "raster",
        paint: {
          "raster-opacity": 0,
        },
      });

      map.addLayer({
        id: "brebes-2020",
        source: "brebes-2020",
        type: "raster",
        paint: {
          "raster-opacity": 0,
        },
      });

      map.addLayer({
        id: "brebes-2020-annotated",
        source: "brebes-2020-annotated",
        type: "raster",
        paint: {
          "raster-opacity": 0,
        },
      });

      map.addLayer({
        id: "all_toll_roads",
        type: "line",
        source: "all_toll_roads",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FF8200",
          "line-width": 3,
        },
      });
      map.addLayer({
        id: "industri-batang",
        type: "line",
        source: "industri-batang",
        paint: {
          "line-color": "#ffffff",
          "line-width": 4,
          "line-opacity": 0,
        },
      });
      map.addLayer({
        id: "rest-areas",
        type: "circle",
        source: "rest-areas",
        paint: {
          "circle-color": "#06BCC1",
          "circle-opacity": 0,
          "circle-stroke-color": "#06BCC1",
          "circle-stroke-opacity": 0,
          "circle-stroke-width": 1,
          "circle-radius": 5,
        },
      });

      map.addLayer({
        id: "toll-gates",
        type: "circle",
        source: "toll-gates",
        paint: {
          "circle-color": "#ef4123",
          "circle-opacity": 0,
          "circle-stroke-color": "#ef4123",
          "circle-stroke-opacity": 0,
          "circle-stroke-width": 1,
          "circle-radius": 5,
        },
      });

      map.addLayer({
        id: "provinsi",
        type: "fill",
        source: "provinsi",
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "income"],
            0,
            "#A3DAB7",

            35,
            "#25429A",
          ],
          "fill-opacity": 0,
        },
      });

      map.addLayer({
        id: "construction",
        type: "line",
        source: "construction",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FF8200",
          "line-width": 3,
          "line-dasharray": [0.1, 2],
        },
      });

      map.addLayer({
        id: "pantura",
        type: "line",
        source: "pantura",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FFFFFF",
          "line-width": 3,
          "line-opacity": 0,
        },
      });

      map.addLayer({
        id: "brebes-timur",
        type: "line",
        source: "brebes-timur",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ef4123",
          "line-width": 7,
          "line-opacity": 0,
        },
      });

      map.addLayer({
        id: "desa",
        type: "circle",
        source: "desa",
        paint: {
          "circle-color": "#ffffff",
          "circle-opacity": 0,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-opacity": 0,
          "circle-stroke-width": 1,
          "circle-radius": 5,
        },
      });

      labelData.forEach((label) => {
        let labelDiv = document.createElement("div");
        labelDiv.innerHTML +=
          "<span class='text-label' style='line-height: 15px; font-size: 15px; font-weight: bold; padding:5px'>" +
          label.text +
          "</span>";
        labelDiv.id = label.id;
        labelDiv.style.opacity = 0;
        labelDiv.style.color = "#ffffff";

        labelDivCollection.push(labelDiv);

        var marker = new maplibregl.Marker(labelDiv)
          .setLngLat([label.lng, label.lat])
          .addTo(map);
      });
    });
  });
  onDestroy(() => {
    map.remove();
  });

  $: if (index) {
    slideContent = contentData.filter((d) => d.slide_index === index)[0];
    map.flyTo({
      center: [slideContent.lng, slideContent.lat],
      zoom: slideContent.zoom,
      essential: true,
    });

    if (slideContent.tolls_filter) {
      map.setFilter("all_toll_roads", slideContent.tolls_filter);
    } else {
      map.setFilter("all_toll_roads", ["has", "yearnum"]);
    }

    if (slideContent.show_tolls === "FALSE") {
      map.setPaintProperty("all_toll_roads", "line-opacity", 0);
    } else {
      map.setPaintProperty("all_toll_roads", "line-opacity", 1);
    }

    if (slideContent.other_layers.length > 0) {
      let hasRaster = slideContent.raster_layers.length > 0;
      allLayerId.forEach((layer) => {
        if (slideContent.other_layers.includes(layer)) {
          if (slideContent.raster_layers.length > 0) {
            map.setPaintProperty(layer, "circle-stroke-opacity", 1);
            map.setPaintProperty(layer, "circle-opacity", 0);

            map.setPaintProperty(layer, "circle-radius", 20);
          } else {
            map.setPaintProperty(layer, "circle-opacity", 1);
            map.setPaintProperty(layer, "circle-stroke-opacity", 0);
            map.setPaintProperty(layer, "circle-radius", 5);
          }
        } else {
          map.setPaintProperty(layer, "circle-opacity", 0);
          map.setPaintProperty(layer, "circle-stroke-opacity", 0);
        }
      });
    } else {
      // remove all layers
      allLayerId.forEach((layer) => {
        map.setPaintProperty(layer, "circle-opacity", 0);
        map.setPaintProperty(layer, "circle-stroke-opacity", 0);
      });
    }

    if (slideContent.other_line_layers.length > 0) {
      allLinesId.forEach((layer) => {
        if (slideContent.other_line_layers.includes(layer)) {
          map.setPaintProperty(layer, "line-opacity", 1);
        } else {
          map.setPaintProperty(layer, "line-opacity", 0);
        }
      });
    } else {
      // remove all layers
      allLinesId.forEach((layer) => {
        map.setPaintProperty(layer, "line-opacity", 0);
      });
    }

    if (slideContent.raster_layers.length > 0) {
      allRaster.forEach((layer) => {
        if (slideContent.raster_layers.includes(layer)) {
          map.setPaintProperty(layer, "raster-opacity", 1);
        } else {
          map.setPaintProperty(layer, "raster-opacity", 0);
        }
      });
    } else {
      // remove all layers
      allRaster.forEach((layer) => {
        map.setPaintProperty(layer, "raster-opacity", 0);
      });
    }

    if (slideContent.style) {
      map.setPaintProperty(
        slideContent.style_layer,
        slideContent.style_property,
        slideContent.style
      );
    }

    if (slideContent.rest_area_filters) {
      map.setFilter("rest-areas", slideContent.rest_area_filters);
    } else {
      map.setFilter("rest-areas", ["has", "lat"]);
    }

    if (slideContent.toll_gates_filters) {
      map.setFilter("toll-gates", slideContent.toll_gates_filters);
    } else {
      map.setFilter("toll-gates", ["has", "koord_x"]);
    }

    if (selectedYear) {
      if (slideContent.slider === "TRUE") {
        map.setFilter("all_toll_roads", ["<=", "yearnum", selectedYear]);
      }
    }

    if (slideContent.raster_slider === "TRUE" && rasterYear) {
      let yearBefore = slideContent.raster_options[0];
      let yearAfter = slideContent.raster_options[1];
      let layerBefore = slideContent.raster_layers[0];
      let layerAfter = slideContent.raster_layers[1];

      switch (rasterYear) {
        case yearBefore:
          map.setPaintProperty(layerBefore, "raster-opacity", 1);
          map.setPaintProperty(layerAfter, "raster-opacity", 0);
          break;
        case yearAfter:
          map.setPaintProperty(layerAfter, "raster-opacity", 1);
          map.setPaintProperty(layerBefore, "raster-opacity", 1);
          break;
        default:
          map.setPaintProperty(layerAfter, "raster-opacity", 1);
          map.setPaintProperty(layerBefore, "raster-opacity", 1);
      }
    }
    if (slideContent.labels_shown) {
      labelDivCollection.forEach((div) => {
        if (slideContent.labels_shown.includes(div.id)) {
          div.style.opacity = 1;
          if (slideContent.label_color) {
            div.style.color = slideContent.label_color;
            div.style.backgroundColor = "#ffffff";
          } else {
            div.style.color = "#ffffff";
            div.style.backgroundColor = "black";
          }
        } else {
          div.style.opacity = 0;
        }
      });
    } else {
      labelDivCollection.forEach((div) => {
        div.style.opacity = 0;
      });
    }

    if (slideContent.show_choropleth === "TRUE") {
      map.setPaintProperty("provinsi", "fill-opacity", 0.95);
    } else {
      map.setPaintProperty("provinsi", "fill-opacity", 0);
    }

    if (index === 4) {
      map.on("mouseenter", "rest-areas", function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.keterangan;
        var resto =
          "<p><strong>Restaurants</strong>: " +
          e.features[0].properties.dftr_resto +
          "</p>";
        var musho =
          "<p><strong>Prayer Room</strong>: " +
          e.features[0].properties.dftr_musho +
          "</p>";
        var minimart =
          "<p><strong>Minimart</strong>: " +
          e.features[0].properties.dftr_minim +
          "</p>";
        var bengkel =
          "<p><strong>Car Repair Shop</strong>: " +
          e.features[0].properties.dftr_bengk +
          "</p>";
        var atm =
          "<p><strong>ATM</strong>: " +
          e.features[0].properties.dftr_atm +
          "</p>";
        var spbu = e.features[0].properties.spbu;
        var gas =
          spbu === 1
            ? "<p><strong>Gas Station</strong>: Yes</p>"
            : "<p><strong>Gas Station</strong>: No</p>";
        var description =
          "<strong>" +
          name +
          "</strong>" +
          resto +
          musho +
          minimart +
          bengkel +
          atm +
          gas;

          alert('sdf')
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        popupRestArea.setLngLat(coordinates).setHTML(description).addTo(map);
      });

      map.on("mouseleave", "rest-areas", function () {
        map.getCanvas().style.cursor = "";
        popupRestArea.remove();
      });
    }
  }
</script>

<div class="map-wrap">
  <div class="map" id="map" bind:this={mapContainer} />
</div>

<style>
  .map-wrap {
    position: relative;
    width: 100%;
    height: 100vh; 
  }
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
