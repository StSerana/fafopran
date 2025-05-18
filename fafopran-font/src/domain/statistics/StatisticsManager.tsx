import axiosClient from "../../common/axiosClient.tsx";

export class TeamInfo {
    id: number = 0;
    name: string = '';
    score: Map<string, TaskScore> = new Map<string, TaskScore>();
}

export class TaskScore {
    constructor(attempts: number, b: boolean, time: string | null) {
        this.attempts = attempts
        this.solved = b
        this.lastAttempt = time
    }

    attempts: number = 0
    solved: boolean = false
    lastAttempt: string | null
}


export const StatisticsManager = {
    GetStatistics: () => {
        return axiosClient.get('/api/statistics')
    }
}