<script>
    import * as d3 from "d3"

    export let album_data;
    let width;
    let height = 600;

    const parseTime = d3.timeParse("%Y-%m-%d");

    $: xScale = d3.scaleTime()
                  .domain(d3.extent(album_data, d => parseTime(d.date)))
                  .range([0, width])
    let yScale = d3.scaleLinear([0,1], 
                                [height, 0])

    $: path = d3.line()
                 .x((d) => xScale(parseTime(d.date)))
                 .y((d) => yScale(d.danceability))
                 .curve(d3.curveCatmullRom)(album_data);
</script>
<div class="wrapper">
    <h1>Line plot</h1>

    <div bind:clientWidth={width}>
        <svg {width} {height} >
            {#each album_data as album}
            <circle cx={xScale(parseTime(album.date))}
                    cy={yScale(album.danceability)}
                    r=10
                    fill="aquamarine"
                    stroke-width=1>{album.name}</circle>
            {/each}
            <g>
                <path 
                d="{path}"
                fill="none"
                stroke="aquamarine"
                stroke-width="5"/>
            </g>
        </svg>
    </div>
</div>



<style>
    .wrapper {
        margin-inline: 2rem;
        max-width: 80rem;
        margin: 0 auto;
    }
    svg {
        border: 1px solid red;
    }
</style>