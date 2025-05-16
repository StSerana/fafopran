import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from './domain/Main.tsx'
import {Tasks} from "./domain/task/Tasks.tsx";
import {Statistics} from "./domain/statistics/Statistics.tsx";
import {SolveTask} from "./domain/task/SolveTask.tsx";
import Login from "./domain/user/LoginPage.tsx";
import {PrivateRoute} from "./context/PrivateRoute.tsx";
import { AuthProvider } from './context/AuthProvider';
import Logout from "./domain/user/LogoutPage.tsx";
import Game from "./domain/task/tic-tac-toe/Game.tsx";


function App() {

    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="login" element={<Login/>}/>
                        <Route element={<PrivateRoute/>}>
                            <Route path="" element={<Main/>}/>
                            <Route path="tasks" element={<Tasks/>}/>
                            <Route path="tasks/game" element={<Game/>}/>
                            <Route path="tasks/*" element={<SolveTask/>}/>
                            <Route path="statistics" element={<Statistics/>}/>
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>

        </>
    )
}

export default App
