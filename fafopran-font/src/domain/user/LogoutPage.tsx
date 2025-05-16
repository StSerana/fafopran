import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.tsx";
import axiosClient from "../../common/axiosClient.tsx";

function Logout() {
    const {setAuth} = useAuth()
    const navigate = useNavigate();

    useEffect(() => {

        axiosClient.post('/logout', null,{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        )
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error("Error: " + error);
            });
        setAuth(false)
        navigate('/');
    }, [setAuth, navigate])

    return (
        <div>Logout</div>
    )
}

export default Logout
