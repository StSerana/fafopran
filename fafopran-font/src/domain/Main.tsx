import reactLogo from '../assets/react.svg'
import {Link} from "react-router-dom";

//import viteLogo from '../vite.svg'

function MyButton() {
    return (
        <button>I'm a button</button>
    );
}

function Links() {
    return (
        <Link to="/statistics">
            <button>Статистика</button>
        </Link>
    )
}

function Tasks() {
    return (
        <Link to="/tasks">
            <button>Задания</button>
        </Link>
    )
}

function BuildMain() {
    return (
        <>
            <div>
                <h1>Welcome to my app</h1>
                <MyButton/>
                <br/>
                <Links/>
                <br/>
                <Tasks/>
            </div>

            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
        </>
    )
}

export const Main = () => BuildMain()