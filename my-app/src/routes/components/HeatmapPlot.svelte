<script>
    import * as d3 from "d3"
    import { text } from "svelte/internal";
    import Tooltip from "./Tooltip.svelte"
    export let data;
    export let album_name;
    let width;
    let height = 850;
    let margin = {left: 20, right: 50, top: 50, bottom: 50}
    let color_start = "black"
    let color_end = "#87cfa2"

    let xScale = d3.scaleLinear()
                   .domain([0, 13])
                   .range([0, width])

    let colorScale = d3.scaleLinear()
                       .domain([0,1])
                       .range([color_end, color_start])

    
    let hoveredData;
    let param_name;
</script>

<div class="wrapper">
    <h1>Heatmap</h1>
    <div bind:clientWidth={width}
    on:mouseleave={() => {
        hoveredData = null;
    }}>
        <svg {height} {width} >
        {#each album_name as album, i}
            <text x={margin.left +35}
                  y={(i + 1) * 80 - 38}
                  fill="black"
                  alignment-baseline="central"
                  text-anchor="start"
                  >{album}</text>

            {#each data.filter(data => data.album_name == album) as track}
                <circle cx="{track.track_number * width*0.037 + margin.left}"
                        cy="{(i + 1)* 80}"
                        r={width*0.017}
                        fill={colorScale(track.danceability)} 
                        on:mouseover={() => {
                            hoveredData = track
                        }}
                        on:focus
                        />
            {/each}
        {/each}
        </svg>
        <!-- <Tooltip data={hoveredData} 
        param={param_name}
        {yScale} {xScale}
        {parseTime}/> -->

        <div>
            <svg {width} height="100">
                <rect y="0"
                      x={margin.left + 35} 
                      width="300" 
                      height="20" 
                      fill="url(#linear-gradient)"
                      rx=10
                />
                <defs>
                    <linearGradient id="linear-gradient"
                        x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop  offset="0%" stop-color={color_end}/>
                        <stop  offset="100%" stop-color={color_start}/>
                    </linearGradient>
                </defs>
            </svg>
        </div>

    </div>
</div>


<style>
    h1 {
        text-align: center;
    }
     .wrapper {
        margin-inline: 2rem;
        max-width: 80rem;
        margin: 0 auto;
        border: 5px solid var(--accent);
        border-radius: 2rem;
        padding: 1rem;

    }
    svg {
    }
    text {
        font-size: 20px;
    }
</style>