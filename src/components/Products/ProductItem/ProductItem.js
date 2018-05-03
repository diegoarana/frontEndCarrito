import React, { Component } from 'react'
import './ProductItem.css'

export default class ProductItem extends Component{
    render(){
        const { id, name, price, selectItem} = this.props;
        return  <div
                    className='product-item'
                    onClick={selectItem}
                >
                    <p>Name: {name}</p>
                </div>
    }
}