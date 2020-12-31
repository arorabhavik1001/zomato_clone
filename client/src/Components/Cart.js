import React from 'react';
import axios from 'axios';
import '../Styles/cart.css';

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            address: ' ',
            restaurantName: ' ',
            cart: [],
            subtotal: 0,
            email: ' ',
            contactNo: 0,
        }
    }

    componentDidMount() {
        const email =  sessionStorage.email;
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/getOrders/${email}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                cart: result.data.orders[0].cart,
                // address: result.data.orders[0].address,
                restaurantName: result.data.orders[0].restaurantName,
                subtotal: result.data.orders[0].subtotal,
                orders: result.data.orders,
                email: result.data.orders[0].email,
                // contactNo: result.data.orders[0].contactNo
            })
        }).catch(err => { 
            console.log(err)
            // alert(`pls log in to your account first`)
            // alert(err.message)
        })
    }

    getPaymentData = (data) => {
        return fetch(`http://localhost:5000/api/forPayment`, {
            method: 'POST',
            headers: { Accept: 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json()
        }
        ).catch(error => {
            console.log(error)
        })
    }

    obj = (paramValue) => {
        return typeof paramValue === 'object'
    }
    Date = (paramValue) => {
        return Object.prototype.toString.call(paramValue) === '[object Date]'
    }
    
    stringifyThisParam = (params) => {
        if(this.obj(params)&& !this.Date(params)){
            return JSON.stringify(params)
        }else{
            return params
        }
    }

    formBuilder = (details) => {
        const {action, params} = details
        const form = document.createElement('form');
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyThisParam(params[key]));
            form.appendChild(input);
        })

        return form;
    }

    takeToPaymentGateway = (details) => {
        const form  = this.formBuilder(details);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    }
    order = (event) => {
        this.getPaymentData({
            amount: this.state.subtotal,
            email: this.state.email,
            mobileNo: this.state.contactNo,
        }).then(result =>{
            var info = {
                action: 'https://securegw-stage.paytm.in/order/process',
                params: result.response
            }
            this.takeToPaymentGateway(info)
        }).catch(error =>{
            console.log(error)
        })
    }
    
    render() {
        const {cart, subtotal} = this.state;
        return (
            <div className="mainCart">
                <h1 className="headingCart">Your Cart</h1>
                {
                    cart.map((article, index) => {
                        return (
                            <div>
                                <h3 className="dish">Dish: {article.name}</h3>
                                <p className="quantity">Quantity: {article.quantity}</p>
                                <p className="from">From: {this.state.restaurantName}</p>
                                <hr />
                            </div>
                        )
                    })
                }
                <hr />
                <h1 className="subtotal">Subtotal: ₹{subtotal}</h1>
                <button className="button" onClick={this.order} style={{width: "90px", background: '#5cf7ac'}}>Checkout</button>
            </div>
        )
    }
}


export default Cart;