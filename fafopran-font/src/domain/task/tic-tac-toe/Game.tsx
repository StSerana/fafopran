import { useState } from 'react';
import '../../../App.css'

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {

    const answerArray: Map<number, string> = new Map<number, string>()
    function handleClick(i: number) {
        // if (calculateWinner(squares) || squares[i]) {
        //     return;
        // }
        const nextSquares = squares.slice();
        // if (xIsNext) {
        //     nextSquares[i] = 'X';
        // } else {
        //     nextSquares[i] = 'O';
        // }
        if (answerArray.has(i)) {
            nextSquares[i] = answerArray.get(i);
        } else {
            nextSquares[i] = 'X';
        }
        onPlay(nextSquares);
    }

    const winner = gameOver(squares);
    let status;
    if (winner == 'X') {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            </div>
            <div className="board-row">
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
                <Square value={squares[9]} onSquareClick={() => handleClick(9)}/>
            </div>
            <div className="board-row">
                <Square value={squares[10]} onSquareClick={() => handleClick(10)}/>
                <Square value={squares[11]} onSquareClick={() => handleClick(11)}/>
                <Square value={squares[12]} onSquareClick={() => handleClick(12)}/>
                <Square value={squares[13]} onSquareClick={() => handleClick(13)}/>
                <Square value={squares[14]} onSquareClick={() => handleClick(14)}/>
            </div>
            <div className="board-row">
                <Square value={squares[15]} onSquareClick={() => handleClick(15)}/>
                <Square value={squares[16]} onSquareClick={() => handleClick(16)}/>
                <Square value={squares[17]} onSquareClick={() => handleClick(17)}/>
                <Square value={squares[18]} onSquareClick={() => handleClick(18)}/>
                <Square value={squares[19]} onSquareClick={() => handleClick(19)}/>
            </div>
            <div className="board-row">
                <Square value={squares[20]} onSquareClick={() => handleClick(20)}/>
                <Square value={squares[21]} onSquareClick={() => handleClick(21)}/>
                <Square value={squares[22]} onSquareClick={() => handleClick(22)}/>
                <Square value={squares[23]} onSquareClick={() => handleClick(23)}/>
                <Square value={squares[24]} onSquareClick={() => handleClick(24)}/>
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];


    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // const moves = history.map((squares, move) => {
    //     let description;
    //     if (move > 0) {
    //         description = 'Go to move #' + move;
    //     } else {
    //         description = 'Go to game start';
    //     }
    //     return (
    //         <li key={move}>
    //             <button onClick={() => jumpTo(move)}>{description}</button>
    //         </li>
    //     );
    // });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ul className="game-list">
                    <li key="move-0">
                        <button onClick={() => jumpTo(0)}>Начать заново</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function gameOver(squares) : string {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == 'X') {
            return 'X'
        }
    }
    return ''
}
// function calculateWinner(squares) {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//             return squares[a];
//         }
//     }
//     return null;
// }