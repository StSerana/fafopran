import axiosClient from "../../common/axiosClient.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

class Task {
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    id: number = 0;
    conditionType: string = "";
    name: string = "";
    description: string = "";
    attachments: string[] = []
}

export const TaskManager = {
    GetTasks: () => {

        const [tasks, setTasks] = useState<Task[]>([])
        useEffect(() => {
                axiosClient.get('/tasks')
                    .then(response => {
                        setTasks(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            ,
            []
        )

        // mock
        //const ts = [new Task(1, "First")]
        return (
            <>
                <ul>
                    {tasks.map((task => (
                        <li>
                            <div>
                                <Link to={"/tasks/" + task.id} state={{taskId: task.id}}><h1>{task.name}</h1></Link>
                            </div>
                        </li>
                    )))}
                </ul>
            </>
        )
    },
    GetTask: (taskId: number) => {
        const [task, setTask] = useState<Task>()
        useEffect(() => {
                axiosClient.get('/tasks/' + taskId)
                    .then(response => {
                        setTask(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            ,
            [taskId]
        )
        console.log("TaskId " + taskId)
        // mock
        //return new Task(1, "First")
        return task
    }
}