import axiosClient from "../../common/axiosClient.tsx";

export interface TeamInfo {
    name: string
    score: Map<string, TaskScore>
}

export class TaskScore {
    constructor(number: number, b: boolean, time: string | null) {
        this.attempts = number
        this.solved = b
        this.lastAttempt = time
    }

    attempts: number = 0
    solved: boolean = false
    lastAttempt: string | null
}


export const StatisticsManager = {
    GetStatistics: () => {
        return axiosClient.get('/statistics')
    }
}