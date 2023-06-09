<script>
    import * as d3 from "d3"
    import { onMount } from "svelte";

    onMount( () => {
        d3.json("Kid_cudi.json", function(data) {
    console.log(data);
    });
    }
    ) 



</script>

<!-- {#each kidCudi as dat}
<h1>{dat}</h1>
{/each} -->
