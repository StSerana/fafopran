import axiosClient from "../../common/axiosClient.tsx";
import {useState} from "react";

function createFlag(userFlag: string): string {
    return "flag-" + userFlag
}

const FlagPage = () => {

    let flag = ''
    const [response, setResponse] = useState('')

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        {
            axiosClient.post('/api/capture-the-flag', JSON.stringify({flag: createFlag(flag)}))
                .then(res => {
                    console.log(res)
                    setResponse(res.data.isSuccess)
                })
                .catch(error => {
                    console.error("Error: " + error);
                });
        }
    }

    return(<>
        <h1>Сдать флаг</h1>
        <form onSubmit={handleSubmit}>
            <label>flag-</label>
            <input type="text" id="flag" name="flag" defaultValue="{}"
                   onChange={e => flag = e.target.value}></input>
            <input type="submit" value="Submit"/>
        </form>
        Результат сдачи: {response}
        <br/>
    </>)
}

export default FlagPage