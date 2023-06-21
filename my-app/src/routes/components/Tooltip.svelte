<script>
    export let data;
    export let param;
    export let yScale;
    export let xScale;
    export let parseTime;
</script>

<div class="tooltip"
     style="position:absolute; top : {yScale(data[param])-5}px; left : {xScale(parseTime(data.date)) + 20}px">
    <p>{data.name}</p>
    <p>{param}:{data[param]}</p>
</div>


<style>
    .tooltip {
        background-color: rgba(207, 205, 205, 0.7);
        border: 1px solid grey;
        padding: 1rem;
        pointer-events: none;
        border-radius: 1rem;
        transition: top 300ms ease, left 300ms ease;
    }
    p {
        margin-block: 0;
        cursor:pointer;
    }
</style>

