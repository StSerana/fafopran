import {Link} from "react-router-dom";
import '../App.css'

function Statistics() {
    return (
        <Link to="/statistics">
            <button className="main-menu-button">Статистика</button>
        </Link>
    )
}

function Tasks() {
    return (
        <Link to="/tasks">
            <button className="main-menu-button">Задания</button>
        </Link>
    )
}

function BuildMain() {
    return (
        <>
            <div>
                <h1>Добро пожаловать!</h1>
                <br/>
                <Tasks/>
                <br/>
                <br/>
                <Statistics/>
            </div>
        </>
    )
}

export const Main = () => BuildMain()