import React from 'react';
import axios from 'axios';
import homepageimg from '../assets/homepageimg.png';
import '../Styles/style.css';
import {withRouter} from 'react-router-dom'

class Wallpaper extends React.Component {
    // eslint-disable-next-line
    constructor(){
        super();
        this.state = {
            suggestions: [],
            text: '',
            restaurant: ''
        }
    }
    
    textChangeHandler = (event) => {
        const userInput = event.target.value;
        this.setState({
            text: userInput
        })
        const { restaurant } = this.state;
        // let suggestions = [];
        if(userInput.length > 0) {
            var suggestions = restaurant.filter(
                item => item.name.toLowerCase().includes(userInput.toLowerCase())
            )
        }else{
            var suggestions= '';
        }
        this.setState({
            suggestions: suggestions
        })
    }

    handleChange = (event) => {
        const cityId = event.target.selectedOptions[0].value;
        sessionStorage.setItem("city", cityId);
        axios({
            method: 'GET',
            url: `http://localhost:5000/api/filterByCity/${cityId}`,
            headers: { 'Content-Type': 'application/json'}
        }).then(result=>{
            this.setState({
                restaurant: result.data.restaurants
            })
        }).catch(error => {
            console.log(`there was an error bhai`)
            console.log(error)
        })
    }

    restaurantDetails = (article) => {
        this.props.history.push(`restaurant?id=${article._id}`)
    }

    suggestionDropDown = () => {
        const { suggestions } = this.state;
        if(suggestions.length===0){
            return null;
        }
        return (
            <ul className="suggestionStyle">
                {
                    suggestions.map((article, index) => {
                        return (
                            <li key={index} onClick={() => this.restaurantDetails(article)} value={article}>{  `${article.name}, ${article.locality}`  }</li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
    const { cities } = this.props;
    const { text } = this.state;
    console.log(cities);
    return(
        <React.Fragment>
            <img src={homepageimg} alt="no pic" width="100%" height="550px" />
                <div className="logo1">
                    B!
                </div>
                <div className="heading1">
                    Find the best restaurants, cafés, and bars
                </div>
                <div className="locationSearch">
                    <select style={{cursor: 'pointer'}} className="locationdropdown" onChange={this.handleChange}>
                        <option value="" selected disabled style={{ color: "rgba(255, 0, 0, 0.459)" }}>Please Select a City</option>
                        {
                            cities.map((cities, index) => {
                            return <option value={cities.city_id} key={index} style={{color: "blue"}}>{cities.name}</option>
                            })
                        }
                    </select>
                    <input className="restaurantinput" type="text" placeholder="Please search restaurant" value={text} onChange={this.textChangeHandler}/>
                    {
                        this.suggestionDropDown()
                    }
                </div>
                <div className="bhavik" style={{"margin-bottom": "30px"}}>
                    Bhavik's Zomato Clone
                </div>
        </React.Fragment>
    )
}
}


export default withRouter(Wallpaper);