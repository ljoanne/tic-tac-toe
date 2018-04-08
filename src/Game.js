import React from 'react';
import Board from './Board.js';

/*
React.Component
tells react which component to render when data changes
aka React component class/type

properties: 
1. props (parameters)
2. state - should be private to the component 
when this.setState is called,
component update is scheduled, react merges in the passed state update, re-renders the component and its descendants
best practice - store states in the parent components. 
parents can pass the states down to children components via props
parent and children components are always in sync
pull the states upwards (mainly how React is re-factored)
whenever the parent's state updates, child components are re-rendered automatically 
Controlled Components -> when a component receives its value from the parent and informs its parent when it's clicked

render() 
-> returns a hierarchy of views to display
-> description of what you want to render
-> React element (lightweight description of what to render)

React elements are REAL JS Objects that can be stored in a variable or passed around

Can render built-in DOM components or custom react components by using <ClassName />
components are encapsulated -> operates independently

Tracking changes are easier done when objects are immutable, therefore determining re-rendering requirement
benefits when building PURE COMPONENTS
*/
export default class Game extends React.Component {
  constructor(props) {
    super(props); // always required to explicitly call super() when defining a constructor of a subclass
    this.state = { // initial state set up
      history: [{
        squares: Array(9).fill(null),
        location: null,
      }],
      xIsNext: true,
      stepNumber: 0,
      selected: null,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1); // .slice() copies the array instead of mutating it
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const potentialWin = calculateWinningRows(squares);
    if(potentialWin != null || squares[i]) {
      return; // square occupied already or already won
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ 
      history: history.concat([{
        squares: squares,
        location: i,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      selected: history.length,
    });

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
      selected: step,
    });
  }

  calculateStatus(winner) {
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.stepNumber > 8) {
      status = 'No more boxes left. Tie!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return status;
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winningRows = calculateWinningRows(current.squares);
    const winner = winningRows != null ? current.squares[winningRows[0]] : null;

    const status = this.calculateStatus(winner);

    const moves = history.map((step, move) => {
      const description = move ? 'Go to move #' + move + ' (' + calculateLocation(this.state.history[move].location) + ')' : 'Go to game start';
      return (
        <li key={move}> {/* assign proper keys for dynamic lists */}
          <button onClick={() => this.jumpTo(move)}>
            {this.state.selected == move ? <b>{description}</b> : description}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            wins={winningRows}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol> {/* shows the buttons */}
        </div>
      </div>
    );
  }
}

function calculateLocation(i) {
  const coordinates = [
    [1,1], [1,2], [1,3],
    [2,1], [2,2], [2,3],
    [3,1], [3,2], [3,3]
  ];
  return coordinates[i];
}


function calculateWinningRows(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for(let i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return lines[i];
    }
  }

  return null;
}