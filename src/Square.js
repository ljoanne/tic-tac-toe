import React from 'react';

export default function Square(props) {

    /*
    no constructor because no state required here
    React apps to use on* names for the attributes and handle* for the handler methods

    functional component - only has a render method */

    return (
        <button className={props.wins ? "square-win" : "square"}
                onClick={props.onClick}> {/* onClick is part of the built-in DOM that tells react to set up a click event listener*/}
            {props.value}
        </button>
    );
}