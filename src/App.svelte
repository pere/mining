<script>
  import Map from "./components/Map.svelte";
  import contentData from "./data/content.json";
  import appData from "./data/appData.json";
  /* import RangePlayback from "./components/RangePlayback.svelte";
  import Switch from "./components/Switch.svelte"; */
  import Scroller from "@sveltejs/svelte-scroller";
  import { FeaturePositionMap } from "maplibre-gl";
  import SlideContent from "./components/SlideContent.svelte";
  import SlideStory from "./components/SlideStory.svelte";
  import {storeData} from "./components/stores.js";
  import AllCountriesCommodities from "./data/AllCountriesCommodities.json";
  import * as d3 from "d3";
  

  let count;
  let index=0;
  let offset;
  let progress;
  let top = 0;
  let threshold = 0.6;
  let bottom = 0;
  let posIndex;
  let countryStory;

  
  console.log($storeData.story)
  
  $: {
//     story:'initial',
// mapPloted: 
// {
//     country: null,
//     type: "commodity",
//     style:null,
//     fillColor:null
// }

    if (index>0)
    {
      
      let country=appData[index-1].name;

      $storeData.mapPloted.country=appData[index-1].name;
      
      let commodities=AllCountriesCommodities.filter(d=>d.country==country);
    console.warn(commodities)
    let max_percent=7;

    let top=10;
    let selected_schema='interpolateSinebow';
    const createColorScale = (selected_schema, top) => {
          return d3.scaleSequential(d3[selected_schema]).domain([0,top]);
        };

        let colorScale = d3.scaleSequential(d3['interpolateSinebow']).domain([0,top]);


        let sumAllCommodities = [...new Set(commodities.filter((d,i)=>i<top).map((d) => d.sum))];
        if (sumAllCommodities.length>0)
        {
          console.log('MAX is'+Math.max(...sumAllCommodities))
              const max=Math.max(...sumAllCommodities);
              const sumAll=sumAllCommodities.reduce((a,b)=>a+b);
              commodities.map((d,i)=>{
                  d.percent=(d.sum/sumAll)*100;
              })

          

            
              
            console.info(commodities)
            //let commodityStyle=commodities.filter((d,i)=>i<top).map((d,i)=>
              let commodityStyle=commodities.filter((d,i)=>d.percent>max_percent).map((d,i)=>
            {
              return  {
                  name:d.commodity,
                  color:colorScale(i)
              }
            })

            $storeData.mapPloted.type='commodity';
            $storeData.mapPloted.style=commodityStyle;
            $storeData.mapPloted.mapStyle=commodityStyle.reduce(function(memo, val, i) {
                                  memo.stops.push([val.name, val.color])
                                  return memo;
                              }, {
                                  "property": 'commodity',
                                  "type": "categorical",
                                  "stops": []
                              })

          }
    }
    
  }
let scrolly=true;
console.log(appData)
function updateScrolly()
		{
			console.log(scrolly)
			scrolly=!scrolly;
			console.log(scrolly)
		}
function switchStory()
{
  return false
  //countryStory=!countryStory;
}
  
</script>

<div class="content" class:bgclick={index === 4}>
  <!-- <div class="indexClass" on:click={switchStory} style="margin:2rem">{posIndex} Switch</div> -->
  {#if scrolly}
      <Scroller
        {top}
        {threshold}
        {bottom}
        
        bind:count
        bind:index
        bind:offset
        bind:progress
      >
      
        <div slot="background" on:click={switchStory}>
          <Map {index} />
        </div>

        <div slot="foreground">
          
          
          <!-- different content with layers, etc
          Each section in a scrolly is a new indes that is passed to the 'map'

          {
            "name": "Tanzania",
            "adm_0_code": 257,
            "center": [34.744692, -6.695212],
            "zoom": 5.5
          },
        -->
        <!-- {#if index>0} -->
        <!-- <progress value="{index}"></progress> -->
        {#if countryStory}

        {#each 'Story' as l,i}
       
        <SlideStory {l} {index}/>

        {/each}

        {:else}
        <section class="paragraph">
          
          <div class="scroll-content">
            <h2>Description of the project</h2>
            <p>
              We track mining license across Africa...
            </p>

            <p>
              Description of licenses, etc.
            </p>
            </div>
          </section>
          
            {#each appData as country,i}
           
            <!-- <p>{country.name} -- {index}</p> -->
          <SlideContent {country} {index} {offset}/> 
            
            
            {/each}
          
          
        {/if}
       <!--    {:else}
          {#each appData as country,i}
          <section>{country.name}</section>
          
          {/each}
          {/if} -->
        
        </div>
      </Scroller>
      
      {:else}
      <div class="fakemap"  on:click={updateScrolly}>
        <div class="map" on:click={updateScrolly}>
          Nothing to show
        </div>
      </div>
      <div class="nodata_right" style="padding: 0 0 0 50%;">
        right stuff
        {#each appData as c}
          <section>
            <h2>{c.name} normal</h2>
            
           <!--  <button on:click={()=>handleCountry(c.country)}>Click</button> -->
           <!-- <button on:click={()=>scrolly=!scrolly}>Click</button> -->
          </section>
            
        {/each}	
      </div>
      
      
    {/if}
</div>

<style>
.indexClass
{
  z-index: 333333;
  position: fixed;
  font-size: 2rem;
  margin: 0 50% auto;
  color:red;
}          

  .fakemap 
	{
			   position: relative;
    width: 100%;
    height: 100vh; 
		background:tomato
	}
	.map 
	{
		    position: absolute;
    width: 100%;
    height: 100%;
	}
  .nodata_right
	{
		height: 500px;
			margin-right:20px;
		overflow:auto;
					position:absolute;
		top:0;
		right:0;
	}



  :global(section) {
    margin: 0 0 0 auto;
    height: auto!important;
    /* min-height: 100vh; */
    padding: 1em;
    margin-bottom: 60vh!important;
  }


:global(section.paragraph) {
    width: 30vw!important;
    font-size: 12px;
  }
  

:global(div.scroll-content) {
  background: rgb(39 46 82);
    border-radius: 10px;
    border-radius: 5px;
    color:#d7d7d7;
  }
:global(div.scroll-content) {
    padding: 20px;
  }


	.inner {
		   position: relative;
    
    height: 100%; 
		background:blue;
	}
	.right 
	{
		
		margin: 0 0 0 auto;
			position:relative;
		background:blue;
		outline:1px solid blue;
		overflow:hidden;
	}

  /* end no scrolly */
.content 
{
  pointer-events: none;
}
  [slot="background"] {
     pointer-events: none; 
  }

  [slot="foreground"] {
     pointer-events: all; 
  }

 </style>
