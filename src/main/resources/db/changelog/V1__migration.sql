--liquibase formatted sql
--changeset nvoxland:1
--comment test_schema is added
CREATE TABLE tasks
(
    id             BIGINT PRIMARY KEY,
    condition_type VARCHAR(255) not null,
    name           VARCHAR(255) NOT NULL,
    description    text,
    answer         VARCHAR      NOT NULL
);

--changeset nvoxland:2
CREATE SEQUENCE tasks_sequence
    START 10
    INCREMENT 10
    MINVALUE 10
    OWNED BY tasks.id;
