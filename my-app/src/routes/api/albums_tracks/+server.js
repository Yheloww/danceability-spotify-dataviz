import FetchWrap from "../../fetch_wrapper"
import { selectProps } from "../../fetch_wrapper"
import { writeFile } from "fs"

const mac_miller_id = "4LLpKhyESsyAXpc4laK94U"
const kid_cudi_id = "0fA0VVWsXO9YnASrzqfmYu"
const url_artist = `artists/${mac_miller_id}/albums`
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
    let res_arr= []

    for(let i = 0; i < albumsId.length; i ++) {
        const url_tracks = `albums/${albumsId[i]}/tracks?limit=50`
        const res =  await API.get(url_tracks, access_token)
        .then(res => { return res.items.map(item => {
                    const container = {};
                    container["name"] = item.name;
                    container["id"] = item.id;
                    container["album"] = albumsName[i];
                    return container
        }) })
        let res_obj = {}
        res_obj["album_name"] = albumsName[i]
        res_obj["tracks"] = res
        res_arr.push(res_obj)
    }

    let tracks_name = res_arr.map((data) => data.tracks.map(data => data.name)).flat(1)
    let tracks_id = res_arr.map((data) => data.tracks.map(data => data.id)).flat(1)
    let album_name = res_arr.map((data) => data.tracks.map(data => data.album)).flat(1)


    let feature_array = [];

    for(let i = 0; i < tracks_id.length; i ++) {
        const url_features = `audio-features/${tracks_id[i]}`
        const res =  await API.get(url_features, access_token)
        .then(res => res )
        let feature_object = {};
        feature_object["album_name"] = album_name[i]
        feature_object["name"] = tracks_name[i]
        feature_object["id"] = tracks_id[i]
        feature_object["Audio-features"] = res
        feature_array.push(feature_object);

    }
    writeFile('mac_miller.json', JSON.stringify(feature_array), (error) => {
        if (error) {
            throw error;
        }
    });

    return new Response(JSON.stringify(feature_array))

}