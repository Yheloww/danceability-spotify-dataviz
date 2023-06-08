/** @type {import('./$types').PageServerLoad} */

import { VITE_CLIENT_ID } from "$env/static/private"
import { VITE_CLIENT_SECRET } from "$env/static/private"
import { CODE } from "$env/static/private"
import { VITE_REFRESH_TOKEN } from "$env/static/private"
import { ENCODED } from "$env/static/private"

let token; 




fetch('http://127.0.0.1:5173/api/access_token')
.then(response => response.json())
.then(data => {
    token = data.access_token;
    console.log(token)
})



const mac_miller_id = "4LLpKhyESsyAXpc4laK94U"
const url_artist = `https://api.spotify.com/v1/artists/${mac_miller_id}`


fetch(url_artist, {
    method: 'GET',
    headers: {
        "Authorization": `Bearer BQBXiYHwbpCJ1YubjRjng0JH85yrPUDuPHSBnrBOw9dewHhVeZXRFG9JPAagBBWCA204pUaKCo8C_xtB6CpCwhwkoRNTbJ0vHxJbnPeJK8jLYBVqdX8`
    }
})
.then(response => {
    if(!response.ok) {
        console.log('error')
    }
    return response.json();
}).then(data => {
    console.log(data)
})
