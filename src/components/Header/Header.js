import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { fetchCart, removeProduct } from '../../services/cart'

export default class Header extends Component{
    constructor(props) {
        super(props)
        this.state = {
            fetchingCart: false,
            fullCart: null,
            loadingCart: false
        }
    }

    updateFetchingCart(value) {
        this.setState({
            fetchingCart: value
        })
    }

    updateFullCart(value) {
        this.setState({
            fullCart: value
        })
    }

    getCart() {
        const { cart } = this.props;
        this.updateFetchingCart(true)
        fetchCart(cart.id)
            .then((fullCart) => {
                this.updateFetchingCart(false)
                this.updateFullCart(fullCart)
            })
    }

    updateLoadingCart(value) {
        this.setState({
            loadingCart: value
        })
    }

    removeProductFromCart(productId, cartId) {
        this.updateLoadingCart(true)
        removeProduct(productId, cartId)
            .then((newFullCart) => {
                this.updateFullCart(newFullCart)
                this.updateLoadingCart(false)
            })
    }

    modalContent(fullCart) {
        if (!fullCart) {
            return null
        }
        if (this.state.loadingCart) {
            return <div>Loading...</div>
        }
        return (
            <div>
                {fullCart.products.map((product) => {
                    <div>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>            
                        <button
                            onClick={() => this.removeProductFromCart(product.id, fullCart.id)}
                        >
                            remove</button>
                    </div>
                })}
                <p>Total: {fullCart.totalPrice}</p>
            </div>
        )
    }
    
    renderCart() {
        const { cart } = this.props;
        if (!cart) {
            return null
        }

        return (
            <button
                onClick={()=>this.getCart()}    
            >
                {this.state.fetchingCart ? '...' : 'Cart'}
            </button>
        )
    }
    render() {
        return (
            <div>
                {this.renderCart()}
                <Modal
                    show={this.state.fullCart !== null}
                    onHide={() => this.updateFullCart(null)}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title >Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.modalContent(this.state.fullCart)}
                        </Modal.Body>
                        <Modal.Footer>
                        <Button
                            onClick={() => this.updateFullCart(null)}
                        >
                            Close
                        </Button>
                        </Modal.Footer>
                </Modal>
            </div>
        )
    }
}