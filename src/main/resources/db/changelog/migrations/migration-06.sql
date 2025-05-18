--liquibase formatted sql

--changeset serana:task:2
alter table tasks
    add column weight int not null default 0;

