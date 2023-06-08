
/** @type {import('./$types').PageServerLoad} */
import { VITE_CLIENT_ID } from "$env/static/private"
import { VITE_CLIENT_SECRET } from "$env/static/private"
import { CODE } from "$env/static/private"


const redirect_uri = "http://127.0.0.1:5173/"
// url for first code
const params = `client_id=${VITE_CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&scope=user-read-currently-playing%20user-top-read`
let url_code = 'https://accounts.spotify.com/authorize?' + params;


//acces token request 
export const GET = async () => {
    let url_code_token ='https://accounts.spotify.com/api/token'

const access_token = 
await fetch(url_code_token, {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + (Buffer.from(VITE_CLIENT_ID + ':' + VITE_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials`,
    json: true
})
.then(response => response.json())
.then(data => {
    return data
})
    return  new Response(JSON.stringify(access_token))
}