<script>
 
    import { onMount, onDestroy } from "svelte";
    import appData from "../data/appData.json";    
  // import from "maplibre-gl"; 
  import "maplibre-gl/dist/maplibre-gl.css";
  import { Map, NavigationControl, Popup, LngLat } from "maplibre-gl";
  import {storeData} from "./stores.js";

  export let index;

  let map;
  let mapContainer;
  let slideContent;
  let idle=false;
  

  onMount(() => {
    

    map = new Map({
      container: mapContainer,
      style: `https://basemaps.cartocdn.com/gl/positron-gl-style/style.json`,
      center: [34.172544,-0.997903],
      zoom: 4,
    });

     map.scrollZoom.disable();
    // map.dragPan.disable();
    map.dragRotate.disable();
    //map.keyboard.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
    map.touchPitch.disable();
 /*    map.on('zoom',(d)=>
          {
            currentZoom=map.getZoom();
          //  console.log(d.target.getZoom())
          }) */
          map.on("load", function () {

            map.addControl(new NavigationControl(), "top-left");
            map.addSource("wdpa_iucn_source", {
                      "type": "vector",
                      // "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:mining_data&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]                        
                      "tiles": ["https://pere.gis-ninja.eu/geoserver/gwc/service/wmts?layer=mining:wdpa_iucn&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
                  });

                  map.addLayer({
                      "id": "wdpa_iucn",
                      "type": "fill",
                      "source": "wdpa_iucn_source",
                      
                      "source-layer": "wdpa_iucn",
                      'paint': {
                        "fill-color": "#A2D729",
                        "fill-opacity": 0.8
                      /* 
                        "stroke": "#342E37",
                        
                      'stroke-width': 1.5
                      */
                      } 
                    })

            map.addSource("mining_data_source", {
                      "type": "vector",
                      // "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:mining_data&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]                        
                      "tiles": ["https://pere.gis-ninja.eu/geoserver/gwc/service/wmts?layer=mining:mining_all&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
                  });

                  map.addLayer({
                      "id": "mining_data",
                      "type": "fill",
                      "source": "mining_data_source",
                      
                      "source-layer": "mining_all",
                      'paint': {
                  "fill-color": "#F0F66E",
            "fill-opacity": 0.9
        },
                  //    'filter': ['all', ["==", ["get", 'adm_0_code'], 66]]
                      
                  });
                
                  map.addSource("mining_wdpa_intersected_source", {
                      "type": "vector",
                      // "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=hotspots:mining_data&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]                        
                      "tiles": ["https://pere.gis-ninja.eu/geoserver/gwc/service/wmts?layer=mining:mining_wdpa_intersected&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
                  });

                  map.addLayer({
                      "id": "mining_wdpa_intersected",
                      "type": "fill",
                      "source": "mining_wdpa_intersected_source",
                      
                      "source-layer": "mining_wdpa_intersected",
                      'paint': {
                        "fill-color": "#F0F66E",
                        "fill-opacity": 0.8
                      /* 
                        "stroke": "#342E37",
                        
                      'stroke-width': 1.5
                      */
                      } 
                    })
                  console.log(map.getStyle().layers)
                  

                
          
        });
})
  onDestroy(() => {
    map.remove();
  });
$: if (map)
{
  map.on('idle',function(){
              console.log('idle')
              
              console.log(map.getZoom())
              console.log(map.getBounds())
              idle=true;
          
              
    /*
              storeData.set({mapPloted:{
                    type: "commodity",
                    style:commodityStyle,
                    mapStyle:commodityStyle.reduce(function(memo, val, i) {
                                        memo.stops.push([val.name, val.color])
                                        return memo;
                                    }, {
                                        "property": 'commodity',
                                        "type": "categorical",
                                        "stops": []
                                    })
                  }
                });
                console.warn($storeData.mapPloted)
                */
            })
          }

          $:index,function(){
            console.info(index)
          }
  $: if (idle) {
    //index &&  ==> when  index=0 it interprets as false
    /*
    {
        "name": "Tanzania",
        "adm_0_code": 257,
        "center": [34.744692, -6.695212],
        "zoom": 5.5
      },
      */
     
    //why???
    console.log(index)
    slideContent = appData.filter((d,i) => i === index-1)[0];
    if (slideContent) {
                                map.flyTo({
                                    // These options control the ending camera position: centered at
                                    // the target, at zoom level 9, and north up.
                                    center:slideContent.center,
                                    zoom: slideContent.zoom,
                                    bearing: 0,

                                    // These options control the flight curve, making it move
                                    // slowly and zoom out almost completely before starting
                                    // to pan.
                                    speed: 0.8, // make the flying slow
                                    curve: 3, // change the speed at which it zooms out
                                    offset: [-200, 0],
                                    // This can be any easing function: it takes a number between
                                    // 0 and 1 and returns another number between 0 and 1.
                                    easing: function(t) {
                                        return t;
                                    },

                                    // this animation is considered essential with respect to prefers-reduced-motion
                                    essential: true
                                });

    
                                  map.setFilter('mining_data', ['all', ["==", ["get", 'adm_0_code'], slideContent.adm_0_code]]);

                                  console.warn($storeData)
                                  console.info($storeData.mapPloted.country)

                                  if ($storeData.mapPloted) 
                                  {
                                    if ($storeData.mapPloted.type=='commodity')
                                    {
                                      console.log(JSON.stringify($storeData.mapPloted.mapStyle))
                                      map.setPaintProperty('mining_data', 'fill-color', $storeData.mapPloted.mapStyle);
                                      console.warn(map.getStyle().layers.filter(d=>d.id=='mining_data')[0])
                                    }
                                  }
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
