import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MoreExpensiveItem.css';

export default class ProductItem extends Component {
  render() {
    const {
      name, price
    } = this.props;

    return (
      <div>
        <p>Name: {name}</p>
        <p>Price: {price}</p>
      </div>);
  }
}

ProductItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};