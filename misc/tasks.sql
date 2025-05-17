insert into tasks (id, condition_type, name, description, answer)
values (11, 'WEBT', 'Зал администрации', 'Сюда попадут только достойные', 'SVNBRE1JTlVOTE9DS0VE');
INSERT INTO attachments
    (id, a_type, "path", context, task_id)
VALUES (nextval('fafopran_sequence'), 'ELEMENT', 'admin', null, 11);
---

insert into tasks (id, condition_type, name, description, answer)
values (12, 'IMGR', 'Картинная галерея',
        'Только у нас вы можете ознакомиться с репродукцией знаменитой картины неизвестного автора', 'SU1BR0VS');
INSERT INTO attachments
    (id, a_type, "path", context, task_id)
VALUES (nextval('fafopran_sequence'), 'ELEMENT', 'image', null, 12);
---

insert into tasks (id, condition_type, name, description, answer)
values (13, 'GAME', 'Зал с автоматами', 'Правила простые, как в рулетке', 'FEWWORDSANDMANYDEEDS');
INSERT INTO attachments
    (id, a_type, "path", context, task_id)
VALUES (nextval('fafopran_sequence'), 'ELEMENT', 'game', null, 13);
---

