CREATE DATABASE providers_db;
USE providers_db;

CREATE TABLE providers (
ID INTEGER AUTO_INCREMENT,
img VARCHAR(999) NOT NULL,
name VARCHAR(100) not null,
address VARCHAR(100) not null,
description VARCHAR(300) not null,
type VARCHAR(50) not null,
capacity VARCHAR(20) not null,
budget VARCHAR(20) not null,
price INTEGER,
PRIMARY KEY (ID)
);

SELECT * FROM Providers;