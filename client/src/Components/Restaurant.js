import React from 'react';
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import '../Styles/App.css';
import axios from 'axios';
import queryString from 'query-string';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

const stylesByBhavik = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightpink',
        border: '2px solid gray',
        textAlign: 'center',
        borderRadius: "3%",
        boxShadow: '2px 2px 8px gray',
        width: '200px;',
        paddingLeft: '40px',
        paddingRight: '40px',
        overflow: 'auto'
    }
}

class Restaurant extends React.Component {
    constructor(){
        super();
        this.state = {
            restaurantDetails: {},
            menu: [],
            isModalOpen: false,
            cart: [],
            subtotal: 0,
            quantity: 0,
        }
    }

    componentDidMount() {
        const paramsFromQuery = queryString.parse(this.props.location.search);
        const restId = paramsFromQuery.id;

        axios({
            method: 'GET',
            url: `http://localhost:5000/api/restaurantDetailsById/${restId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                restaurantDetails: result.data.restaurants
            })
            // console.log(restaurantDetails)
        }).catch(error => {
            console.log(error);
            console.log(`error mila hamein`)
        })
        
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/menuForRestaurant/${restId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                menu: result.data.menu
            })
        }).catch(error => {
            console.log(error);
            console.log(`error mila in fetching the menu`)
        })
    }

    handleOrderPlace = (event) => {
        // var userLogin =  sessionStorage.isUserLoggedIn;
        // if(sessionStorage.isUserLoggedIn!=false){
        //     this.setState({
        //         isModalOpen: true,
        //     })
        //     console.log("if block")
        // }else if(userLogin!=true){
        //     alert(`Pls Login to your account first`)
        //     console.log("else block")
        // }
        this.setState({
            isModalOpen: true,
        })
    }

    cancelOrder = (event) => {
        this.setState({
            isModalOpen: false,
            subtotal: 0,
            cart: []
        })
    }

    saveOrder = (event) => {
        const {cart, subtotal, restaurantDetails} = this.state
        const restaurantName = restaurantDetails.name;
        const email =  sessionStorage.email;
        const contactNo =  sessionStorage.contactNo;
        const address =  sessionStorage.address;
        if(this.state.cart==[]){
          alert(`pls add something in your cart first`)  
        }
        if(email!=null){
            const reqObj = {
                email: email,
                contactNo: contactNo,
                address: address,
                cart: cart,
                subtotal: subtotal,
                restaurantName: restaurantName
            }
            axios({
                method: 'POST',
                url: 'http://localhost:5000/api/saveOrders',
                headers: { 'Content-Type': 'application/json' },
                data: reqObj
            }).then(result => {
                console.log(result.data.message);
            }).catch(err => { 
                console.log(err)
                alert(`pls log in to your account first`)
                // alert(err.message)
            })
        }

        this.goTocart()

    }
    
    goTocart = (event) => {
        this.props.history.push(`cart`)
    }

    render() {
        const {restaurantDetails, isModalOpen, menu, subtotal, cart, quantity} = this.state
        return (
            <div>
                <img src={restaurantDetails.thumb} alt="no" width="900px" height="420px" className="img1" />
                <a href={restaurantDetails.thumb} target="_blank" className="galleryButton">Click to see Image Gallery</a>
                <h1 className="text">{restaurantDetails.name}</h1>
                <button className="orderButton" onClick={this.handleOrderPlace}>Place Online Order</button>
                <Tabs>
                    <TabList className="tab1">
                        <Tab>Overview</Tab>
                        <Tab>Contact</Tab>
                        <Tab>Location</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="text">
                            <h1>About This Place</h1>
                            <h3>Cuisine</h3>
                            <div>
                                {
                                    restaurantDetails.Cuisine && restaurantDetails.Cuisine.length > 0 
                                    ? 
                                    restaurantDetails.Cuisine.map(article => {
                                        return <span>{article.name}, </span>
                                    })
                                    :
                                    null
                                }
                            </div>
                            <h3>Average Cost</h3>
                            <p>₹{restaurantDetails.cost} for two people (approx.)</p>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h1 className="text">Contact Us-</h1>
                        <h3 className="text">Address:</h3>
                        <p className="text address">{restaurantDetails.address}</p>
                        <h3 className="text">Contact No:</h3>
                        <p className="text contact">123456789</p>
                    </TabPanel>
                    
                    <TabPanel>
                    <h1 className="text">Location</h1>
                    <iframe title="map" width="1200" style={{"margin-left": "100px", "margin-bottom": "100px", "box-shadow": "2px 2px 10px black"}} height="500" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14029.833037738712!2d77.00810866977534!3d28.465742800000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d175b3f26cf91%3A0x2190cfb24f361688!2sMumbai%20Bistro%20(Mumbai%20special%20vada%20pav)!5e0!3m2!1sen!2sin!4v1608085579420!5m2!1sen!2sin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </TabPanel>
                </Tabs>
                <Modal isOpen={isModalOpen} style={stylesByBhavik}>
                        <React.Fragment>
                        <button onClick={this.cancelOrder} style={{'font-size': '30px', border: 'none', background: 'none', cursor: 'pointer', float: "right" }}>x</button>
                            <h3 style={{ "font-size": "26px", 'text-allign':'center', color: 'darkblue'}}>{restaurantDetails.name}'s Menu</h3>
                            {
                                menu.map((article, index) => {
                                    return (
                                        <div className="row" key={index} addCost={article.cost} itemName={article.dish}>
                                            <div className="col-6 cart" style={{float: "left", "font-weight": "bold"}}>{article.dish}</div><br />
                                            <div className="col-2 cart" style={{'margin-top': '5px', float: "left"}}>₹ {article.cost}</div><br /><br />
                                            <div className="col-2 cart" style={{float: "left"}}>{article.description}</div>
                                            <button className="col-4 cart" style={{border: 'none', background: 'white', width: '80px', float: "right", height: '30px', 'border-radius':'5px', 'margin-top':'-15px'}} onClick={(event, itemName) => {
                                                this.state.cart.push({name: article.dish, quantity:0});
                                                if(cart[index]!=null){
                                                    cart[index].quantity +=1;
                                                    this.setState({ cart,
                                                    subtotal: subtotal + article.cost })
                                                }
                                            }}>Add to Cart</button><br /><br />
                                            <p>{cart[index]==null?0:cart[index].quantity}</p>
                                            <button className="col-4 cart" style={{border: 'none', background: 'white', float: "right", 'border-radius':'5px', 'margin-top':'-15px'}} onClick={(event) => {
                                            if(cart[index]!=null){
                                                cart[index].quantity +=1;
                                                this.setState({ cart,
                                                subtotal: subtotal + article.cost })
                                            }
                                            }}>+</button>
                                            <button className="col-4 cart" style={{border: 'none', background: 'white', float: "right", 'border-radius':'5px', 'margin-top':'-15px'}} onClick={(event) => {
                                                if(cart[index]!=null){
                                                    cart[index].quantity -=1;
                                                    this.setState({ cart,
                                                    subtotal: subtotal - article.cost })
                                                }   
                                            }}>-</button>
                                            <br />
                                            <hr style={{'margin-bottom':'15px', 'margin-top':'15px'}}/>
                                        </div>
                                    )
                                })
                            }
                        </React.Fragment>
                        <div>
                            <p style={{float: "left", "font-weight": "bold", 'font-size': "20px", "margin-top": "35px",}}>Subtotal: ₹{this.state.subtotal}</p><br />
                            <button className="buttons" onClick={this.saveOrder} style={{float: "right", width: "130px", background: '#5cf7ac'}}>Check out</button>
                        </div>
                    </Modal>
            </div>
        );
    }
}

export default withRouter(Restaurant);