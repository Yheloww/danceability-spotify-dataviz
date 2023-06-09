import FetchWrap from "../../fetch_wrapper";
import { selectProps } from "../../fetch_wrapper";

const mac_miller_id = "4LLpKhyESsyAXpc4laK94U"
const base_url = "https://api.spotify.com/v1/"

const API = new FetchWrap(base_url)
let albums_tracks;

export async function GET() {
    albums_tracks = await fetch('http://127.0.0.1:5173/api/albums_tracks')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return data
    })

    let tacks_name = albums_tracks.map(data => data.name)
    let tacks_id = albums_tracks.map(data => data.id)

    const {access_token} = await fetch('http://127.0.0.1:5173/api/access_token')
    .then(res => res.json())

    let res_object = {}

   for(let i = 0; i < tacks_id.length; i ++) {
        const url_features = `audio-features/${tacks_id[i]}`
        const res =  await API.get(url_features, access_token)
        .then(res => {
            return res} )
        res_object[tacks_name[i]] = res
    }
       



    return new Response(JSON.stringify(res_object))

    // if (res.status === 204 || res.status > 400) {
    //     return new Response(JSON.stringify(res))
    // }

}