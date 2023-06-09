

export default class FetchWrap {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(endpoint, access_token) {
        return fetch(this.baseUrl + endpoint, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`
            }})
            .then(response => response.json())
    }

    post(endpoint, client_id, client_secret) {
        return fetch(this.baseUrl + endpoint, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials`,
            json: true
        })
        .then(response => response.json)
    }
}


// function to select some entries in Array of object
// the keys that we need are passed into the props
export function selectProps(...props){
    return function(obj){
      const newObj = {};
      props.forEach(name =>{
        newObj[name] = obj[name];
      });
      
      return newObj;
    }
  }