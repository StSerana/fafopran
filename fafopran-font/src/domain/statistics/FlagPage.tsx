import axiosClient from "../../common/axiosClient.tsx";
import {useState} from "react";
import './statistics.css'

function createFlag(userFlag: string): string {
    return "flag-" + userFlag
}

const FlagPage = () => {

    const [response, setResponse] = useState('Еще не сдано')

    const [flags, setFlags] = useState('{}')

    const handleSubmit = () => {
        // event.preventDefault()
        axiosClient.post('/api/capture-the-flag', JSON.stringify({flag: createFlag(flags)}))
            .then(res => {
                console.log(res)
                setResponse(res.data.isSuccess ? 'Все получилось!' : 'Где-то неправильно')
            })
            .catch(error => {
                console.error("Error: " + error);
                if (error.response.status == 400) {
                    setResponse(error.response.data.message)
                }
            });
        setFlags('{}')
    }

    return (<div className="div-flag">
        <h2>Сдать флаг</h2>
        <form onSubmit={handleSubmit}>
            <label>flag-</label>
            <input type="text" id="flag" name="flag" value={flags}
                   onChange={e => setFlags(e.target.value)}></input>
            <input type="submit" value="Submit"/>
        </form>
        <br/>
        Результат сдачи: {response}
    </div>)
}

export default FlagPage