--liquibase formatted sql

--changeset nvoxland:1
CREATE TABLE if not exists tasks
(
    id             BIGINT PRIMARY KEY,
    condition_type VARCHAR(255) not null,
    name           VARCHAR(255) NOT NULL,
    description    text,
    answer         VARCHAR      NOT NULL
);

--changeset nvoxland:2
CREATE SEQUENCE if not exists tasks_sequence
    START 10
    INCREMENT 10
    MINVALUE 10
    OWNED BY tasks.id;
