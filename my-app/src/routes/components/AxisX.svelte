<script>
    import * as d3 from "d3"
    export let height;
    export let xScale;
    export let margin;
    let dates = ["2010-09-01", "2012-01-01", "2014-01-01", "2016-01-01","2018-01-01","2020-01-01","2022-01-01"]
    const parseTime = d3.timeParse("%Y-%m-%d");
    const formatTime = d3.timeFormat("%Y");



</script>

<g>
    {#each dates as date}
    <text x={xScale(parseTime(date))}
     y="{height - margin.bottom}"
     dominant-baseline="hanging"
     dy="6">
     {formatTime(parseTime(date))}
    </text>
    {/each}
</g>