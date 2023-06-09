<script>
    import * as d3 from "d3"
    import { onMount } from "svelte";
    import data from "./mac_miller.json"
  import { svg_element } from "svelte/internal";

console.log(data);

const scale = d3.scaleLinear()
    .domain([0,1])
    .range([0,50]);

</script>


<div class="test">

    {#each data as dat}
{#if dat.album_name == "Swimming"}
<div class="song">
    <h1>{dat.name}</h1>
<svg>
    <circle cx=50 cy=50  r={scale(dat.Audio_features.energy)}></circle>
    <circle cx=150 cy=50  r={scale(dat.Audio_features.danceability)} fill="aquamarine"></circle>

</svg>
    <p>{dat.Audio_features.energy}</p>
</div>
{/if}
{/each}
</div>


<style>
    .test {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-inline: 2rem;
        justify-content: space-between;
        align-content: center;
    }
    .song {
        background-color: beige;
        padding:1rem;
        border-radius: 2rem;
    
    }
</style>
