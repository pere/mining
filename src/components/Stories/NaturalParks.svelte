<script>
    import wdpaIntersect_Basic from "../../data/wdpaIntersect_Basic.json";
    export let country;
let intersections=wdpaIntersect_Basic.filter(d=>d.country==country.name)
.sort((a,b)=>b.sum-a.sum);

let exploreAll;
$:filterNum=exploreAll?intersections.length:10;
$: {
    console.warn(filterNum)
}
</script>
<h3>We found {intersections.length} mines crossing Natural Parks in {country.name}</h3>
<div class="container">
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
                {#each intersections as intersection,i}
                {#if i<filterNum}
                <tr>
                    <td>{intersection.wdpa_name}</td>
                    <td>{intersection.sum}</td>
                    
                </tr>
                {/if}
                {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
{#if intersections.length>10}
<div on:click={()=>{ exploreAll=!exploreAll}} class="explore_all">{exploreAll?'Show less':'Show more'}</div>
{/if}
<style>
    .explore_all:hover
    {
        cursor:pointer;
    }
    .explore_all 
    {
        color:white;
        padding: 0.2rem;
    background: tomato;
    text-align: center;
    }
    .container 
    {
        /* max-height: 300px;
        overflow-y: scroll; */
    }
</style>

