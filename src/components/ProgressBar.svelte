<script>
    import { tweened } from 'svelte/motion';
	// https://svelte.dev/docs#svelte_easing
	import { backInOut } from 'svelte/easing';
    import {storeData} from "./stores.js";
  
    // progress is the value that represents the progress of the bar (0 to 100)
    export let commodity;
    export let commodityStyle;
   /*  console.log($storeData.mapPloted.style)
    let color=$storeData.mapPloted.style.filter(d=>d.name==commodity.commodity)[0].color;
    //[0].color;
    console.warn(commodity) */
  let color=commodityStyle.filter(d=>d.name==commodity.commodity)[0].color;
    //style='background: {color};'
  
    // Create a tweened value for smooth animation
    const tweenedProgress = tweened(0, {
      duration: 1000, // Animation duration in milliseconds
    });
  
    // When the progress prop changes, update the tweened value
    // This will animate the progress bar smoothly
    $: tweenedProgress.set((commodity.percent)/100);
  
  </script>
  <div class="comm_container">
  <div class="commodity">{commodity.commodity}</div>
  <div style="color:#ff9d0b">{commodity.sum} Ha</div>
  <div class="container">

    
        <progress style="--pg-bar: {color}" value="{$tweenedProgress}"></progress>
        <span style="margin-left:10px;">{(commodity.percent).toFixed(2)+'%'}</span>
    
</div>
</div>

  <style>
    .comm_container {
    line-height: 1rem;
    margin-bottom: 8px;
    /* background: #80808000; */
}
    .commodity 
    {
        font-weight: bold;
        width: 100%;
        font-size: .8rem;
    }
    	.container {
            display: flex;
            align-items: center;
	
        /* height: 15px; */
	}
    progress 
    {
        height: 10px;
        /* border-radius: 0!important; */
        accent-color:red!important;
        background: lightblue; 
    }

  
    .progress {
      height: 100%;
      
     
    }

    progress {
  /* color: lightblue; */
}

progress::-moz-progress-bar {
  /* background: lightblue; */
}

progress::-webkit-progress-value {
  
}

progress::-webkit-progress-bar {
  /* background: blue; */
}
progress::-webkit-progress-value {
     background: var(--pg-bar); 
     
    }
  </style>
  

