import React from 'react';
// import axios from 'axios';

class Transactions extends React.Component {
    constructor() {
        super();
        // this.state = {
        //     paymentStatus: '',
        // }
    }

    componentDidMount() {
        // axios({
        //     method: 'POST',
        //     url: 'http://localhost:5000/pageAfterPayment',
        //     headers: { 'Content-Type': 'application/json' }
        // }).then(response =>{
        //     console.log(response)
        // }).catch(err =>{
        //     console.log(err)
        // })
    }

    render() {
        const {paymentStatus} = this.state;
        return (
            <div>
                <h2>Thank you for Shopping with us</h2>
                <h1>Your Transaction Status is: Successful</h1>
                {/* <h2>{paymentStatus}</h2> */}
            </div>
        )
    }
}

export default Transactions