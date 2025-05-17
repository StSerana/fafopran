import {useState} from 'react';
import './game.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Square({id, value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick} id={"square-" + id}>
            {value}
        </button>
    );
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Board({squares, onPlay}) {

    const answerArray = new Map<number, { text: string, color: string }>([
        [4, {text: "FE", color: "green"}], [8, {text: "WW", color: "green"}],
        [10, {text: "OR", color: "orange"}], [12, {text: "DS", color: "green"}],
        [16, {text: "AN", color: "orange"}], [18, {text: "DM", color: "green"}],
        [22, {text: "AN", color: "orange"}], [24, {text: "YD", color: "green"}],
        [26, {text: "EE", color: "orange"}], [30, {text: "DS", color: "orange"}]])

    function handleClick(i: number) {

        if (gameOver(squares) == 'X' || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();

        if (answerArray.has(i)) {
            nextSquares[i] =
                <div className={answerArray.get(i)!.color + " " + "answerGame"}>{answerArray.get(i)!.text}</div>
        } else {
            nextSquares[i] = 'X';
        }
        onPlay(nextSquares);
    }

    function createMap(height: number, width: number) {
        const map = [];

        for (let i = 0; i < height; i++) {
            map.push(<div className="board-row" key={i}>{createCells(i, width)}</div>)

        }
        return map
    }

    function createCells(row: number, width: number) {
        const cells = []
        for (let j = 0; j < width; j++) {
            cells.push(<Square key={"square" + (j + row * width)} id={(j + row * width)}
                               value={squares[j + row * width]} onSquareClick={() => handleClick(j + row * width)}/>)
        }
        return cells
    }

    const winner = gameOver(squares);
    let status;
    if (winner == 'X') {
        status = 'Игра окончена'
    } else if (winner == '') {
        status = 'Делайте следующий ход';
    } else {
        status = winner + "<капсом как есть>}"
    }

    return (
        <>
            <div className="status">{status}</div>
            <br/>
            {createMap(7, 5)}
        </>
    );
}

export default function GameTask() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    //const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];


    function handlePlay(nextSquares: never[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <div className="game-button">
                    <button onClick={() => jumpTo(0)}>Начать заново</button>
                </div>
                <div game-hint="not 2, 6, 14, 20, 28..." className="game-hint">
                    Подсказка:
                    <br/>
                </div>
            </div>
        </div>
    );
}

function gameOver(squares: string[]): string {
    let counter = 0;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == 'X') {
            return 'X'
        }
        if (squares[i] != null) {
            counter++
        }
    }
    return counter == 10 ? 'flag-{R0FNRQ==12' : ''
}