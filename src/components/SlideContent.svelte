<script>
    import DataOwners from "../data/DataOwners.json";
    import countryArea from "../data/countryArea.json";
    import AllCountriesCommodities from "../data/AllCountriesCommodities.json";
    import StoryInitial from "./Stories/StoryInitial.svelte";
    import {storeData} from "./stores.js";

    import ProgressBar from "./ProgressBar.svelte";
	import { tweened } from 'svelte/motion';
    export let offset;
	// https://svelte.dev/docs#svelte_easing
	import { backInOut } from 'svelte/easing';

    import * as d3 from "d3";

    //storeData.set({story:true});
//     mapPloted: 
// {
//     type: "commodity",
//     style:null
// }
    
    //dispatchEvent("story",true);


    export let country;
        export let index;
        let max_percent=7
    let sel=DataOwners.filter(d=>d.country==country.name)[0];
    console.log(country,countryArea)

    console.log('reaching '+index)
    //{"country":"Tanzania","count":5530,"sum":38938.89}, 
    let counts=countryArea.filter(d=>d.country==country.name)[0];
    

    let commodities=AllCountriesCommodities.filter(d=>d.country==country.name);
    console.warn(AllCountriesCommodities,commodities)

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

	const percentProgress = tweened(100, {
		//delay: delTime,
		duration: 1000,
		/* easing: backInOut */
	});
	
	// Changes the initial value of 30 to percent value in skillLevels array
	let progressValues = commodities.map(d=>d.percent); 

    // Function to update the progress values
    function updateProgress() {
        // Simulate changing progress values (you can replace this with your logic)
        progressValues = progressValues.map((value) => value + 10);
    }

    // Call the updateProgress function repeatedly to see the progress bars animate
    //setInterval(updateProgress, 1500); // Replace 1500 with your desired interval (milliseconds)



  }
    
  console.info(commodities)
  //let commodityStyle=commodities.filter((d,i)=>i<top).map((d,i)=>
    let commodityStyle=commodities.filter((d,i)=>d.percent>max_percent).map((d,i)=>
  {
    return  {
        name:d.commodity,
        color:colorScale(i)
    }
  })
  console.info(commodityStyle)


//.get('mapPloted'))


    
    /*
    "data": [{
         "name": "No data",
        "area": "214253.82"
    }, {
        */
 
</script>

<section class="paragraph">
          
    <div class="scroll-content">
     <h2>{country.name}</h2>
     {#if counts}
     <span>We found {counts.count} mines, covering {counts.sum} Ha</span>
     offset is {offset}
     {/if}

     {#if commodities}
        <h3>Most searched products (>7%)</h3>
        
        {#if sumAllCommodities.length>0}
        
           <!--  {#each commodities.filter((d,i)=>i<10) as commodity,i} -->
            {#each commodities.filter((d,i)=>d.percent>max_percent) as commodity,i}
            
              <!-- <progress value={commodity.percent || 0}></progress> -->
              <ProgressBar {commodity} {commodityStyle} />
            
            {/each}
        
        {/if}

  <!--       <div class="container">
            <div class="row">
                <div class="col-12">
                    <table class="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Ha</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                            {#each commodities.filter((d,i)=>i<10) as commodity,i}
                      
                        {@const color = commodityStyle[i].color}
                        <tr>
                            <td class="my_td" style='background: {color};'>{commodity.commodity} with index {i} color {color}</td>
                            <td>{commodity.sum}   {commodity.percent}</td>
                            
                        </tr>
                        
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> -->
      
     {/if}
     
     {#if country.story}
        {#each country.stories as item}
            
            
            <StoryInitial {item} {index} {country}/>
            
        {/each}
         
     {/if} 
     <h3>Main owners</h3>
     {#if sel}
     <ul>
        
     {#each sel.data.filter((d,i)=>i<10) as owner}
        <li>{owner.name} - {owner.area}</li>
     {/each}
    </ul>
    {/if}
    </div>
  </section>
  <style>
    ul 
    {
        padding:unset;
        padding-left:10px;
        list-style-type: none;
    }
   .content {
    pointer-events: none;
  }

  section {
    margin: 0 0 0 auto;
    height: 120vh;
    padding: 1em;
  }


  section.paragraph {
    max-width: 500px;
  }
  





  h1 {
    margin: 0;
    font-family: "Open Sans", Arial, Helvetica, sans-serif, sans-serif;
  }


  
  </style>