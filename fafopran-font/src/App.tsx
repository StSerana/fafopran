import './App.css'
import {HashRouter, Route, Routes} from "react-router-dom";
import {Main} from './domain/Main.tsx'
import {Tasks} from "./domain/task/Tasks.tsx";
import {Statistics} from "./domain/statistics/Statistics.tsx";
import {SolveTask} from "./domain/task/SolveTask.tsx";
import Login from "./domain/user/LoginPage.tsx";
import {PrivateRoute} from "./context/PrivateRoute.tsx";
import {AuthProvider} from './context/AuthProvider';
import Logout from "./domain/user/LogoutPage.tsx";
import GameTask from "./domain/task/tic-tac-toe/GameTask.tsx";
import OkakTask from "./domain/task/okak/OkakTask.tsx";
import Menu from "./domain/task/menu/Menu.tsx";


function App() {

    return (
        <>
            <HashRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="login" element={<Login/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="" element={<Main/>}/>
                            <Route path="menu" element={<Menu/>}/>
                            <Route path="tasks" element={<Tasks/>}/>
                            <Route path="tasks/game" element={<GameTask/>}/>
                            <Route path="tasks/img" element={<OkakTask/>}/>
                            <Route path="tasks/*" element={<SolveTask/>}/>
                            <Route path="statistics" element={<Statistics/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                        </Route>
                    </Routes>
                </AuthProvider>
            </HashRouter>

        </>
    )
}

export default App
