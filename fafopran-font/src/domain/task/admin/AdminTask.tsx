import {useEffect, useState} from "react";
import axiosClient from "../../../common/axiosClient.tsx";
import './admin.css'

export default function AdminTask() {

    const [response, setResponse] = useState('')

    useEffect(() => {
        axiosClient.post("/api/admin/admintask")
            .then(r => {
                setResponse(r.data.resolution)
            })
            .catch(error => console.error(error))
    }, []);
    return (
        <>
            <div className="admin-task">
                <h3>{response}</h3>
            </div>
        </>
    );
}