DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS salas;
DROP TABLE IF EXISTS equipos;
DROP TABLE IF EXISTS eventos;

CREATE TABLE usuarios (
	id_user SERIAL PRIMARY KEY,
    nombre_user VARCHAR(30) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE, 
    password VARCHAR(100) NOT NULL,
	admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE salas (
	id_ubicacion SERIAL PRIMARY KEY,
	nombre_sala VARCHAR(30) NOT NULL,
	id_lit VARCHAR(15) NOT NULL UNIQUE,
	id_psbb VARCHAR(15) NOT NULL UNIQUE,
	id_gen VARCHAR(15) NOT NULL UNIQUE,
	ubicacion_map VARCHAR(100)
);

CREATE TABLE equipos (
	id_equipo SERIAL PRIMARY KEY,
	id_ubicacion INT NOT NULL REFERENCES salas(id_ubicacion),
	nombre_equipo VARCHAR(30) NOT NULL, 
	dato INT,
	estado BOOLEAN,
	timestamp DATE
);

CREATE TABLE eventos (
	id_evento SERIAL PRIMARY KEY,
	usuario INT NOT NULL REFERENCES usuarios(id_user),
	id_ubicacion INT NOT NULL REFERENCES salas(id_ubicacion),
	tipo_registro VARCHAR(80) NOT NULL, 
	descripcion VARCHAR(300) NOT NULL,
	imagen VARCHAR(100),
	fecha DATE NOT NULL
);

--poblar tablas:

INSERT INTO usuarios(nombre_user, email, password, admin)
VALUES ('admin', 'admin@email.com', 'admin', true)
	
INSERT INTO salas(nombre_sala, id_lit, id_psbb, id_gen, ubicacion_map)					
VALUES ('La Vara', 'lit1','psbb1','gen1', 'https://goo.gl/maps/enYdnTPspVU73jAz9'),
('Lo Blanco', 'lit2','psbb2','gen2', 'https://goo.gl/maps/KTaBpPiQrQNvDrYD8');	
				
INSERT INTO equipos(id_ubicacion, nombre_equipo, dato, estado, tiemstamp)					
VALUES (1, 'nivel_s1', 10, true, '2022-01-4 18:30:00-03'),
(1, 'bomba_s1', 0, false, '2022-01-4 18:30:00-03'),	
(1, 'generador_s1', 3, true, '2022-01-4 18:30:00-03'),
(1, 'nivel_s1', 10, true, '2022-01-4 18:40:00-03'),
(1, 'bomba_s1', 0, false, '2022-01-4 18:40:00-03'),	
(1, 'generador_s1', 3, true, '2022-01-4 18:40:00-03'),
(1, 'nivel_s1', 10, true, '2022-01-4 18:50:00-03'),
(1, 'bomba_s1', 0, false, '2022-01-4 18:50:00-03'),	
(1, 'generador_s1', 3, true, '2022-01-4 18:50:00-03'),
(1, 'nivel_s1', 10, true, '2022-01-4 19:00:00-03'),
(1, 'bomba_s1', 0, false, '2022-01-4 19:00:00-03'),	
(1, 'generador_s1', 3, true, '2022-01-4 19:00:00-03');

INSERT INTO eventos(usuario, id_ubicacion, tipo_registro, descripcion, imagen, fecha)					
VALUES (2, 1, 'falla equipamiento', 'sensor de nivel en mal estado', 'foto.jpg', CURRENT_TIMESTAMP),
(2, 2, 'robo', 'se robaron el cable de antena exterior de la sala', 'foto.jpg', CURRENT_TIMESTAMP)