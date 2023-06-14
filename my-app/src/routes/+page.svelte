<script>
import * as d3 from "d3"
import { onMount } from "svelte";
import data from "./mac_miller.json"
import { svg_element } from "svelte/internal";
import Top from "./components/Top.svelte";


console.log(data);

const scale = d3.scaleLinear()
    .domain([0,1])
    .range([0,50]);

</script>

<Top/>
