import {useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth.tsx";
import {useState} from "react";
import axiosClient from "../../common/axiosClient.tsx";


class LoginResponse {
    constructor(b: boolean) {
        this.isAuthenticated = b
    }

    isAuthenticated: boolean;
}

const Login = () => {
    const {setAuth} = useAuth()
    const navigate = useNavigate()
    // const location = useLocation()
    // const from = location.state?.from?.pathname || '/'
    const [response, setResponse] = useState<LoginResponse>();
    let loginInput = '';
    let passwordInput = '';

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        //const header = "basic " + btoa(loginInput + ":" + passwordInput)

        axiosClient.post('/public/login', null, {
                withCredentials: true,
                auth: {
                    username: loginInput,
                    password: passwordInput
                },
            }
        )
            .then(response => {
                console.log(response)
                if (response.data.isAuthenticated) {
                    // const cookies = new Cookies();
                    // const coo = response.headers["set-cookie"]
                    // coo!.forEach(c => cookies.set(c))
                    setAuth(true)
                    setResponse(response.data)
                    navigate('/', {replace: true});
                }
            })
            .catch(error => {
                console.error("Error: " + error);
            });
    }

    return (
        <>
            <div>Login</div>

            <form onSubmit={handleSubmit}>
                <input type="text" id="login" name="login"
                       onChange={event => loginInput = (event.target.value)}></input>
                <br/>
                <input type="password" id="password" name="password"
                       onChange={event => passwordInput = event.target.value}></input>
                <br/>
                <input type="submit" value="Submit"/>
            </form>

            {/*<button type={'button'} onClick={() => {*/}

            {/*    setAuth(true)*/}
            {/*    navigate(from, {replace: true});*/}
            {/*}}>Login*/}
            {/*</button>*/}
            {response}
        </>
    )
}

export default Login
