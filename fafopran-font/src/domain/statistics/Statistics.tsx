import {StatisticsManager, TaskScore, TeamInfo} from "./StatisticsManager.tsx";
import './statistics.css'
import {useEffect, useState} from "react";
import Instant from "ts-time/Instant";
import TimeFormatter from "ts-time-format/TimeFormatter";
import {ZoneId} from "ts-time/Zone";
import FlagPage from "./FlagPage.tsx";
import {Task, TaskManager} from "../task/TaskManager.tsx";


function firstRow(tasks: Task[]) {
    const columns = [];
    columns.push(<td>Команды/Задания</td>)
    for (let i = 0; i < tasks.length; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        columns.push(
            <td key={"0-srow-" + i} className="statistics_head">
                <div className="statistics_head_text">{tasks[i].name}</div>
            </td>);
    }
    columns.push(<td width="5%">
        <div>Итого</div>
    </td>)
    return columns
}

function renderScore(tasks: Task[], name: string, score: Map<string, TaskScore>) {
    const columns = []
    let itogo = 0
    const map = new Map<string, TaskScore>(Object.entries(score))
    for (let i = 0; i < tasks.length; i++) {
        if (map.has("" + tasks[i].id)) {
            const taskScore = map.get("" + tasks[i].id)
            if (taskScore?.solved) {
                itogo = itogo + tasks[i].weight * (0.95 ** taskScore.attempts)
            }
            columns.push(<td key={name + "-srow-" + i}
                             className={taskScore?.solved ? "solved" : "not_solved"}
                             width="5%">
                {taskScore?.attempts}
                <br/>
                <div className="statistics_time">
                    {taskScore?.lastAttempt == null ?
                        "" :
                        TimeFormatter.ofPattern("HH:mm")
                            .format(Instant.parse(taskScore!.lastAttempt!)
                                .atZone(ZoneId.of("Asia/Yekaterinburg")).time)
                            .toString()}
                </div>
            </td>)
        } else {
            columns.push(<td key={name + "-srow-" + i} className="not_solved_yet" width="5%">
                0
            </td>)
        }
    }
    columns.push(<td>{itogo.toFixed(2)}</td>)
    return columns
}

function sortData(data: TeamInfo[]) {
    return data.sort((a, b) => a.id < b.id ? -1 : 1)
}

function BuildStatistics() {
    const [statistics, setStat] = useState<TeamInfo[]>([])

    const tasks = TaskManager.GetTasks()
    const [, setTime] = useState(Date.now());
    useEffect(() => {
        StatisticsManager.GetStatistics()
            .then(r => setStat(sortData(r.data)))
            .catch(() => console.error("no stat"))
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now())
            StatisticsManager.GetStatistics()
                .then(r => setStat(sortData(r.data)))
                .catch(() => console.error("no stat"))
        }, 15000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <FlagPage/>

            {/*<div>Таймер: {time}</div>*/}
            <div className="statistics">
                <h1>Статистика</h1>

                <table id="statistics">
                    <tbody>
                    <tr>
                        {firstRow(tasks)}
                    </tr>

                    {statistics.map(row => (
                        <tr>
                            <td key={row.name} width="15%">{row.name}</td>
                            {renderScore(tasks, row.name, row.score)}
                        </tr>
                    ))}
                    {/*mock*/}
                    {/*<tr>*/}
                    {/*    <td key="mock" width="15%">mock</td>*/}
                    {/*    {renderScore(tasks, "Заглушка", new Map([["12", new TaskScore(7, true, Instant.now().toString())]]))}*/}
                    {/*</tr>*/}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export const Statistics = () => BuildStatistics()