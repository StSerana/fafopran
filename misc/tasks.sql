INSERT INTO tasks(id, condition_type, "name", description, answer, weight)
VALUES (10, 'STEGANO', 'Задача №0', 'flag-{U1RFR0FOTw==10qwerty}', 'qwerty', 10);
---

insert into tasks (id, condition_type, name, description, answer, weight)
values (11, 'WEBT', 'Зал администрации', 'Сюда попадут только достойные', 'SVNBRE1JTlVOTE9DS0VE', 50);
INSERT INTO attachments
    (id, a_type, "path", context, task_id)
VALUES (nextval('fafopran_sequence'), 'ELEMENT', 'admin', null, 11);
---

insert into tasks (id, condition_type, name, description, answer, weight)
values (12, 'IMGR', 'Картинная галерея',
        'Только у нас вы можете ознакомиться с репродукцией знаменитой картины неизвестного автора', 'SU1BR0VS', 20);
INSERT INTO attachments
    (id, a_type, "path", context, task_id)
VALUES (nextval('fafopran_sequence'), 'ELEMENT', 'image', null, 12);
---

insert into tasks (id, condition_type, name, description, answer, weight)
values (13, 'GAME', 'Зал с автоматами', 'Правила простые, как в рулетке', 'FEWWORDSANDMANYDEEDS', 20);
INSERT INTO attachments
    (id, a_type, "path", context, task_id)
VALUES (nextval('fafopran_sequence'), 'ELEMENT', 'game', null, 13);
---

insert into tasks (id, condition_type, name, description, answer, weight)
values (14, 'STEGANO', 'На барахолке',
        'У всех такой был, все умеют пользоваться: flag-{U1RFR0FOTw==14<44-2-222-55-6-33>}', 'hackme', 20);
INSERT INTO attachments
    (id, a_type, "path", context, task_id)
VALUES (nextval('fafopran_sequence'), 'LINK',
        'https://www.ozon.ru/product/nokia-mobilnyy-telefon-nokia-3310-movistar-polnyy-komplekt-proizvodstvo-finlyandiya-1915153846/?at=6WtZ6ZMRXFkAVY46TZE5jonf2KJ2oMsZPKW3jcLqJGWM',
        null, 14);
---

insert into tasks (id, condition_type, name, description, answer, weight)
values (15, 'CRYPTO', 'Дарья Донцова',
        'Пиратить книги плохо и сборников Донцовой не будет, но у меня для вас есть кое-что другое', 'strange', 30);
INSERT INTO attachments
    (id, a_type, "path", context, task_id)
VALUES (nextval('fafopran_sequence'), 'FILE',
        'https://drive.google.com/file/d/1HTkuMdRH6obhG7-neD2Ikdt65ZDt4QyZ/view?usp=sharing', null, 15);
---

