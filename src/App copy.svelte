<script>
  import Map from "./components/Map.svelte";
  import contentData from "./data/content.json";
  import RangePlayback from "./components/RangePlayback.svelte";
  import Switch from "./components/Switch.svelte";
  import Scroller from "@sveltejs/svelte-scroller";

  let count;
  let index;
  let offset;
  let progress;
  let top = 0;
  let threshold = 0.9;
  let bottom = 0;
  let selectedYear = 2014;

  let rasterYear = 2020;


  
</script>

<div class="content" class:bgclick={index === 4}>
  <Scroller
    {top}
    {threshold}
    {bottom}
   
    bind:count
    bind:index
    bind:offset
    bind:progress
  >
    <div slot="background">
      <Map {index} {selectedYear} {rasterYear} />
    </div>

    <div slot="foreground">
      <!-- different content with layers, etc
      Each section in a scrolly is a new indes that is passed to the 'map'
     -->
      {#each contentData as content}
        <section class={content.class}>
          <div class="scroll-content">
            {#if content.text}
              {#if content.class === "headline"}
                <h1 class="headline">
                  The Trans-Java Toll Road <img
                    style="width: 30px; display: inline"
                    src="/assets/jalan-tol.svg"
                  />
                </h1>
                <p class="deck">
                  Indonesia has managed to build 1,900 km of new toll nationwide
                  roads in just 7 years. Most notably, a toll road that connects
                  the island of Java. Let's look into the impact of these new
                  routes.
                </p>
                <p class="byline">BY STEPHANIE ADELINE</p>
              {:else if content.class === "about"}
                <h2 class="about-head">About this project</h2>
                <p>
                  {@html content.text}
                </p>
              {:else}
                <p>{@html content.text}</p>

                {#if content.inline_image}
                  <img
                    class="inline-image"
                    src={"/assets/" + content.inline_image}
                  />
                  {#if content.image_source}
                    <p class="credit">
                      Image credit: {@html content.image_source}
                    </p>
                  {/if}
                {/if}
              {/if}
              {#if content.slider === "TRUE"}
                <div class="year-controls">
                  <div class="year-label">{selectedYear}</div>
                  <RangePlayback
                    min={1978}
                    max={2021}
                    bind:value={selectedYear}
                  />
                </div>
              {/if}
              {#if content.raster_slider === "TRUE"}
                <div class="year-controls">
                  <Switch
                    bind:value={rasterYear}
                    design="multi"
                    label="Switch year"
                    options={[
                      content.raster_options[0],
                      content.raster_options[1],
                    ]}
                  />
                </div>
              {/if}
              {#if content.datawrapper}
                <div>
                  <script
                    type="text/javascript"
                    defer
                    src={"https://datawrapper.dwcdn.net/" +
                      content.datawrapper +
                      "/embed.js?v=2"}
                    charset="utf-8"
                  ></script><noscript
                    ><img
                      src={"https://datawrapper.dwcdn.net/" +
                        content.datawrapper +
                        "/full.png"}
                      alt=""
                    /></noscript
                  >

                  <!-- test test test -->
                </div>
              {/if}
            {/if}
          </div>
        </section>
      {/each}
    </div></Scroller
  >
</div>

<style>
  .content {
    pointer-events: none;
  }

  [slot="background"] {
    pointer-events: none;
  }

  [slot="foreground"] {
    pointer-events: all;
  }

  section {
    margin: 0 0 0 auto;
    height: 120vh;
    padding: 1em;
  }

  section.about {
    height: auto;
  }

  section.paragraph {
    max-width: 500px;
  }
  .inline-image {
    max-width: 500px;
    width: 100%;
  }

  div.scroll-content {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
  }
  div.scroll-content {
    padding: 20px;
  }

  section.headline {
    max-width: 650px;
  }

  section.headline div {
    background: rgb(3, 101, 84);
    margin: 10px;
    border: thick double white;
    color: white;
  }

  section.paragraph div.scroll-content {
    background: rgba(255, 255, 255, 0.8);
  }

  .year-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
  }

  h1 {
    margin: 0;
    font-family: "Open Sans", Arial, Helvetica, sans-serif, sans-serif;
  }

  .deck {
    font-family: "Open Sans", Arial, Helvetica, sans-serif, sans-serif;
    font-size: 18px;
  }

  .byline {
    font-size: 12px;
  }

  .about {
    background: white;
    pointer-events: all;
  }
  .about div {
    margin: auto;
    max-width: 700px;
    pointer-events: all;
  }

  .year-label {
    width: 60px;
    text-align: right;
  }
  .credit {
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
  }

  .bgclick [slot="foreground"] {
    pointer-events: none;
  }

  .bgclick [slot="background"] {
    pointer-events: all;
  }
</style>
