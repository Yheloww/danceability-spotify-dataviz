<script>
    import * as d3 from "d3";
    import data from "../mac_miller.json";

    let danceability = d3.max(data.map(dat => data.danceability))
    console.log(data)

</script>

<p>Hello</p>

<h1>{danceability}</h1>
