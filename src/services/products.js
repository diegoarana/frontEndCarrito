import fetch from 'node-fetch'

export const getProducts = ()=>{

    const options = {
        method: 'GET',  
        headers: { 'Content-Type':'application/json' }
    }

    return fetch('http://private-2cd5b2-cart27.apiary-mock.com/products', options)
        .then ((res) =>{
            if (res.ok){
                return res.json()
            }
            return Promise.reject(res.status)
        })
}