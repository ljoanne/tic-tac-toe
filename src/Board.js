import React from 'react';
import Square from './Square.js';

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} /* JavaScript arrow function syntax */
                wins={this.props.wins != null && this.props.wins.includes(i)}
            />
        );
    }

    createRow(i) {
        var squares = [];
        for (var j = i; j < i + 3; j++) {
            squares.push(this.renderSquare(j));
        }
        return squares;
    }

    createTable() {
        var rows = [];
        for (var i = 0; i < 9; i = i + 3) {
            rows.push(
                <div className="board-row">
                    {this.createRow(i)}
                </div>);
        }
        return rows;
    }

    render() {
        return (
            <div>
                {this.createTable()}
            </div>

        );
    }
}



