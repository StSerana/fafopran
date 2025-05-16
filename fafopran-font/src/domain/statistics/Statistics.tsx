import {StatisticsManager, TaskScore, TeamInfo} from "./StatisticsManager.tsx";
import '../../App.css'
import {AnswerManager} from "./AnswerManager.tsx";
import {useEffect, useState} from "react";
import Instant from "ts-time/Instant";
import TimeFormatter from "ts-time-format/TimeFormatter";
import {UTC} from "ts-time/Zone";


function firstRow(numrows: number) {
    const rows = [];
    for (let i = 0; i < numrows; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<td key={"0-srow-" + i}>
            {i}
        </td>);
    }
    return rows
}

function renderScore(name: string, numrows: number, score: Map<string, TaskScore>) {
    const columns = []
    const map = new Map<string, TaskScore>(Object.entries(score))
    for (let i = 0; i < numrows; i++) {
        if (map.has("" + i)) {
            columns.push(<td key={name + "-srow-" + i} className={map.get("" + i)?.solved ? "solved" : "not_solved"}
                             width="5%">
                {map.get("" + i)?.attempts}
                <br/>
                <div className="statistics_time">
                    {map.get("" + i)?.lastAttempt == null ? "" : TimeFormatter.ofPattern("HH:mm").format(Instant.parse(map.get("" + i)!.lastAttempt!).atZone(UTC).time).toString()}</div>
            </td>)
        } else {
            columns.push(<td key={name + "-srow-" + i} className="not_solved_yet" width="5%">
                0
            </td>)
        }
    }
    return columns
}

function BuildStatistics() {
    const [statistics, setStat] = useState<TeamInfo[]>([])

    useEffect(() => {
        StatisticsManager.GetStatistics()
            .then(r => setStat(r.data))
            .catch(() => console.error("no stat"))
    }, []);

    return (
        <>
            <div>{AnswerManager.SendAnswer()}</div>
            <div className="statistics">
                <h1>Статистика</h1>

                <table id="statistics">
                    <tbody>
                    <tr>
                        {firstRow(10)}
                    </tr>

                    {statistics.map(row => (
                        <tr>
                            <td key={row.name} width="15%">{row.name}</td>
                            {renderScore(row.name, 9, row.score)}
                        </tr>
                    ))}
                    {/*mock*/}
                    <tr>
                        <td key="mock" width="15%">mock</td>
                        {renderScore("Заглушка", 9, new Map([["7", new TaskScore(7, true, Instant.now().toString())]]))}
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export const Statistics = () => BuildStatistics()