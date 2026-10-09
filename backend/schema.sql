CREATE DATABASE IF NOT EXISTS gestor_contrasena
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE gestor_contrasena;

CREATE TABLE IF NOT EXISTS baul (
    id_baul INT NOT NULL AUTO_INCREMENT,
    plataforma VARCHAR(150) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    clave VARCHAR(60) NOT NULL,
    PRIMARY KEY (id_baul)
);
