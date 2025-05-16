import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {TaskManager} from "./TaskManager.tsx";

function BuildSolveTask() {

    const location = useLocation();

    useEffect(() => {
        console.log('Current location is ', location);
    }, [location]);

    const task = TaskManager.GetTask(location.state?.taskId)
    return (
        <>
            {task?.name}
        </>
    )
}

export const SolveTask = () => BuildSolveTask()