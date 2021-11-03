import React from 'react';
import './StarIcons.css';

const StarIcons = (props) => {

    let star = props.widthRate || props.starFromFirebase; // props.widthRate is star from local state, props.starFromFirebase is star retrieved from firebase for that object

    // ternary if … else if … else if … else chain -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    let range = star === 1 ? 20 //20%
        : star === 2 ? 40   //40% itd.
            : star === 3 ? 60
                : star === 4 ? 80
                    : star === 5 ? 100 : 0;

    return (
        <span className="score">
            <div className="score-wrap">
                <span className="stars-active" style={{ width: star === 0 ? 0 + '%' : range + '%' }}>
                    <i className="fa fa-star" aria-hidden="true" onClick={props.rateIt} data-value="1"></i>
                    <i className="fa fa-star" aria-hidden="true" onClick={props.rateIt} data-value="2"></i>
                    <i className="fa fa-star" aria-hidden="true" onClick={props.rateIt} data-value="3"></i>
                    <i className="fa fa-star" aria-hidden="true" onClick={props.rateIt} data-value="4"></i>
                    <i className="fa fa-star" aria-hidden="true" onClick={props.rateIt} data-value="5"></i>
                </span>
                <span className="stars-inactive">
                    <i className="fa fa-star-o" aria-hidden="true" onClick={props.rateIt} data-value="1"></i>
                    <i className="fa fa-star-o" aria-hidden="true" onClick={props.rateIt} data-value="2"></i>
                    <i className="fa fa-star-o" aria-hidden="true" onClick={props.rateIt} data-value="3"></i>
                    <i className="fa fa-star-o" aria-hidden="true" onClick={props.rateIt} data-value="4"></i>
                    <i className="fa fa-star-o" aria-hidden="true" onClick={props.rateIt} data-value="5"></i>
                </span>
            </div>
        </span>
    );
}

export default StarIcons;