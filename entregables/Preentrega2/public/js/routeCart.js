const { response } = require("express");

let cartIdRoute = ''
let quantityInCart = ''

const cartLink = document.querySelector('#CartLink');
const getIdCartRoute = async () => {
    const baseUrl = `${window.location.protocol}//${window.location.host}/api/cart`;
    await fetch (baseUrl,{
        method : 'GET',
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        
    }).then(response => response.json())
        .then(data => cartIdRoute = data[0]._id)
    let url = `${baseUrl}/${cartIdRoute}`
    return url
}

getIdCartRoute().then((url) =>{
    cartLink.href = url;
});
