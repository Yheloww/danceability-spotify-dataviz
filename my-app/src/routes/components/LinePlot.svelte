<script>
    import * as d3 from "d3"
    import AxisX from "./AxisX.svelte";
    import AxisY from "./AxisY.svelte";
    import Tooltip from "./Tooltip.svelte"

    // variables
    export let album_data;
    export let title;
    let width;
    let height = 800;
    //parser
    const parseTime = d3.timeParse("%Y-%m-%d");
    //margin 
    const margin = {top: 20, right:120, left:20, bottom:30};

    const params = [{ "name" : "danceability",
                    "line" : danceability,
                      "color" : "#87cfa2"},
                      { "name" : "valence",
                      "line" : valence_test,
                      "color" : "#44ab9f"},
                      { "name" : "energy",
                      "line" : energy,
                      "color" : "black"}]


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
    <!-- <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tenetur, reiciendis nulla consectetur autem laborum provident maiores officia aspernatur recusandae quod minus explicabo assumenda ipsa sed pariatur animi quisquam alias. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat corporis recusandae sit natus, accusantium quia eaque ab eligendi nesciunt provident sunt sapiente. Error vitae fugit quos ipsa tenetur recusandae odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet excepturi a quam veniam laborum ex non temporibus, corporis cum, necessitatibus dolore magnam praesentium! Illum a quidem quibusdam tempora magnam maiores?</p> -->

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
                    stroke="black"
                    opacity={ hoveredData ? param_name && param_name !== "energy" ? "0.2" : "1.0" : "1.0"}
                    stroke-width="5"/>
                </g>
                <g>
                    <path 
                    d="{valence_test}"
                    fill="none"
                    stroke="#44ab9f"
                    opacity={ hoveredData ? param_name && param_name !== "valence" ? "0.2" : "1.0" : "1.0"}
                    stroke-width="5"/>
                </g>
                <g>
                    <path 
                    d="{danceability}"
                    fill="none"
                    stroke="#87cfa2"
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
        max-width: 80rem;
        margin: 0 auto;
        margin-bottom: 5rem;
        border: 5px solid var(--accent);
        border-radius: 2rem;
        padding: 1rem;

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
    p {
        margin-block: 2rem;
        margin-right:10rem;
    }
</style>