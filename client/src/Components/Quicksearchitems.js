import React from 'react';
import { withRouter } from 'react-router-dom';
// import breakfast from '../assets/breakfast.jpg';
// import lunch from '../assets/lunch.jpg';
// import drinks from '../assets/drinks.png';
// import dinner from '../assets/dinner.png';
// import nightlife from '../assets/nightlife.png';
// import snacks from '../assets/snacks.jpg';

class Quicksearchitems extends React.Component {
    // eslint-disable-next-line
    constructor(){
        super();
    }

    handleClick(id) {
        this.props.history.push(`/filter/?mealtype=${id}`);
    }

    render() {
        const { mealtypes, id } = this.props;
        const { image, content } = mealtypes;
        const imagePath = require('../' + image).default;
        return (
            <div onClick={() => this.handleClick(id)}>
                <div className="grid-element col-lg-3 col-sm-6" style={{ 'boxShadow': '2px 2px 8px #0000004f', margin: '10px' }}>
                    <img src={imagePath} alt="no pic" width="200px" height="100%" />
                    <div className="name">bhavik</div>
                    {/* <div className="name">{content}</div> */}
                    <div className="content">{content}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Quicksearchitems);