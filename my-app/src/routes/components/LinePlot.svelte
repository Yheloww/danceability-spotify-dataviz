<script>
    import * as d3 from "d3"
    import AxisX from "./AxisX.svelte";
    import AxisY from "./AxisY.svelte";
    import Tooltip from "./Tooltip.svelte"

    // variables
    export let album_data;
    export let title;
    let width;
    let height = 600;
    //parser
    const parseTime = d3.timeParse("%Y-%m-%d");
    //margin 
    const margin = {top: 20, right:120, left:20, bottom:30};

    const params = [{ "name" : "danceability",
                    "line" : danceability,
                      "color" : "red"},
                      { "name" : "valence",
                      "line" : valence_test,
                      "color" : "blue"},
                      { "name" : "energy",
                      "line" : energy,
                      "color" : "orange"}]


    // scales
    $: xScale = d3.scaleTime()
                  .domain(d3.extent(album_data, d => parseTime(d.date)))
                  .range([0, width - margin.left - margin.right])
    let yScale = d3.scaleLinear([0,1], 
                                [height - margin.top - margin.bottom, 0])

    $: valence_test = d3.line()
                 .x((d) => xScale(parseTime(d.date)))
                 .y((d) => yScale(d.valence))
                 .curve(d3.curveCatmullRom)(album_data);
    $: danceability = d3.line()
                 .x((d) => xScale(parseTime(d.date)))
                 .y((d) => yScale(d.danceability))
                 .curve(d3.curveCatmullRom)(album_data);
    $: energy = d3.line()
                 .x((d) => xScale(parseTime(d.date)))
                 .y((d) => yScale(d.energy))
                 .curve(d3.curveCatmullRom)(album_data);

    let hoveredData;
    let param_name;
</script>
<div class="wrapper">
    <h1>{title}</h1>

    <div bind:clientWidth={width}
    on:mouseleave={() => {
        hoveredData = null;
    }}>
        <svg {width} {height} >
            <g class="plot" 
            transform="translate({margin.left} {margin.top})">

                <g>
                    <path 
                    d="{energy}"
                    fill="none"
                    stroke="orange"
                    opacity={ hoveredData ? param_name && param_name !== "energy" ? "0.2" : "1.0" : "1.0"}
                    stroke-width="5"/>
                </g>
                <g>
                    <path 
                    d="{valence_test}"
                    fill="none"
                    stroke="blue"
                    opacity={ hoveredData ? param_name && param_name !== "valence" ? "0.2" : "1.0" : "1.0"}
                    stroke-width="5"/>
                </g>
                <g>
                    <path 
                    d="{danceability}"
                    fill="none"
                    stroke="red"
                    opacity={ hoveredData ? param_name && param_name !== "danceability" ? "0.2" : "1.0" : "1.0"}
                    stroke-width="5"/>
                </g>
                {#each params as param}
                    {#each album_data as album}
                        <circle cx={xScale(parseTime(album.date))}
                                cy={yScale(album[param.name])}
                                r={hoveredData == album && param_name == param.name ? "15" : "7"}
                                opacity={hoveredData ? hoveredData == album && param_name == param.name ? "1" : "0.2" : "1"}
                                fill={param.color}
                                stroke-width=1
                                on:mouseover={() => {
                                    hoveredData = album
                                    param_name = param.name
                                }}
                                on:focus/>
                        <text x={xScale(parseTime(album.date))}
                            y={yScale(album[param.name])}
                            fill={param.color}
                            transform="translate(10,2)">{album.name == "I Love Life, Thank You" ? param.name : ""}</text>
                    {/each}
                {/each}
            </g>
            <AxisX {height} {xScale} {margin}/>
            <AxisY {yScale} {width} {margin}/>
        </svg>
        {#if hoveredData}
        <Tooltip data={hoveredData} 
                 param={param_name}
                 {yScale} {xScale}
                 {parseTime}/>
        {/if}
    </div>
</div>



<style>
    .wrapper {
        margin-inline: 2rem;
        max-width: 100rem;
        margin: 0 auto;
    }
    h1{
        text-align: center;
    }
    /* svg {
        border: 1px solid red;
    } */
    text {
        font-size: 20px;
    }

    circle {
        transition: all 300ms ease;
    }
    path {
        transition: all 300ms ease;
    }
</style>