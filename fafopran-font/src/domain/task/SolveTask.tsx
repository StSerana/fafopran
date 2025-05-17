import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {TaskAttachment, TaskManager} from "./TaskManager.tsx";
import Components from './ComponentIndex';
import {JSX} from "react/jsx-runtime";
import '../../App.css';

function resolveAttachments(attachments: TaskAttachment[] | undefined) {
    const result: JSX.Element[] = []
    if (attachments != null && attachments.length > 0) {
        attachments.forEach(e => {
            switch (e.atype) {
                case 'ELEMENT': {
                    const c = Components.get(e.path)
                    result.push(<>{c}</>)
                    break
                }
                case 'IMAGE': {
                    result.push(<>
                        <img src={e.path} alt="Какая-то картинка"/>
                    </>)
                    break
                }
                case 'FILE': {
                    result.push(<>
                        тут лежит файл (потому что так было проще) -&gt;
                        <a href={e.path}>link</a>
                    </>)
                    break
                }
                case 'LINK': {
                    result.push(<>
                        <a href={e.path}>
                            Перейти по ссылке
                        </a>
                    </>)
                    break
                }
                case 'CONTEXT': {
                    result.push(<></>)
                    break
                }
            }
        })
    }
    return result
}

function BuildSolveTask() {

    const location = useLocation();
    const [attach, setAttach] = useState()

    useEffect(() => {
        console.log('Current location is ', location);
    }, [location]);

    const task = TaskManager.GetTask(location.state?.taskId)
    useEffect(() => {
        const res = resolveAttachments(task?.attachments);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setAttach(res);
    }, [task?.attachments]);
    return (
        <>
            <h2>{task?.name}</h2>
            {task?.description}
            <div className="attachments">
                {attach}
            </div>
        </>
    )
}

export const SolveTask = () => BuildSolveTask()