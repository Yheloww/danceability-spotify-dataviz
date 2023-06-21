<script>
    import * as d3 from "d3"
    export let yScale;
    export let width;
    export let margin;
    let points = [0, 0.2,0.5,0.8,1]

</script>

<g transform="translate({margin.left} {margin.top})">
    {#each points as point}
    <text x="0"
          y={yScale(point)}
          dy="-5">{point}</text>
    <line x1="0" 
        y1={yScale(point)} 
        x2={width} 
        y2={yScale(point)} 
        stroke={point == 0 ? "black" : "#cecece"}
        stroke-dasharray={point == 0 ? "0" : "5"}/>
    {/each}
</g>