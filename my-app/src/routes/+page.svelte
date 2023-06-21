<script>
import * as d3 from "d3"
import data from "./mac_miller_simple.json"
import Top from "./components/Top.svelte";
import LinePlot from "./components/LinePlot.svelte";
import album_data from "./album_macmiller.json"

</script>

<!-- <Top  data={data}/> -->
<LinePlot  album_data={album_data}/>