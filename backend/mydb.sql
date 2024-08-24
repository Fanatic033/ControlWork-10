CREATE SCHEMA studio COLLATE utf8mb4_general_ci;

USE studio;

CREATE TABLE news
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    `describe` TEXT NOT NULL,
    image      VARCHAR(255) NULL,
    created_at DATETIME DEFAULT NOW() NULL
);

CREATE TABLE comment
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    id_news INT NOT NULL,
    author  VARCHAR(255) NULL,
    message VARCHAR(255) NOT NULL,
    CONSTRAINT comment_news_id_fk
        FOREIGN KEY (id_news) REFERENCES news (id)
);

USE studio;

INSERT INTO news (title, `describe`, image, created_at)
VALUES  ('Большая новость', 'построили Кафе', NULL, '2024-08-24 13:17:29'),
        ('Ремонт дорог', 'ремонт на улицах ...', NULL, '2024-08-24 13:18:25');

insert into studio.comment (id, id_news, author, message)
values  (1, 2, 'auhor', 'Надоели'),
        (3, 1, 'аноним', 'круто');
