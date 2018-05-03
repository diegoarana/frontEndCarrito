import React, {Component} from 'react'
import { getProducts, addTocart } from '../../services/products'
import ProductItem from './ProductItem'
import { Modal, Button } from 'react-bootstrap'


export default class Products extends Component {

    constructor(props){
        super(props)
        this.state = {
            productList : [],
            fetchingProducts: false,
            selectedItem: null,
            quantity : null
        }

    }

    updateProductList = (productList) =>{
        this.setState({
            productList
        })
    }

    getProducts = () =>{
        getProducts()
            .then((productList)=>{
                this.updateFetchinProducts(false)
                this.updateProductList(productList)
            })
    }

    addTocart = (cartId, productId, quantity) =>{
        addTocart(cartId, productId, quantity)
            .then((updatedCart)=>{
                this.updateSelectedItem(null)
            })
    }

    updateQuantity = (quantity) =>{
        this.setState({
            quantity
        })
    }

    updateFetchinProducts = (value) =>{
        this.setState({
            fetchingProducts : value
        })
    }

    componentWillMount(){

        this.updateFetchinProducts(true)
        this.getProducts()
    }

    updateSelectedItem(value) {
        this.setState({
            selectedItem: value
        })
    }

    modalContent(product) {
        const { cartId } = this.props;

        if (product) {
            return (
                <div>
                   <p> Product name : {product.name} </p>
                   <p> Product price : {product.price}</p>
                   <input type="number" value = {this.state.quantity} onChange={(event)=>this.updateQuantity(event.target.value)}/>
                    <button
                        onClick={() => this.addToCart(cartId, product.id, this.state.quantity)}
                    >
                        Add to cart
                    </button>
                </div>
            )
        }
        return null
    }

    render(){
        if (this.state.fetchingProducts) {
            return <div>Loading...</div>
        }

        return (
            <div>
                {this.state.productList.map((product) =>
                    <ProductItem
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        selectItem={() => this.updateSelectedItem(product)}
                    />
                )}
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
        )
    }
}  