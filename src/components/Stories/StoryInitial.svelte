<script>
    
  import NaturalParks from "./NaturalParks.svelte";
    export let item;
    export let index;
    export let country;
    function handleStory(){
        alert(index)
    }
</script>

<div>
          
    <div>
        <h3>{item.title}</h3>
        {#each item.data as data}
        <span class={data.class}>{data.description}</span>
        <span class={data.class}>{data.text}</span>
     
             <!-- content here -->
        {/each}
        {#if item.title=='Natural Parks'}
        <NaturalParks {country}/>            

        {/if}
        <button on:click={handleStory}>Story</button>
    </div>
  </div>
<style>
 
.description 
{
    color:tomat;
}
.text 
{
    color:blue;
}
  
  </style>

