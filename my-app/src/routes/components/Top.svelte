<script>
    import { max } from "d3-array";
    import * as d3 from "d3"
    import { each } from "svelte/internal";
  import { select } from "d3";

    export let data;
    const simple_albums = data.filter(data => !data.album_name.includes("Commentary")).filter(data => !data.album_name.includes("Remastered")).filter(data => !data.album_name.includes("Deluxe")).filter(data => !data.album_name.includes("London"))
    $: choice ="danceability";

    let parameters = ['danceability', 'energy', 'valence', 'instrumentalness', 'speechiness', 'acousticness',]
    $: sorted_dance = (start, end) => {
        let albums = simple_albums.slice().sort((a,b) => d3.descending(a[choice], b[choice])).slice(start,end)
        return albums}



</script>
<div class="wrapper">
    <div class="title">
        <form>
            <select bind:value={choice}>
            {#each parameters as param}
            <option value={param}>
                {param}
            </option>
            {/each}
            </select>
        </form>
    </div>
    <div class="cards">
        <div class="card">
            <h2>Highest in {choice}</h2>
            {#each sorted_dance(0,5) as track}
                <p>{track.name} {track[choice]}</p>
            {/each}
        </div>
        <div class="card">
            <h2>Lowest in {choice}</h2>
    {#each sorted_dance(simple_albums.length-5,simple_albums.length) as track}
        <p>{track.name} {track[choice]}</p>
    {/each}
        </div>
    </div>
</div>

<style>
    .wrapper {
        max-width: 100rem;
        margin-inline: auto;
    }
    .title {
        background-color: #1cb034;
        border-radius: 2rem;
        padding:1rem;
        text-align: center;
        margin-bottom: 1rem;
        }
    .cards{
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: space-around;
    }
    .card {
        background-color: #0e583f;
        border-radius: 2rem;
        padding: 2rem;
        color: white;
    }

    select {
        border-radius: 2rem;
        padding: 0.5rem;
        font-size: 1.2rem;
    }

</style>






