import React from 'react';
import queryString from 'query-string';
import "../Styles/style copy.css";
import shutterstock_1154073754 from "../assets/shutterstock_1154073754.png"
import axios from 'axios';

class filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurantList: [],
            lcost: undefined,
            hcost: undefined,
            location: undefined,
            cuisine: undefined,
            sort: 1,
            mealtype: undefined,
            locationList: [],
            pageCount: [],
            page: 1,
            cities: []
        }
    }

    scrollToTop = () => {
        window.scrollTo(0,0);
    }

    resetRestaurants = () => {
        this.setState({
            restaurantList: []
        })
    }

    componentDidMount() {
        //what does .location.search mean?
        const querystring = queryString.parse(this.props.location.search);
        const { mealtype } = querystring
        const req = {
            "mealtype_id": mealtype
        }

        

        this.scrollToTop();
        axios({
            method: 'POST',
            url: "http://localhost:5000/api/filter",
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurant,
                mealtype: mealtype
            })
        }).catch(error => {
            console.log(`bhai yahan pe error aa raha hai`)
            console.log(error)
        });

        axios({url: 'http://localhost:5000/api/cityList'}).then(result => {
            this.setState({
                cities: result.data.cities
            })
        }).catch(error => {
            console.log(error);
        })
    }

    cuisineChangeHandler = (valueId) => {
        const { cuisine = [], mealtype } = this.state;
        console.log(cuisine.indexOf(valueId.toString()))
        if (cuisine.indexOf(valueId.toString()) === -1) {
            cuisine.push(valueId.toString())
        } else if(cuisine.indexOf(valueId.toString()) > 0){
            var indexOfValueid = cuisine.indexOf(valueId.toString());
            cuisine.splice(indexOfValueid, 1)
        }
        let filter = {
            cuisine_id: cuisine,
            mealtype_id: mealtype
        };

        axios({
            method: 'POST',
            url: "http://localhost:5000/api/filter",
            headers: { 'Content-Type': 'application/json' },
            data: filter
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurant
            })
        }).catch(error => {
            console.log(`there was an error`);
            console.log(error);
        })
    }

    handleCostClick = (lowcost, highcost) => {
        const {lcost, hcost, mealtype} = this.state;
        let filterCost = {
            lcost: lowcost,
            hcost: highcost,
            mealtype_id: mealtype
        };
        axios({
            method: 'POST',
            url: "http://localhost:5000/api/filterByCost",
            headers: { 'Content-Type': 'application/json' },
            data: filterCost
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurant
            })
        }).catch(error => {
            console.log(`there was an error`);
            console.log(error);
        })
    }

    sortAscending = () => {
        const { restaurantList } = this.state;
        const sortedRestaurants = restaurantList.sort((a, b) => (a.cost > b.cost) ? 1 : -1)
        this.setState({
            restaurantList: sortedRestaurants
        })
    }

    sortDescending = () => {
        const { restaurantList } = this.state;
        const sortedRestaurants = restaurantList.sort((a, b) => (a.cost > b.cost) ? -1 : 1)
        this.setState({
            restaurantList: sortedRestaurants
        })
    }

    handleChange = (event) => {
        const querystring = queryString.parse(this.props.location.search);
        const { mealtype } = querystring
        const req = {
            "mealtype_id": mealtype
        }
        const cityId = event.target.selectedOptions[0].value;
        sessionStorage.setItem("city", cityId);
        axios({
            method: 'POST',
            url: `http://localhost:5000/api/filterByCityPost/${cityId}`,
            headers: { 'Content-Type': 'application/json'},
            data: req
        }).then(result=>{
            this.setState({
                restaurantList: result.data.restaurants
            })
        }).catch(error => {
            console.log(`there was an error bhai`)
            console.log(error)
        })
    }

    handleClick = (article) => {
        this.props.history.push(`restaurant?id=${article._id}`)
    }

    render() {
        const {restaurantList, locationList, pageCount, sort} = this.state
        const { cities } = this.state;
        // console.log(restaurantList)
        return (
            <div>
                <div>
                    <h1 className="heading">Restaurants Near You...</h1>
                    <div className="main">
                        <section className="sec1">
                            <h2 style={{ color: "darkblue" }}>Filters</h2>
                            <p id="location" style={{ color: "darkblue" }}>Select Location:</p>
                            <select className="dropdown" onChange={this.handleChange}>
                                <option value="" selected disabled style={{ color: "rgba(255, 0, 0, 0.459)" }}>Please Select a City</option>
                                {
                                    cities.map((cities, index) => {
                                    return <option value={cities.city_id} key={index} style={{color: "blue"}}>{cities.name}</option>
                                    })
                                }
                            </select>
                            <br />
                            <span>
                                <h3 style={{ color: "darkblue" }}>Cuisine</h3>
                                <input type="checkbox" style={{ "margin-bottom": "10px", color: "#8c96ab" }} onChange={() => this.cuisineChangeHandler(1)}/>  North Indian<br />
                                <input type="checkbox" style={{ "margin-bottom": "10px" }} onChange={() => this.cuisineChangeHandler(2)}/>  South Indian<br />
                                <input type="checkbox" style={{ "margin-bottom": "10px" }} onChange={() => this.cuisineChangeHandler(3)}/>  Chinese<br />
                                <input type="checkbox" style={{ "margin-bottom": "10px" }} onChange={() => this.cuisineChangeHandler(4)}/>  Fast Food<br />
                                <input type="checkbox" style={{ "margin-bottom": "10px" }} onChange={() => this.cuisineChangeHandler(5)}/>  Street Food
                            </span>
                            <span>
                                <h3 style={{ color: "darkblue" }}>Cost for two</h3>
                                <input id="1" type="radio" name="cost" onClick={() => this.handleCostClick(-1, 500)} style={{ "margin-bottom": "10px" }} />
                                <label htmlFor="1">Less than ₹ 500</label>
                                <br />
                                <input id="2" type="radio" name="cost" onClick={() => this.handleCostClick(500, 1000)} style={{ "margin-bottom": "10px" }} />
                                <label htmlFor="2">₹ 500 to ₹ 1000</label>
                                <br />
                                <input id="3" type="radio" name="cost" onClick={() => this.handleCostClick(1000, 1500)} style={{ "margin-bottom": "10px" }} />
                                <label htmlFor="3">₹ 1000 to ₹ 1500</label>
                                <br />
                                <input id="4" type="radio" name="cost" onClick={() => this.handleCostClick(1500, 2000)} style={{ "margin-bottom": "10px" }} />
                                <label htmlFor="4">₹ 1500 to ₹ 2000</label>
                                <br />
                                <input id="5" type="radio" name="cost" onClick={() => this.handleCostClick(2000, 2000000)} style={{ "margin-bottom": "10px" }} />
                                <label htmlFor="5">₹ 2000+</label> <br />
                            </span>
                            <span>
                                <h3 style={{ color: "darkblue" }}>Sort</h3>
                                <input id="6" type="radio" name="price" onClick={this.sortAscending} style={{ "margin-bottom": "10px" }}/>
                                <label htmlFor="6">Price low to high</label> <br />
                                <input id="7" type="radio" name="price" onClick={this.sortDescending} style={{ "margin-bottom": "10px" }} />
                                <label htmlFor="7">Price high to low</label>
                            </span>
                        </section>
                        <div className="sec2div">
                            <section className="sec2">
                                {
                                    restaurantList.length > 0 ? restaurantList.map (article => {
                                        return <article className="box1" onClick={() => this.handleClick(article)}>
                                                    <img src={shutterstock_1154073754} alt="No pic" width="100px" height="80px" className="i1" />
                                                    <h2 className="h2head" style={{ color: "darkblue" }}>{article.name}</h2>
                                                    <p className="fort1" style={{ color: "darkblue" }}>{article.locality}</p>
                                                    <p className="add1" style={{ color: "darkblue" }}>{article.address}</p>
                                                    <hr width="650px;" />
                                                    <p style={{ color: "darkblue" }}>Cuisine: {article.Cuisine.map(item =>item.name + ', ')}</p>
                                                    <p style={{ color: "darkblue" }}>Cost: ₹ {article.cost}</p>
                                                </article>
                                    }) : <div id="noresult">Sorry, No Results Found!!!</div>
                                }
                        {/* <section className="button-main">
                            <button className="p1">&lt;</button>
                            <button className="p2">1</button>
                            <button className="p3">2</button>
                            <button className="p4">3</button>
                            <button className="p5">4</button>
                            <button className="p6">5</button>
                            <button className="p7">&gt;</button>
                        </section> */}
                        <br /><br />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default filter;