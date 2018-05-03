import fetch from 'node-fetch'

export const getProducts = ()=>{

    const options = {
        method: 'GET',  
        headers: { 'Content-Type':'application/json' }
    }

    return fetch('http://localhost:8080/api/getProducts/', options)
        .then ((res) =>{
            if (res.ok){
                return res.json()
            }
            return Promise.reject(res.status)
        })
}

export const addTocart = (cartId, productId, quantity)=>{

    let body = {
        "cartId" : cartId,
        "productId" : productId,
        "quantity" : quantity
    }

    const options = {
        method: 'POST', 
        body: JSON.stringify(body), 
        headers: { 'Content-Type':'application/json' }
    }

    return fetch('http://localhost:8080/api/addCartProduct/', options)
            .then((res)=>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(res.status)
            })
}