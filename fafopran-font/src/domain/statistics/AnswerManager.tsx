import React, {useState} from "react";
import axiosClient from "../../common/axiosClient.tsx";

class FlagAnswer {
    constructor(isSuccess: boolean) {
        this.isSuccess = isSuccess
    }

    isSuccess: boolean
}

function createFlag(userFlag: string): string {
    return "flag-" + userFlag
}

function captureFlag(_e: React.FormEvent<HTMLFormElement>, userFlag: string) {

    let answer: FlagAnswer = new FlagAnswer(false)
    axiosClient.post('/capture-the-flag', JSON.stringify({flag: createFlag(userFlag)}))
        .then(response => {
            console.log(response)
            answer = response.data
        })
        .catch(error => {
            console.error("Error: " + error);
        });

    return answer
}


export const AnswerManager = {
    SendAnswer: () => {
        const [flag, setFlag] = useState('');

        return (
            <>
                <form onSubmit={(e) => captureFlag(e, flag)}>
                    <label>flag-</label>
                    <input type="text" id="flag" name="flag" defaultValue="{}"
                           onChange={e => setFlag(e.target.value)}></input>
                    <input type="submit" value="Submit"/>
                </form>
            </>
        )
    }
}