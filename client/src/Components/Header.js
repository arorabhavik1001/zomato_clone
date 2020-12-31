import React from 'react';
import "../Styles/style_header.css";
import Modal from 'react-modal';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

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
    }
}

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            isLogInModalOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            contactNo: '',
            address: '',
            isUserLoggedIn: false,
            isgoogleLogInModalOpen: false,
        }
    }

    handleChange = (event, valueHandler) => {
        this.setState({
            [valueHandler]: event.target.value
        })
    }

    registerUser = (event) => {
        const { email, password, firstName, lastName, contactNo, address } = this.state;
        const registerRequest = {
            /*the key value pairs can be written once only because the spellings and case is same, 
            but still to keep the code understandable, it is written this way.*/
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            contactNo: contactNo,
            address: address
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/userSignUp',
            headers: { 'Content-Type': 'application/json' },
            data: registerRequest
        }).then(result => {
            if (result.data.message === 'User signed up successfully!!!') {
                this.setState({
                    isModalOpen: false,
                    email: '',
                    password: '',
                    firstName: result.data.user.firstName,
                    lastName: '',
                    contactNo: '',
                    address: '',
                    isUserLoggedIn: true,
                })
                alert(result.data.message)
                sessionStorage.setItem('isUserLoggedIn', true)
                sessionStorage.setItem('email', result.data.user.email)
                sessionStorage.setItem('contactNo', result.data.user.contactNo)
                sessionStorage.setItem('address', result.data.user.address)
            }
        }).catch(err => { 
            console.log(err)
            alert(`User Sign Up failed of catch block`)
        })
    }

    cancelSignUp = (event) => {
        this.setState({
            isModalOpen: false
        })
    }

    openSignUp = (event) => {
        this.setState({
            isModalOpen: true
        })
    }

    openLogIn = (event) => {
        this.setState({
            isLogInModalOpen: true
        })
    }

    cancelLogIn = (event) => {
        this.setState({
            isLogInModalOpen: false
        })
    }

    logOut = (event) => {
        this.setState({
            firstName: '',
            isUserLoggedIn: false
        })
        sessionStorage.setItem('isUserLoggedIn', false)
        sessionStorage.setItem('email', null)
        sessionStorage.setItem('contactNo', null)
        sessionStorage.setItem('address', null)
    }

    logInUser = (event) => {
        const { email, password} = this.state;
        const logInRequest = {
            email: email,
            password: password
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/userLogin',
            headers: { 'Content-Type': 'application/json' },
            data: logInRequest
        }).then(result => {
            if (result.data.message === 'User Logged In successfully!') {
                this.setState({
                    isLogInModalOpen: false,
                    email: '',
                    password: '',
                    isUserLoggedIn: result.data.isAuthenticated,
                    firstName: result.data.user[0].firstName
                })
                sessionStorage.setItem('isUserLoggedIn', result.data.isAuthenticated)
                sessionStorage.setItem('email', result.data.user[0].email)
                sessionStorage.setItem('contactNo', result.data.user[0].contactNo)
                sessionStorage.setItem('address', result.data.user[0].address)
            }else{
                this.setState({
                    email: '',
                    password: '',
                })
                alert(result.data.message)
            }
        }).catch(err => { 
            console.log(err)
            alert(`User Sign Up failed`)
        })
    }

    signUp2 = (event) => {
        this.setState({
            isLogInModalOpen: false,
            isModalOpen: true
        })
    }

    forgot = (event) => {
        var mobileno = window.prompt(`Please enter your Contact No.`);
        var phoneno = mobileno
        var query = {
            contactNo: phoneno
        }
        axios({
            method: 'POST',
            url: "http://localhost:5000/api/forgotpassword",
            headers: { 'Content-Type': 'application/json' },
            data: query
        }).then(result => {
            alert(`Your credentials are-- 
            Username: ${result.data.details[0].email}
            Password: ${result.data.details[0].password} `)
        }).catch(error => {
            console.log(error)
        })
    }

    cart = (event) => {
        this.props.history.push(`cart`)
    }

    // greeting = () => {
    //     var date = new Date();
    //     var greeting;
    //     if(date.getHours>=5&&date.getHours<=12){
    //         greeting= "Good Morning"
    //     } else if(date.getHours>=12&&date.getHours<=17){
    //         greeting= "Good Afteroon"
    //     } else if(date.getHours>=17&&date.getHours<=22){
    //         greeting= "Good Evening"
    //     }else{
    //         greeting= "Hi"
    //     }
    //     document.getElementById('greeting').innerHTML=greeting;
    // }

    responseGoogleSuccess = (result) => {
        console.log(result)
        this.setState({
            email: result.wt.cu,
            firstName: result.wt.fV,
            lastName: result.wt.iT,
        })
        this.googleLogin();
    }
    responseGoogleError = (error) => {
        console.log(error)
    }

    googleLogin = () => {
        this.setState({ 
            isgoogleLogInModalOpen: true
        })
    }
    googleLoginClose = (event) => {
        this.setState({ 
            isgoogleLogInModalOpen: false
        })
    }

    googlelogInUser = (event) => {
        const { contactNo, address, email, firstName, lastName} = this.state;
        const googlelogInRequest = {
            email,
            firstName,
            lastName,
            contactNo: contactNo,
            address: address
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/googleUserSignUp',
            headers: { 'Content-Type': 'application/json' },
            data: googlelogInRequest
        }).then(result => {
            if (result.data.message === 'User signed up successfully!!!') {
                this.setState({
                    firstName: result.data.user.firstName,
                    isUserLoggedIn: true,
                })
                alert(result.data.message)
                sessionStorage.setItem('isUserLoggedIn', true)
                sessionStorage.setItem('email', result.data.user.email)
                sessionStorage.setItem('contactNo', result.data.user.contactNo)
                sessionStorage.setItem('address', result.data.user.address)
                this.setState({
                    isgoogleLogInModalOpen: false,
                    contactNo: 0,
                    address: ''
                })
            }
        }).catch(err => { 
            console.log(err)
            alert(`User Sign Up failed of catch block`)
        })
    }

    render() {
        const { isModalOpen, isgoogleLogInModalOpen, isLogInModalOpen, isUserLoggedIn, email, password, firstName, lastName, contactNo, address } = this.state;
        return (
            <React.Fragment>
                <nav className="navbar">
                    <a href="http://localhost:3000/">
                        <div className="logo">
                            B!
                        </div>
                    </a>
                    {
                        isUserLoggedIn ?
                        <div>
                            <button className="cartButton" onClick={this.cart}>Cart</button>
                            <span className="hiName">Hi, {firstName}</span>
                            <button className="account" onClick={this.logOut}>Log out</button>
                        </div> :
                        <div>
                            <div className="b1">
                                <button className="login" onClick={this.openLogIn}>Login</button>
                            </div>
                            <div className="b2">
                                <button className="account" type="button" onClick={this.openSignUp}>Create an account</button>
                            </div>
                            <div style={{float: 'right', position:'absolute', right: '320px', top:'15px', height: '30px'}}>
                                <GoogleLogin
                                    clientId="419012111064-3d4klumvhh522b0tpg9dgva6tr91suho.apps.googleusercontent.com"
                                    buttonText="Sign Up with Google"
                                    onSuccess={this.responseGoogleSuccess}
                                    onFailure={this.responseGoogleError}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </div>
                    }
                    <Modal isOpen={isModalOpen} style={stylesByBhavik}>
                        <React.Fragment>
                            <h3 style={{ "font-size": "26px",display: "block"}}>Create a new account</h3>
                            <div style={{ display: "inline" }}>
                                <span>Email: </span>
                                <input type="email" id={email} style={{ margin: "10px", border: "none", width: "200px", height: "30px", "box-shadow": "2px 2px 8px grey"}} onChange={(event) => this.handleChange(event, 'email')} />
                            </div>
                            <div>
                                <span>Password: </span>
                                <input type="password" id={password} style={{ margin: "10px", border: "none", width: "170px", height: "30px", "box-shadow": "2px 2px 8px grey" }} onChange={(event) => this.handleChange(event, 'password')} />
                            </div>
                            <div>
                                <span>First Name: </span>
                                <input type="text" id={firstName} style={{ margin: "10px", border: "none", width: "170px", height: "30px", "box-shadow": "2px 2px 8px grey" }} onChange={(event) => this.handleChange(event, 'firstName')} />
                            </div>
                            <div>
                                <span>Last Name: </span>
                                <input type="text" id={lastName} style={{ margin: "10px", border: "none", width: "170px", height: "30px", "box-shadow": "2px 2px 8px grey" }} onChange={(event) => this.handleChange(event, 'lastName')} />
                            </div>
                            <div>
                                <span>Contact Number: </span>
                                <input type="tel" id={contactNo} style={{ margin: "10px", border: "none", width: "170px", height: "30px", "box-shadow": "2px 2px 8px grey" }} onChange={(event) => this.handleChange(event, 'contactNo')} />
                            </div>
                            <div>
                                <span>Address: </span>
                                <input type="text" id={address} style={{ margin: "10px", border: "none", width: "170px", height: "30px", "box-shadow": "2px 2px 8px grey" }} onChange={(event) => this.handleChange(event, 'address')} />
                            </div>
                            <button className="signUpButton" onClick={this.registerUser} style={{ margin: "10px", border: "none", background: "#8cf28a", height: "40px", width: "80px", "border-radius": "5px", "font-size": "15px", float: "left" }}>Sign Up</button>
                            <button className="cancelButton" onClick={this.cancelSignUp} style={{ margin: "10px", border: "none", background: "#f5766c", height: "40px", width: "80px", "border-radius": "5px", "font-size": "15px", float: "right" }}>Cancel</button>
                        </React.Fragment>
                    </Modal>
                    <Modal isOpen={isLogInModalOpen} style={stylesByBhavik}>
                        <React.Fragment>
                        <h3 style={{ "font-size": "26px", display: 'block' }}>Log in to your account</h3>
                            <div style={{ display: "inline" }}>
                                <span>Email: </span>
                                <input type="email" id={email} style={{ margin: "10px", border: "none", width: "200px", height: "30px", "box-shadow": "2px 2px 8px grey"}} onChange={(event) => this.handleChange(event, 'email')} />
                            </div>
                            <div>
                                <span>Password: </span>
                                <input type="password" id={password} style={{ margin: "10px", border: "none", width: "170px", height: "30px", "box-shadow": "2px 2px 8px grey" }} onChange={(event) => this.handleChange(event, 'password')} />
                            </div>
                            <button onClick={this.forgot} style={{"margin-top": "10px", background: 'none', border: "none", "font-size": "15px", color: 'red', cursor: "pointer"}}>Forgot Password?</button>
                            <br />
                            <button className="signUpButton" onClick={this.logInUser} style={{ margin: "10px", border: "none", background: "#8cf28a", height: "40px", width: "80px", "border-radius": "5px", "font-size": "15px", float: "left" }}>Log In</button>
                            <button className="cancelButton" onClick={this.cancelLogIn} style={{ margin: "10px", border: "none", background: "#f5766c", height: "40px", width: "80px", "border-radius": "5px", "font-size": "15px", float: "right" }}>Cancel</button>
                            <br /><br /><br />
                            <hr style={{"margin-bottom": "10px",}}/>
                            <p style={{ display: 'inline'}}>Don't have an account?</p>
                            <button onClick={this.signUp2} style={{background: 'none', border: "none", "font-size": "15px", color: 'red', cursor: "pointer"}}>Sign Up</button>
                        </React.Fragment>
                    </Modal>
                    <Modal isOpen={isgoogleLogInModalOpen} style={stylesByBhavik}>
                        <React.Fragment>
                        <h3 style={{ "font-size": "26px", display: 'block' }}>Pls provide some more detials</h3>
                            <div style={{ display: "inline" }}>
                                <span>Contact No: </span>
                                <input type="text" id={email} style={{ margin: "10px", border: "none", width: "200px", height: "30px", "box-shadow": "2px 2px 8px grey"}} onChange={(event) => this.handleChange(event, 'contactNo')} />
                            </div>
                            <div>
                                <span>Address: </span>
                                <input type="text" id={password} style={{ margin: "10px", border: "none", width: "170px", height: "30px", "box-shadow": "2px 2px 8px grey" }} onChange={(event) => this.handleChange(event, 'address')} />
                            </div>
                            <br />
                            <button className="signUpButton" onClick={this.googlelogInUser} style={{ margin: "10px", border: "none", background: "#8cf28a", height: "40px", width: "80px", "border-radius": "5px", "font-size": "15px", float: "left" }}>Sign In</button>
                            <button className="cancelButton" onClick={this.googleLoginClose} style={{ margin: "10px", border: "none", background: "#f5766c", height: "40px", width: "80px", "border-radius": "5px", "font-size": "15px", float: "right" }}>Cancel</button>
                        </React.Fragment>
                    </Modal>
                </nav>
            </React.Fragment>
        )
    }
}

export default withRouter(Header);