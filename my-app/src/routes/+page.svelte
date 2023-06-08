<script>
    /** @type {import('./$types').PageData} */
    export let data;

    export let names = data.items.map(data => data.id)
</script>


<h1>{names}</h1>
