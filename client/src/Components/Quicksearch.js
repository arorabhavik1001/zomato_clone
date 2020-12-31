import React from 'react';
import Quicksearchitem from './QucikSearchItem'

class Quicksearch extends React.Component {
    // eslint-disable-next-line
    constructor(){
        super();
    }

    componentDidMount() {
        
    }

    render() {
        // eslint-disable-next-line
        const { mealtypes } = this.props
        return (
            <React.Fragment>
                <div className="quickHeading">
                    <h1 style={{ color: 'darkblue' }}>Quick Searches</h1>
                    <h3 style={{ color: 'darkblue' }}>Discover restaurants by type of meal</h3>
                </div>
                <div className="container-fluid maingrid">
                    <div className="row" style={{ 'marginLeft': '12%' }}>
                        {
                            mealtypes.map((mealtype, index) =>{
                            return <Quicksearchitem key={index} id={index + 1} mealtype={mealtype}/>
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Quicksearch;