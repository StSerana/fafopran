--liquibase formatted sql

--changeset serana:team:1
CREATE TABLE if not exists teams
(
    id   BIGINT PRIMARY KEY,
    name VARCHAR not null
);

--changeset serana:statistics:1
CREATE TABLE if not exists statistics
(
    id             uuid      not null,
    team_id        BIGINT    NOT NULL references teams (id),
    task_id        BIGINT    NOT NULL references tasks (id),
    attempts_count int       not null default 0,
    solved         boolean   not null default false,
    last_answer    timestamp null,
    PRIMARY KEY (team_id, task_id)
);
