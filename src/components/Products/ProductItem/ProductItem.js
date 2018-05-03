import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProductItem.css';

export default class ProductItem extends Component {
  render() {
    const {
      name, selectItem
    } = this.props;

    return (
      <div
        className="product-item"
        onClick={selectItem}
      >
        <p>Name: {name}</p>
      </div>);
  }
}

ProductItem.propTypes = {
  name: PropTypes.string.isRequired,
  selectItem: PropTypes.func.isRequired
};
