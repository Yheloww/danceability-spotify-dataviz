const mac_miller_id = "4LLpKhyESsyAXpc4laK94U"
const url_artist = `https://api.spotify.com/v1/artists/${mac_miller_id}`



export async function GET() {
    const {access_token} = await fetch('http://127.0.0.1:5173/api/access_token')
    .then(res => res.json())


    console.log(access_token)
    const res = await fetch(url_artist, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    }).then(res => res.json())

    console.log(res)

    return new Response(JSON.stringify(res))

    // if (res.status === 204 || res.status > 400) {
    //     return new Response(JSON.stringify(res))
    // }

}