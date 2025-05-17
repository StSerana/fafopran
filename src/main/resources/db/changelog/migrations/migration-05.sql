--liquibase formatted sql

--changeset serana:attachments:1
CREATE TABLE if not exists attachments
(
    id      bigint PRIMARY KEY,
    a_type  VARCHAR not null,
    path    VARCHAR not null,
    context json    null,
    task_id bigint  not null references tasks (id)
);

--changeset serana:sequence:2
CREATE SEQUENCE if not exists fafopran_sequence
    START 1000
    INCREMENT 10
    MINVALUE 10;
