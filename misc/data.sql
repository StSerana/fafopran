insert into tasks (id, condition_type, name, description, answer)
values (nextval('tasks_sequence'), 'WEB', 'Первый', null, '');

INSERT INTO public.teams
    (id, "name")
VALUES (1, 'Первая');

INSERT INTO public.teams
    (id, "name")
VALUES (2, 'Вторая');

INSERT INTO public."statistics"
    (id, team_id, task_id, attempts_count, solved, last_answer)
VALUES (gen_random_uuid(), 1, 10, 0, false, null);

INSERT INTO public."statistics"
    (id, team_id, task_id, attempts_count, solved, last_answer)
VALUES (gen_random_uuid(), 2, 10, 0, false, null);

INSERT INTO public.users
    (id, username, "password", team_id)
VALUES (1, 'test', '{noop}test', 1);


