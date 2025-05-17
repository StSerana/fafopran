import {Task, TaskManager} from "./TaskManager.tsx";
import Menu, {MenuItem} from "./menu/Menu.tsx";
import {Link} from "react-router-dom";

function TaskLink(t: Task) {
    return <Link to={"/tasks/" + t.id} state={{taskId: t.id}} className="menu__item-link">{t.name}</Link>
}

function renderMenuItems(tasks: Task[]): MenuItem[] {
    return tasks.map(t => {
        return new MenuItem(t.name, () => TaskLink(t))
    })
}

function BuildTasks() {


    const tasks = renderMenuItems(TaskManager.GetTasks())

    return (
        <>
            <div className="tasks">
                <Menu items={tasks}/>
                {/*{TaskManager.GetTasks()}*/}
            </div>
            {/*<div className="card">*/}
            {/*    <button onClick={() => setCount((count) => count + 1)}>*/}
            {/*        count is {count}*/}
            {/*    </button>*/}
            {/*</div>*/}
        </>
    )
}

export const Tasks = () => BuildTasks()