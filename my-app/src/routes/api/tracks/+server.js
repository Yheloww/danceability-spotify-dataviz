const mac_miller_id = "4LLpKhyESsyAXpc4laK94U"



export async function GET() {
    const albums = await fetch('http://127.0.0.1:5173/api/artist')
    .then(res => res.json())
    .then(data => {
        return Object.values(data);
    })

    const {access_token} = await fetch('http://127.0.0.1:5173/api/access_token')
    .then(res => res.json())

    const url_tracks_by_album = `https://api.spotify.com/v1/albums/${albums[0]}/tracks`

    const res = await fetch(url_tracks_by_album, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    }).then(res => res.json())

    return new Response(JSON.stringify((res.items.map(data => data.id))))

    // if (res.status === 204 || res.status > 400) {
    //     return new Response(JSON.stringify(res))
    // }

}