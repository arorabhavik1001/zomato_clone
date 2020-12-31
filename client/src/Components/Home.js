import React from 'react';
import '../Styles/style.css';
import Wallpaper from './Wallpaper';
import Quicksearch from './Quicksearch';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            mealtypes: [],
            cities: []
        }
    }
    componentDidMount() {
        axios({url: 'http://localhost:5000/api/cityList'}).then(result => {
            this.setState({
                cities: result.data.cities
            })
        }).catch(error => {
            console.log(error);
        })
        axios({url: 'http://localhost:5000/api/mealtype'}).then(result => {
            this.setState({
                mealtypes: result.data.mealtypes
            })
        }).catch(error => {
            console.log(error);
        })
    }
    render() {
        const { cities, mealtypes } = this.state;
        return (
            <div className='background'>
                <Wallpaper cities = {cities}/>
                <Quicksearch mealtypes = {mealtypes}/>
            </div>
        );
    }
}

export default Home;