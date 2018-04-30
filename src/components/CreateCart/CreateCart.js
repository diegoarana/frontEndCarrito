import React, {Component} from 'react'

import { createCart } from '../../services/cart'

export default class CreateCart extends Component{
    constructor(props) {
        super(props)
        this.state = {
            creatingCart: false,
            errorCreatingCart: null,
            userDni: ''
        }
    }

    updateUserdni = (userDni) =>{
        this.setState({
            userDni
        })
    }

    updateCreatingCart = (newValue) => {
        this.setState({
            creatingCart: newValue
        })
    }

    createCart = () => {
        const { updateCart } = this.props;

        this.updateCreatingCart(true)
        createCart(this.state.userDni)
            .then((newCart) => {
                updateCart(newCart)
            })
            .catch((statusError) => {
                this.updateCreatingCart(false)
                if (statusError === 400) {
                    this.setState({errorCreatingCart: 'Invalid DNI'})
                }
            })
    }

    render(){
        console.log('state', this.state.creatingCart)
        if (this.state.creatingCart) {
            console.log('creating cart')
            return <div>Loading...</div>
        }

        const error = this.state.errorCreatingCart ?
            <p>Error creating cart: {this.state.errorCreatingCart}</p> :
            null

        return (
            <div>
                <button onClick={this.createCart} >
                    Create Cart
                </button>
                <input type="text" onChange={(event)=>this.updateUserdni(event.target.value)} value={this.state.userDni}/>
                {error}
            </div>
        )
    }
}