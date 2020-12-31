import React from 'react';
import { withRouter } from 'react-router-dom';
import '../Styles/style.css';

class QuickSearchItem extends React.Component {
    constructor() {
        super();
    }

    handleClick(id) {
        this.props.history.push(`/filter?mealtype=${id}`);
    }

    render() {
        const { id, mealtype } = this.props;
        const { name, content, image } = mealtype;
        const imagePath = require('../' + image).default;
        return(
            <div className="grid-element col-lg-3 col-sm-6 grid1-element" onClick={() => this.handleClick(id)} style={{ 'boxShadow': '2px 2px 8px #0000004f', margin: '10px', "padding-bottom": '10px'}}>
                    <img src={imagePath} alt="no pic" width="200px" height="100%" style={{ 'display': 'inline', "margin-top":"10px", "margin-left":"10px"/*, "border": "3px dotted black"*/}} />
                    <div className="name">{name}</div>
                    <div className="content">{content}</div>
            </div>
        )
    }
}

export default withRouter(QuickSearchItem);