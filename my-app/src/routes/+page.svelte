<script>
import * as d3 from "d3"
import data from "./mac_miller_simple.json"
import Top from "./components/Top.svelte";
import LinePlot from "./components/LinePlot.svelte";
import album_data from "./album_macmiller.json"
import HeatmapPlot from "./components/HeatmapPlot.svelte"
import album_name from "./album_names.json"
import Chapeau from "./components/Chapeau.svelte";

</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<Chapeau/>
<!-- <Top  data={data}/> -->
<LinePlot  album_data={album_data}
           title={"Parameters evolution over time"}/>

<HeatmapPlot data={data}
             album_name={album_name} />




<style>
    :root {
        --text-color: #070f06;
        --background: #f5fbf4;
        --primary-button: #87cfa2;
        --secondary-button: #e9f6f5;
        --accent: #44ab9f;
        --title: "Nunito", sans-serif;
        --text:"PT Sans",sans-serif;
    }
    :global(body) {
        background-color: var(--background);
    }
    :global(h1) {
        color: var(--text-color);
        font-family: var(--title);
    }
    :global(p, text) {
        color: var(--text-color);
        font-family: var(--text);
    }
</style>