import FetchWrap from "../../fetch_wrapper"
import { selectProps } from "../../fetch_wrapper"

const mac_miller_id = "4LLpKhyESsyAXpc4laK94U"
const kid_cudi_id = "0fA0VVWsXO9YnASrzqfmYu"
const url_artist = `artists/${kid_cudi_id}/albums`
const base_url = "https://api.spotify.com/v1/"

const API = new FetchWrap(base_url)


export async function GET() {
    const {access_token} = await fetch('http://127.0.0.1:5173/api/access_token')
    .then(res => res.json())

    const albums =  await API.get(url_artist, access_token)
    .then(res => { 
        return res.items.filter(data => data.album_type === "album").map(selectProps("id", "name"))})

    let albumsId = albums.map(data => data.id)
    let albumsName = albums.map(data => data.name)
    let res_array = []

    for(let i = 0; i < albumsId.length; i ++) {
        const url_tracks = `albums/${albumsId[i]}/tracks?limit=50`
        const res =  await API.get(url_tracks, access_token)
        .then(res => { return res.items.map(selectProps("id", "name")) })
        let res_object = {}
        res_object["name"] = albumsName[i];
        res_object["album_tracks"] = res;
        res_array.push(res_object)
    }

    let tacks_name = res_array.map(data => data.album_tracks)
    let test = tacks_name.map()
    let tacks_id = res_array.map(data => data.album_tracks).map(data => data.id)

    let feature_object = {};

    for(let i = 0; i < tacks_id.length; i ++) {
        const url_features = `audio-features/${tacks_id[i]}`
        const res =  await API.get(url_features, access_token)
        .then(res => {
            return res} )
        console.log(test)
        feature_object[tacks_name[i]] = res
    }

    return new Response(JSON.stringify((res_array)))

}