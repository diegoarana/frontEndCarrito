import React, {Component} from 'react'
import { getProducts } from '../../services/products'
import ProductItem from './ProductItem'
import { Modal, Button } from 'react-bootstrap'


export default class Products extends Component {

    constructor(props){
        super(props)
        this.state = {
            productList : [],
            fetchingProducts: false,
            selectedItem: null
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
                    Product name: {product.name}
                    Product description: {product.description}
                    Product price: {product.price}
                    <button
                        onClick={() => console.log('addToCart(product.id, cartId)')}
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
                        description={product.description}
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