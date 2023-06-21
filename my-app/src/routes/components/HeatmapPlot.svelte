<script>
    import * as d3 from "d3"
    export let data;

    let one_album = data.filter(data => data.album_name == "Swimming")
    console.log(one_album)
</script>

<div class="wrapper">

</div>


<style>
     .wrapper {
        margin-inline: 2rem;
        max-width: 80rem;
        margin: 0 auto;
    }
</style>