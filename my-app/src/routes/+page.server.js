
/** @type {import('./$types').PageServerLoad} */

export async function load({params}) {

    const access_token = await fetch('http://127.0.0.1:5173/api/artist')
    .then(res => res.json())
    
    return access_token

}



