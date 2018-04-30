import fetch from 'node-fetch'

export const createCart = (userDni)=>{

    let body = { dni: userDni}

    const options = {
        method: 'POST', 
        body: JSON.stringify(body), 
        headers: { 'Content-Type':'application/json' }
    }

    return fetch('http://localhost:8080/api/create/', options)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(res.status)
        })
 }

 export const fetchCart = (cartId)=>{

    const options = {
        method: 'GET',  
        headers: { 'Content-Type':'application/json' }
    }

    return fetch(`https://private-2cd5b2-cart27.apiary-mock.com/cart/${cartId}`, options)
        .then((res)=>{
            return res.json()
        })
 } 

 export const removeProduct = (productId, cartId) =>{

    const options = {
        method: 'DELETE',  
        headers: { 'Content-Type':'application/json' }
    }

    return fetch(`url/cart/${cartId}`, options)
        .then((res)=>{
            return res.json()
        })
 }