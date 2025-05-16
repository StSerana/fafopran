--liquibase formatted sql

--changeset serana:user:1
CREATE TABLE if not exists users
(
    id       BIGINT PRIMARY KEY,
    username VARCHAR not null,
    password varchar not null,
    team_id  bigint  not null references teams (id)
);
