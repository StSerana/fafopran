import {TaskManager} from "./TaskManager.tsx";
import {useState} from "react";

function BuildTasks() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="tasks">
                {TaskManager.GetTasks()}
            </div>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </>
    )
}

export const Tasks = () => BuildTasks()