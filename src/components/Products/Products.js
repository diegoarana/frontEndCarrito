import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { getProducts, addToCart } from '../../services/products';
import ProductItem from './ProductItem';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      fetchingProducts: false,
      selectedItem: null,
      quantity: null,
      addingProduct: false
    };
  }

  componentWillMount = () => {
    this.updateFetchinProducts(true);
    this.getProducts();
  }

  getProducts = () => {
    getProducts()
      .then((productList) => {
        this.updateFetchinProducts(false);
        this.updateProductList(productList);
      });
  }

  updateProductList = (productList) => {
    this.setState({
      productList
    });
  }

  addToCart = (cartId, productId, quantity) => {
    const { updateCart, showNotification } = this.props;

    this.updateAddingProduct(true);
    addToCart(cartId, productId, quantity)
      .then((updatedCart) => {
        updateCart(updatedCart);
        this.updateAddingProduct(false);
        showNotification('Product added!!');
      });
  }

  updateQuantity = (quantity) => {
    this.setState({
      quantity
    });
  }

  updateFetchinProducts = (value) => {
    this.setState({
      fetchingProducts: value
    });
  }

  updateSelectedItem = (value) => {
    this.setState({
      selectedItem: value
    });
  }

  updateAddingProduct = (value) => {
    this.setState({
      addingProduct: value
    });
  }

  modalContent(product) {
    const { cartId } = this.props;

    if (this.state.addingProduct) {
      return <div>Loading...</div>;
    }

    if (product) {
      return (
        <div>
          <p> Product name : {product.name} </p>
          <p> Product price : {product.price}</p>
          <input
            type="number" value={this.state.quantity}
            onChange={(event) => this.updateQuantity(event.target.value)}
          />
          <button
            onClick={() => this.addToCart(cartId, product.id, this.state.quantity)}
          >
            Add to cart
          </button>
        </div>
      );
    }

    return null;
  }

  render() {
    if (this.state.fetchingProducts) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.state.productList.map((product) => (
          <ProductItem
            name={product.name}
            selectItem={() => this.updateSelectedItem(product)}
          />
        ))}
        <Modal
          show={this.state.selectedItem !== null}
          onHide={() => this.updateSelectedItem(null)}
        >
          <Modal.Header closeButton>
            <Modal.Title >Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.modalContent(this.state.selectedItem)}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.updateSelectedItem(null)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Products.propTypes = {
  cartId: PropTypes.number.isRequired,
  updateCart: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
};
