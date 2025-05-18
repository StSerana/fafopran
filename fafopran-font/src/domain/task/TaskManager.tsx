import axiosClient from "../../common/axiosClient.tsx";
import {useEffect, useState} from "react";

export class Task {
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    id: number = 0;
    conditionType: string = "";
    name: string = "";
    description: string = "";
    attachments: TaskAttachment[] = []
    weight: number = 0
}

export class TaskAttachment {
    atype: string = "";
    path: string = "";
    context: object | undefined;
}

export const TaskManager = {
    GetTasks: () => {

        const [tasks, setTasks] = useState<Task[]>([])
        useEffect(() => {
                axiosClient.get('/api/tasks')
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
        return tasks
    },
    GetTask: (taskId: number) => {
        const [task, setTask] = useState<Task>()
        useEffect(() => {
                axiosClient.get('/api/tasks/' + taskId)
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
        return task
    }
}