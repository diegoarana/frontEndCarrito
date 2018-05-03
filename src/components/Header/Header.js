import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { fetchCart, removeProduct } from '../../services/cart';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingCart: false,
      loadingCart: false,
      showCart: false
    };
  }

  getCart = () => {
    const { cart, updateCart } = this.props;

    this.updateFetchingCart(true);
    fetchCart(cart.id)
      .then((fullCart) => {
        this.updateFetchingCart(false);
        updateCart(fullCart);
        this.updateShowCart(true);
      });
  }

  updateFetchingCart = (value) => {
    this.setState({
      fetchingCart: value
    });
  }

  updateShowCart = (value) => {
    this.setState({
      showCart: value
    });
  }

  updateLoadingCart(value) {
    this.setState({
      loadingCart: value
    });
  }

  removeProductFromCart = (cartId, productId) => {
    const { updateCart } = this.props;

    this.updateLoadingCart(true);
    removeProduct(cartId, productId)
      .then((newFullCart) => {
        updateCart(newFullCart);
        this.updateLoadingCart(false);
      });
  }

  modalContent(cart) {
    if (!cart) {
      return null;
    }
    if (this.state.loadingCart) {
      return <div>Loading...</div>;
    }

    // eslint-disable-next-line no-param-reassign
    cart.listProduct = cart.listProduct && cart.listProduct.length ? cart.listProduct : [];

    return (
      <div>
        {cart.listProduct.map((item) => (
          <div>
            <p>Name: {item.product.name}</p>
            <p>Price: {item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button
              onClick={() => this.removeProductFromCart(cart.id, item.product.id)}
            >
                  remove
            </button>
          </div>
        ))}
        <p>Total: {cart.totalAmount}</p>
      </div>
    );
  }

  renderCart() {
    const { cart } = this.props;

    if (!cart) {
      return null;
    }

    return (
      <button
        onClick={() => this.getCart()}
      >
        {this.state.fetchingCart ? '...' : 'Cart'}
      </button>
    );
  }
  render() {
    const { cart } = this.props;

    const modal = cart ? (
      <Modal
        show={this.state.showCart}
        onHide={() => this.updateShowCart(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title >Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.modalContent(cart)}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => this.updateShowCart(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    ) : null;

    return (
      <div>
        {this.renderCart()}
        {modal}
      </div>
    );
  }
}

Header.propTypes = {
  cart: PropTypes.object.isRequired,
  updateCart: PropTypes.func.isRequired
};
