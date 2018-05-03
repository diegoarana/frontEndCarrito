import React, { Component } from 'react';
import './App.css';
import CreateCart from '../CreateCart';
import Products from '../Products';
import Header from '../Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null,
      notification: {
        message: '',
        show: false
      }
    };
  }
  hideNotification = () => {
    this.setState({ notification: { show: false } });
  }

  showNotification = (message) => {
    this.setState({
      notification: {
        show: true,
        message
      }
    });

    setTimeout(() => this.hideNotification(), 3000);
  }

  updateCart = (newCart) => {
    this.setState({
      cart: newCart
    });
  }

  content() {
    return this.state.cart === null ?
      <CreateCart updateCart={this.updateCart} /> :
      <Products
        cartId={this.state.cart.id}
        updateCart={this.updateCart}
        showNotification={this.showNotification}
      />;
  }

  // eslint-disable-next-line
  notificationContent = () => {
    return this.state.notification.show ? (
      <div>
        <button onClick={this.hideNotification}>x</button>
        {this.state.notification.message}
      </div>
    ) : null;
  }

  render() {
    return (
      <div>
        {this.notificationContent()}
        <Header cart={this.state.cart} updateCart={this.updateCart} />
        {this.content()}
      </div>
    );
  }
}

export default App;
