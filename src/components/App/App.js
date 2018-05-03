import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateCart from '../CreateCart'
import Products from '../Products'
import Header from '../Header'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      cart: { "id": 2 }
    } 
  }

  updateCart = (newCart) => {
    this.setState({
      cart: newCart
    })
  }

  content() {
    return this.state.cart === null ?
      <CreateCart updateCart={this.updateCart} /> :
      <Products cartId={this.state.cart.id}/>;
  }

  render() {
    return (
      <div>
        <Header cart={this.state.cart}/>
        {this.content()}
      </div>
    )
  }
}

export default App;
