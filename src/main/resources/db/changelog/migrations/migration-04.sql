--liquibase formatted sql

--changeset serana:session:1
CREATE TABLE if not exists sessions
(
    id         uuid PRIMARY KEY,
    version    bigint default 0,
    username   VARCHAR   not null,
    created_at timestamp not null,
    expires_at timestamp not null
);
