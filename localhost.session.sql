INSERT INTO rols (id, nombre, sigla, descripcion, created_at, updated_at) VALUES
(1, 'Evaluador', 'EVA', 'Encargado de evaluar a los participantes', NOW(), NOW()),
(2, 'Encargado de Área', 'EDA', 'Responsable de gestionar un área', NOW(), NOW());

INSERT INTO usuarios (id, nombre, apellido, celular, email, password, ci, created_at, updated_at) VALUES
(1, 'Carlos', 'Pérez', '70111111', 'carlos.perez@example.com', '123456', 1234561, NOW(), NOW()),
(2, 'María', 'González', '70222222', 'maria.gonzalez@example.com', '123456', 1234562, NOW(), NOW()),
(3, 'Luis', 'Rodríguez', '70333333', 'luis.rodriguez@example.com', '123456', 1234563, NOW(), NOW()),
(4, 'Ana', 'Fernández', '70444444', 'ana.fernandez@example.com', '123456', 1234564, NOW(), NOW()),
(5, 'Jorge', 'Suárez', '70555555', 'jorge.suarez@example.com', '123456', 1234565, NOW(), NOW()),
(6, 'Elena', 'Vargas', '70666666', 'elena.vargas@example.com', '123456', 1234566, NOW(), NOW()),
(7, 'Pablo', 'Castro', '70777777', 'pablo.castro@example.com', '123456', 1234567, NOW(), NOW()),
(8, 'Lucía', 'Rojas', '70888888', 'lucia.rojas@example.com', '123456', 1234568, NOW(), NOW()),
(9, 'Diego', 'Martínez', '70999999', 'diego.martinez@example.com', '123456', 1234569, NOW(), NOW()),
(10, 'Valeria', 'Mendoza', '70101010', 'valeria.mendoza@example.com', '123456', 1234570, NOW(), NOW()),
(11, 'Sofía', 'Navarro', '71111112', 'sofia.navarro@example.com', '123456', 1234571, NOW(), NOW()),
(12, 'Miguel', 'Ortega', '72222223', 'miguel.ortega@example.com', '123456', 1234572, NOW(), NOW()),
(13, 'Natalia', 'Calle', '73333334', 'natalia.calle@example.com', '123456', 1234573, NOW(), NOW()),
(14, 'Rodrigo', 'Peñaranda', '74444445', 'rodrigo.penaranda@example.com', '123456', 1234574, NOW(), NOW()),
(15, 'Camila', 'Flores', '75555556', 'camila.flores@example.com', '123456', 1234575, NOW(), NOW()),
(16, 'Martín', 'Choque', '76666667', 'martin.choque@example.com', '123456', 1234576, NOW(), NOW()),
(17, 'Paola', 'Mamani', '77777778', 'paola.mamani@example.com', '123456', 1234577, NOW(), NOW()),
(18, 'Andrés', 'Villarroel', '78888889', 'andres.villarroel@example.com', '123456', 1234578, NOW(), NOW()),
(19, 'Verónica', 'Torrez', '79999990', 'veronica.torrez@example.com', '123456', 1234579, NOW(), NOW()),
(20, 'Hernán', 'Arancibia', '70101011', 'hernan.arancibia@example.com', '123456', 1234580, NOW(), NOW());

INSERT INTO areas (id, nombre, sigla, descripcion, nivel, created_at, updated_at) VALUES
(1, 'Robótica', 'ROB', 'Área de robótica aplicada', 'primaria', NOW(), NOW()),
(2, 'Matemáticas', 'MAT', 'Resolución de problemas matemáticos', 'primaria', NOW(), NOW()),
(3, 'Física', 'FIS', 'Experimentos y teoría física', 'secundaria', NOW(), NOW()),
(4, 'Química', 'QUI', 'Laboratorio y teoría química', 'secundaria', NOW(), NOW()),
(5, 'Biología', 'BIO', 'Estudios de la vida y organismos', 'secundaria', NOW(), NOW()),
(6, 'Informática', 'INF', 'Programación y algoritmos', 'primaria', NOW(), NOW()),
(7, 'Astronomía', 'AST', 'Estudio de cuerpos celestes', 'secundaria', NOW(), NOW()),
(8, 'Electrónica', 'ELE', 'Circuitos y sistemas electrónicos', 'primaria', NOW(), NOW());

INSERT INTO tutor_academicos (id, nombre, apellidos, celular, email, ci, created_at, updated_at) VALUES
(1, 'Fernando', 'Quispe', 71111111, 'fernando.quispe@uni.edu.bo', 555001, NOW(), NOW()),
(2, 'Gabriela', 'Flores', 72222222, 'gabriela.flores@uni.edu.bo', 555002, NOW(), NOW()),
(3, 'Ramiro', 'Salazar', 73333333, 'ramiro.salazar@uni.edu.bo', 555003, NOW(), NOW()),
(4, 'Claudia', 'Mamani', 74444444, 'claudia.mamani@uni.edu.bo', 555004, NOW(), NOW()),
(5, 'Hugo', 'Cárdenas', 75555555, 'hugo.cardenas@uni.edu.bo', 555005, NOW(), NOW()),
(6, 'Patricia', 'Arce', 76666666, 'patricia.arce@uni.edu.bo', 555006, NOW(), NOW()),
(7, 'Javier', 'Choque', 77777777, 'javier.choque@uni.edu.bo', 555007, NOW(), NOW()),
(8, 'Roxana', 'Ramos', 78888888, 'roxana.ramos@uni.edu.bo', 555008, NOW(), NOW()),
(9, 'Marco', 'Alvarez', 79999999, 'marco.alvarez@uni.edu.bo', 555009, NOW(), NOW()),
(10, 'Silvia', 'Torrez', 70121212, 'silvia.torrez@uni.edu.bo', 555010, NOW(), NOW());

INSERT INTO tutors (id, nombre, referencia, created_at, updated_at) VALUES
(1, 'José López', 77389395, NOW(), NOW()),
(2, 'Marta Pérez', 79283872, NOW(), NOW()),
(3, 'Andrés Gutiérrez', 79283872, NOW(), NOW()),
(4, 'Cecilia Vargas', 79283873, NOW(), NOW()),
(5, 'Roberto Aguilar', 79283874, NOW(), NOW()),
(6, 'Daniela Castro', 79283876, NOW(), NOW()),
(7, 'Esteban Ríos', 79283877, NOW(), NOW()),
(8, 'Liliana Soto', 79283878, NOW(), NOW()),
(9, 'Gustavo Pinto', 79283879, NOW(), NOW()),
(10, 'Carla Morales', 79283880, NOW(), NOW());

INSERT INTO colegios (id, nombre, direccion, telefono, departamento, created_at, updated_at) VALUES
(1, 'Colegio San Andrés', 'Av. Busch, Santa Cruz', '3311111', 'Santa Cruz', NOW(), NOW()),
(2, 'Colegio La Salle', 'Zona Sopocachi, La Paz', '2211111', 'La Paz', NOW(), NOW()),
(3, 'Colegio Don Bosco', 'Av. América, Cochabamba', '4411111', 'Cochabamba', NOW(), NOW()),
(4, 'Colegio Cristo Rey', 'Zona Equipetrol, Santa Cruz', '3322222', 'Santa Cruz', NOW(), NOW()),
(5, 'Colegio María Auxiliadora', 'Zona Central, Tarija', '4611111', 'Tarija', NOW(), NOW()),
(6, 'Colegio Anglo Americano', 'Zona San Pedro, La Paz', '2222222', 'La Paz', NOW(), NOW()),
(7, 'Colegio Alemán', 'Av. Libertador, Sucre', '4644444', 'Chuquisaca', NOW(), NOW()),
(8, 'Colegio Santa Ana', 'Zona Sur, Oruro', '5252525', 'Oruro', NOW(), NOW()),
(9, 'Colegio Bolivariano', 'Zona Villa Montes', '3899999', 'Pando', NOW(), NOW()),
(10, 'Colegio Católico San José', 'Zona Trinidad', '3222222', 'Beni', NOW(), NOW()),
(11, 'Colegio San Francisco', 'Av. Túpac Katari', '2622222', 'La Paz', NOW(), NOW()),
(12, 'Colegio Nacional Junín', 'Calle Bolívar', '4623333', 'Potosí', NOW(), NOW()),
(13, 'Colegio San Vicente', 'Zona Central', '3721111', 'Pando', NOW(), NOW()),
(14, 'Colegio Instituto Americano', 'Av. Ballivián', '2229999', 'La Paz', NOW(), NOW()),
(15, 'Colegio Santa Teresa', 'Zona Sopocachi', '2233333', 'La Paz', NOW(), NOW()),
(16, 'Colegio Loyola', 'Av. Ayacucho', '4432222', 'Cochabamba', NOW(), NOW()),
(17, 'Colegio Adventista', 'Zona Norte', '3324444', 'Santa Cruz', NOW(), NOW()),
(18, 'Colegio San Luis', 'Zona La Pampa', '4645555', 'Chuquisaca', NOW(), NOW()),
(19, 'Colegio Antonio José de Sucre', 'Zona Ferroviaria', '5277777', 'Oruro', NOW(), NOW()),
(20, 'Colegio Villa Montes', 'Av. Central', '4638888', 'Tarija', NOW(), NOW());


INSERT INTO usuario_rols (usuario_id, rol_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
(11, 1), (12, 1), (13, 1), (14, 1), (15, 1),
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2),
(16, 2), (17, 2), (18, 2), (19, 2), (20, 2);

INSERT INTO usuario_areas (usuario_id, area_id) VALUES
(6, 1), (6, 6),
(7, 2),
(8, 3), (8, 7),
(9, 4), (9, 5),
(10, 8),
(16, 1), (16, 2),
(17, 5), (17, 6),
(18, 4), (18, 3),
(19, 7), (19, 8),
(20, 1), (20, 2), (20, 3), (20, 4), (20, 5), (20, 6), (20, 7), (20, 8);

INSERT INTO usuario_rols (usuario_id, rol_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2);

INSERT INTO grupos (id, nombre, tutor_academico_id, colegio_id, created_at, updated_at) VALUES
(1, 'Grupo Alfa', 1, 1, NOW(), NOW()),
(2, 'Grupo Beta', 2, 2, NOW(), NOW()),
(3, 'Grupo Gamma', 3, 3, NOW(), NOW()),
(4, 'Grupo Delta', 4, 4, NOW(), NOW()),
(5, 'Grupo Épsilon', 5, 5, NOW(), NOW()),
(6, 'Grupo Zeta', 6, 6, NOW(), NOW()),
(7, 'Grupo Eta', 7, 7, NOW(), NOW()),
(8, 'Grupo Theta', 8, 8, NOW(), NOW()),
(9, 'Grupo Iota', 9, 9, NOW(), NOW()),
(10, 'Grupo Kappa', 10, 10, NOW(), NOW());

INSERT INTO fases (id, area_id, tipo_fase, sigla, descripcion, cantidad_max_participantes, cantidad_min_participantes, estado, fecha_inicio, fecha_fin, created_at, updated_at) VALUES
(1, 1, 'preliminales', 'ROBPRE1', 'Preliminar de Robótica', 100, 10, 'en curso', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
(2, 1, 'clasificatorias', 'ROBCLA1', 'Clasificatoria 1 de Robótica', 50, 5, 'en curso', NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', NOW(), NOW()),
(3, 1, 'clasificatorias', 'ROBCLA2', 'Clasificatoria 2 de Robótica', 40, 5, 'en curso', NOW() + INTERVAL '16 days', NOW() + INTERVAL '23 days', NOW(), NOW()),
(4, 1, 'finales', 'ROBFIN1', 'Final de Robótica', 20, 3, 'pendiente', NOW() + INTERVAL '24 days', NOW() + INTERVAL '30 days', NOW(), NOW()),
(5, 2, 'preliminales', 'MATPRE1', 'Preliminar de Matemáticas', 200, 20, 'en curso', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
(6, 2, 'clasificatorias', 'MATCLA1', 'Clasificatoria de Matemáticas', 100, 10, 'en curso', NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', NOW(), NOW()),
(7, 2, 'finales', 'MATFIN1', 'Final de Matemáticas', 30, 5, 'pendiente', NOW() + INTERVAL '16 days', NOW() + INTERVAL '20 days', NOW(), NOW()),
(8, 3, 'preliminales', 'FISPRE1', 'Preliminar de Física', 150, 15, 'en curso', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
(9, 3, 'clasificatorias', 'FISCLA1', 'Clasificatoria de Física', 80, 8, 'en curso', NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', NOW(), NOW()),
(10, 3, 'finales', 'FISFIN1', 'Final de Física', 25, 4, 'pendiente', NOW() + INTERVAL '16 days', NOW() + INTERVAL '20 days', NOW(), NOW()),
(11, 4, 'preliminales', 'QUIPRE1', 'Preliminar de Química', 120, 12, 'en curso', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
(12, 4, 'clasificatorias', 'QUICLA1', 'Clasificatoria de Química', 60, 6, 'en curso', NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', NOW(), NOW()),
(13, 4, 'finales', 'QUIFIN1', 'Final de Química', 20, 3, 'pendiente', NOW() + INTERVAL '16 days', NOW() + INTERVAL '20 days', NOW(), NOW()),
(14, 5, 'preliminales', 'BIOPRE1', 'Preliminar de Biología', 130, 13, 'en curso', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
(15, 5, 'clasificatorias', 'BIOCLA1', 'Clasificatoria de Biología', 70, 7, 'en curso', NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', NOW(), NOW()),
(16, 5, 'finales', 'BIOFIN1', 'Final de Biología', 20, 3, 'pendiente', NOW() + INTERVAL '16 days', NOW() + INTERVAL '20 days', NOW(), NOW()),
(17, 6, 'preliminales', 'INFPRE1', 'Preliminar de Informática', 150, 15, 'en curso', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
(18, 6, 'clasificatorias', 'INFCLA1', 'Clasificatoria de Informática', 90, 9, 'en curso', NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', NOW(), NOW()),
(19, 6, 'finales', 'INFFIN1', 'Final de Informática', 25, 5, 'pendiente', NOW() + INTERVAL '16 days', NOW() + INTERVAL '20 days', NOW(), NOW()),
(20, 7, 'preliminales', 'ASTPRE1', 'Preliminar de Astronomía', 80, 8, 'en curso', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
(21, 7, 'clasificatorias', 'ASTCLA1', 'Clasificatoria de Astronomía', 50, 5, 'en curso', NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', NOW(), NOW()),
(22, 7, 'finales', 'ASTFIN1', 'Final de Astronomía', 15, 3, 'pendiente', NOW() + INTERVAL '16 days', NOW() + INTERVAL '20 days', NOW(), NOW()),
(23, 8, 'preliminales', 'ELEPRE1', 'Preliminar de Electrónica', 100, 10, 'en curso', NOW(), NOW() + INTERVAL '7 days', NOW(), NOW()),
(24, 8, 'clasificatorias', 'ELECLA1', 'Clasificatoria de Electrónica', 60, 6, 'en curso', NOW() + INTERVAL '8 days', NOW() + INTERVAL '15 days', NOW(), NOW()),
(25, 8, 'finales', 'ELEFIN1', 'Final de Electrónica', 18, 3, 'pendiente', NOW() + INTERVAL '16 days', NOW() + INTERVAL '20 days', NOW(), NOW());

INSERT INTO usuario_areas (usuario_id, area_id) VALUES
(1, 2), (2, 3), (3, 4), (4, 5), (5, 6),
(11, 1), (12, 7), (13, 8), (14, 2), (15, 6);

INSERT INTO usuario_fases (usuario_id, fase_id) VALUES
(1, 5), (1, 6), (1, 7),
(2, 8), (2, 9), (2, 10),
(3, 11), (3, 12), (3, 13),
(4, 14), (4, 15), (4, 16),
(5, 17), (5, 18), (5, 19),
(11, 1), (11, 2), (11, 3), (11, 4),
(12, 20), (12, 21), (12, 22),
(13, 23), (13, 24), (13, 25),
(14, 5), (14, 6), (14, 7),
(15, 17), (15, 18), (15, 19);

INSERT INTO olimpistas (id, nombres, apellido_paterno, apellido_materno, ci, celular, grado_escolar, nivel_escolar, estado, colegio_id, tutor_id, created_at, updated_at) VALUES
(1, 'Juan', 'López', 'García', 700001, 71111111, 'primero', 'primaria', 'activo', 1, 1, NOW(), NOW()),
(2, 'María', 'Pérez', 'Quispe', 700002, 72222222, 'segundo', 'primaria', 'activo', 2, 2, NOW(), NOW()),
(3, 'Luis', 'Gonzales', 'Torrez', 700003, 73333333, 'tercero', 'primaria', 'activo', 3, 3, NOW(), NOW()),
(4, 'Ana', 'Vargas', 'Rojas', 700004, 74444444, 'cuarto', 'primaria', 'activo', 4, 4, NOW(), NOW()),
(5, 'Pedro', 'Suárez', 'Flores', 700005, 75555555, 'quinto', 'primaria', 'activo', 5, 5, NOW(), NOW()),
(6, 'Lucía', 'Martínez', 'Mamani', 700006, 76666666, 'sexto', 'primaria', 'activo', 6, 6, NOW(), NOW()),
(7, 'Diego', 'Fernández', 'Choque', 700007, 77777777, 'primero', 'primaria', 'activo', 7, 7, NOW(), NOW()),
(8, 'Valeria', 'Castro', 'Ramos', 700008, 78888888, 'segundo', 'primaria', 'activo', 8, 8, NOW(), NOW()),
(9, 'Jorge', 'Mendoza', 'Alvarez', 700009, 79999999, 'tercero', 'primaria', 'activo', 9, 9, NOW(), NOW()),
(10, 'Camila', 'Rojas', 'Cárdenas', 700010, 70101010, 'cuarto', 'primaria', 'activo', 10, 10, NOW(), NOW()),
(11, 'Andrés', 'Quispe', 'Salazar', 700011, 70111112, 'quinto', 'primaria', 'activo', 11, 1, NOW(), NOW()),
(12, 'Paola', 'Gutiérrez', 'Torrez', 700012, 72222223, 'sexto', 'primaria', 'activo', 12, 2, NOW(), NOW()),
(13, 'Sofía', 'Flores', 'Mamani', 700013, 73333334, 'primero', 'primaria', 'activo', 13, 3, NOW(), NOW()),
(14, 'Hernán', 'Rojas', 'Choque', 700014, 74444445, 'segundo', 'primaria', 'activo', 14, 4, NOW(), NOW()),
(15, 'Gabriela', 'Martínez', 'Quispe', 700015, 75555556, 'tercero', 'primaria', 'activo', 15, 5, NOW(), NOW()),
(16, 'Rodrigo', 'Suárez', 'García', 700016, 76666667, 'cuarto', 'primaria', 'activo', 16, 6, NOW(), NOW()),
(17, 'Claudia', 'Vargas', 'Pinto', 700017, 77777778, 'quinto', 'primaria', 'activo', 17, 7, NOW(), NOW()),
(18, 'Martín', 'Mamani', 'Alvarez', 700018, 78888889, 'sexto', 'primaria', 'activo', 18, 8, NOW(), NOW()),
(19, 'Patricia', 'Cárdenas', 'Salazar', 700019, 79999990, 'primero', 'primaria', 'activo', 19, 9, NOW(), NOW()),
(20, 'Javier', 'Choque', 'Torrez', 700020, 70101011, 'segundo', 'primaria', 'activo', 20, 10, NOW(), NOW()),
(21, 'Elena', 'Alvarez', 'Ramos', 700021, 70111113, 'tercero', 'primaria', 'activo', 1, 1, NOW(), NOW()),
(22, 'Marco', 'García', 'Flores', 700022, 72222224, 'cuarto', 'primaria', 'activo', 2, 2, NOW(), NOW()),
(23, 'Natalia', 'Torrez', 'Mamani', 700023, 73333335, 'quinto', 'primaria', 'activo', 3, 3, NOW(), NOW()),
(24, 'Esteban', 'Pinto', 'Rojas', 700024, 74444446, 'sexto', 'primaria', 'activo', 4, 4, NOW(), NOW()),
(25, 'Silvia', 'Ramos', 'García', 700025, 75555557, 'primero', 'primaria', 'activo', 5, 5, NOW(), NOW()),
(26, 'Fernando', 'Flores', 'Salazar', 700026, 76666668, 'segundo', 'primaria', 'activo', 6, 6, NOW(), NOW()),
(27, 'Roxana', 'García', 'Torrez', 700027, 77777779, 'tercero', 'primaria', 'activo', 7, 7, NOW(), NOW()),
(28, 'Gustavo', 'Quispe', 'Choque', 700028, 78888880, 'cuarto', 'primaria', 'activo', 8, 8, NOW(), NOW()),
(29, 'Liliana', 'Martínez', 'Vargas', 700029, 79999991, 'quinto', 'primaria', 'activo', 9, 9, NOW(), NOW()),
(30, 'Hugo', 'Suárez', 'Pinto', 700030, 70101012, 'sexto', 'primaria', 'activo', 10, 10, NOW(), NOW()),

(31, 'Carla', 'Rojas', 'Alvarez', 700031, 70111114, 'primero', 'secundaria', 'activo', 11, 1, NOW(), NOW()),
(32, 'Daniel', 'Vargas', 'Choque', 700032, 72222225, 'segundo', 'secundaria', 'activo', 12, 2, NOW(), NOW()),
(33, 'Verónica', 'Mamani', 'Flores', 700033, 73333336, 'tercero', 'secundaria', 'activo', 13, 3, NOW(), NOW()),
(34, 'Miguel', 'Torrez', 'Pinto', 700034, 74444447, 'cuarto', 'secundaria', 'activo', 14, 4, NOW(), NOW()),
(35, 'Clara', 'Alvarez', 'García', 700035, 75555558, 'quinto', 'secundaria', 'activo', 15, 5, NOW(), NOW()),
(36, 'Oscar', 'Quispe', 'Salazar', 700036, 76666669, 'sexto', 'secundaria', 'activo', 16, 6, NOW(), NOW()),
(37, 'Sandra', 'Martínez', 'Vargas', 700037, 77777780, 'primero', 'secundaria', 'activo', 17, 7, NOW(), NOW()),
(38, 'Hernán', 'Pérez', 'Rojas', 700038, 78888881, 'segundo', 'secundaria', 'activo', 18, 8, NOW(), NOW()),
(39, 'Andrea', 'Gonzales', 'Mamani', 700039, 79999992, 'tercero', 'secundaria', 'activo', 19, 9, NOW(), NOW()),
(40, 'Raúl', 'Suárez', 'Choque', 700040, 70101013, 'cuarto', 'secundaria', 'activo', 20, 10, NOW(), NOW()),
(41, 'Laura', 'Vargas', 'Flores', 700041, 70111115, 'quinto', 'secundaria', 'activo', 1, 1, NOW(), NOW()),
(42, 'Jhonny', 'Rojas', 'Salazar', 700042, 72222226, 'sexto', 'secundaria', 'activo', 2, 2, NOW(), NOW()),
(43, 'Paola', 'Mamani', 'Choque', 700043, 73333337, 'primero', 'secundaria', 'activo', 3, 3, NOW(), NOW()),
(44, 'Rodrigo', 'Quispe', 'Torrez', 700044, 74444448, 'segundo', 'secundaria', 'activo', 4, 4, NOW(), NOW()),
(45, 'Valentina', 'García', 'Alvarez', 700045, 75555559, 'tercero', 'secundaria', 'activo', 5, 5, NOW(), NOW()),
(46, 'Cristian', 'Cárdenas', 'Flores', 700046, 76666670, 'cuarto', 'secundaria', 'activo', 6, 6, NOW(), NOW()),
(47, 'Mónica', 'Ramos', 'Choque', 700047, 77777781, 'quinto', 'secundaria', 'activo', 7, 7, NOW(), NOW()),
(48, 'Kevin', 'Torrez', 'Mamani', 700048, 78888882, 'sexto', 'secundaria', 'activo', 8, 8, NOW(), NOW()),
(49, 'Julia', 'Flores', 'Pinto', 700049, 79999993, 'primero', 'secundaria', 'activo', 9, 9, NOW(), NOW()),
(50, 'David', 'Martínez', 'García', 700050, 70101014, 'segundo', 'secundaria', 'activo', 10, 10, NOW(), NOW()),
(51, 'Teresa', 'Salazar', 'Quispe', 700051, 70111116, 'tercero', 'secundaria', 'activo', 11, 1, NOW(), NOW()),
(52, 'Marcos', 'Rojas', 'Vargas', 700052, 72222227, 'cuarto', 'secundaria', 'activo', 12, 2, NOW(), NOW()),
(53, 'Adriana', 'Choque', 'Flores', 700053, 73333338, 'quinto', 'secundaria', 'activo', 13, 3, NOW(), NOW()),
(54, 'Pablo', 'Mamani', 'Torrez', 700054, 74444449, 'sexto', 'secundaria', 'activo', 14, 4, NOW(), NOW()),
(55, 'Tatiana', 'García', 'Alvarez', 700055, 75555560, 'primero', 'secundaria', 'activo', 15, 5, NOW(), NOW()),
(56, 'Sergio', 'Quispe', 'Ramos', 700056, 76666671, 'segundo', 'secundaria', 'activo', 16, 6, NOW(), NOW()),
(57, 'Martha', 'Salazar', 'Choque', 700057, 77777782, 'tercero', 'secundaria', 'activo', 17, 7, NOW(), NOW()),
(58, 'Iván', 'Torrez', 'Pinto', 700058, 78888883, 'cuarto', 'secundaria', 'activo', 18, 8, NOW(), NOW()),
(59, 'Ximena', 'Flores', 'Mamani', 700059, 79999994, 'quinto', 'secundaria', 'activo', 19, 9, NOW(), NOW()),
(60, 'Álvaro', 'Martínez', 'Rojas', 700060, 70101015, 'sexto', 'secundaria', 'activo', 20, 10, NOW(), NOW());

INSERT INTO olimpista_grupos (olimpista_id, grupo_id) VALUES
(1, 1), (7, 1), (21, 1),
(2, 2), (8, 2),
(3, 3), (13, 3), (23, 3),
(4, 4), (14, 4),
(5, 5), (15, 5), (25, 5),
(6, 6), (16, 6),
(31, 7), (37, 7), (41, 7),
(32, 8), (38, 8),
(33, 9), (43, 9), (49, 9),
(34, 10), (44, 10);

INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(1, 1), (2, 1), (31, 1), (32, 1), (33, 1),
(3, 2), (4, 2), (34, 2), (35, 2), (36, 2),
(5, 3), (6, 3), (37, 3), (38, 3), (39, 3),
(7, 4), (8, 4), (40, 4), (41, 4), (42, 4),
(9, 5), (10, 5), (43, 5), (44, 5), (45, 5),
(11, 6), (12, 6), (46, 6), (47, 6), (48, 6),
(13, 7), (14, 7), (49, 7), (50, 7), (51, 7),
(15, 8), (16, 8), (52, 8), (53, 8), (54, 8),

(21, 2), (21, 6), 
(31, 3), (31, 7), 
(41, 1), (41, 5), 
(33, 6), (33, 8), 
(49, 2), (49, 4); 

INSERT INTO tutor_academico_olimpistas (tutor_academico_id, olimpista_id) VALUES
(1, 1), (1, 7),
(2, 2), (2, 8),
(3, 3), (3, 13),
(4, 4), (4, 14),
(5, 5), (5, 15),

(6, 31), (6, 37),
(7, 32), (7, 38),
(8, 33), (8, 43),
(9, 34), (9, 44),
(10, 35), (10, 45),

(1, 21), (2, 21),
(6, 41), (7, 41),
(8, 33), (10, 33);


INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(17, 1), (18, 1), (19, 1), (20, 1);

INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(22, 2), (24, 2), (26, 2), (28, 2);

INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(29, 3), (30, 3), (36, 3), (39, 3);

INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(40, 4), (42, 4), (47, 4), (48, 4);

INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(53, 5), (54, 5), (55, 5), (56, 5);

INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(57, 6), (58, 6), (59, 6), (60, 6);

INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(27, 7), (35, 7), (44, 7), (50, 7);

INSERT INTO olimpista_areas (olimpista_id, area_id) VALUES
(25, 8), (38, 8), (45, 8), (52, 8);

INSERT INTO calificaciones (puntaje, comentarios, olimpista_id, fase_id, created_at, updated_at)
SELECT 
    0.00 AS puntaje,
    '' AS comentarios,
    oa.olimpista_id,
    f.id AS fase_id,
    NOW(),
    NOW()
FROM olimpista_areas oa
JOIN fases f ON f.area_id = oa.area_id
WHERE f.tipo_fase = 'preliminares';

INSERT INTO grupo_areas (grupo_id, area_id)
SELECT DISTINCT og.grupo_id, oa.area_id
FROM olimpista_grupos og
JOIN olimpista_areas oa ON oa.olimpista_id = og.olimpista_id
ON CONFLICT DO NOTHING;

INSERT INTO calificacion_grupos (puntaje, comentarios, grupo_id, fase_id, created_at, updated_at)
SELECT 
    0.00 AS puntaje,
    '' AS comentarios,
    ga.grupo_id,
    f.id AS fase_id,
    NOW(),
    NOW()
FROM grupo_areas ga
JOIN fases f ON f.area_id = ga.area_id
WHERE f.tipo_fase = 'preliminares';

SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));
SELECT setval('olimpistas_id_seq', (SELECT MAX(id) FROM olimpistas));
SELECT setval('tutors_id_seq', (SELECT MAX(id) FROM tutors));
SELECT setval('tutor_academicos_id_seq', (SELECT MAX(id) FROM tutor_academicos));
SELECT setval('colegios_id_seq', (SELECT MAX(id) FROM colegios));
SELECT setval('grupos_id_seq', (SELECT MAX(id) FROM grupos));
SELECT setval('areas_id_seq', (SELECT MAX(id) FROM areas));
SELECT setval('fases_id_seq', (SELECT MAX(id) FROM fases));
SELECT setval('rols_id_seq', (SELECT MAX(id) FROM rols));
SELECT setval('menus_id_seq', (SELECT MAX(id) FROM menus));
SELECT setval('calificacions_id_seq', (SELECT MAX(id) FROM calificacions));
SELECT setval('usuario_rols_id_seq', (SELECT MAX(id) FROM usuario_rols));
SELECT setval('usuario_areas_id_seq', (SELECT MAX(id) FROM usuario_areas));
SELECT setval('usuario_fases_id_seq', (SELECT MAX(id) FROM usuario_fases));
SELECT setval('tutor_academico_olimpistas_id_seq', (SELECT MAX(id) FROM tutor_academico_olimpistas));
SELECT setval('olimpista_areas_id_seq', (SELECT MAX(id) FROM olimpista_areas));
SELECT setval('olimpista_grupos_id_seq', (SELECT MAX(id) FROM olimpista_grupos));
SELECT setval('grupo_areas_id_seq', (SELECT MAX(id) FROM grupo_areas));
SELECT setval('rol_menus_id_seq', (SELECT MAX(id) FROM rol_menus));
SELECT setval('calificacion_grupos_id_seq', (SELECT MAX(id) FROM calificacion_grupos));
SELECT setval('personal_access_tokens_id_seq', (SELECT MAX(id) FROM personal_access_tokens));
SELECT setval('failed_jobs_id_seq', (SELECT MAX(id) FROM failed_jobs));
SELECT setval('log_data_id_seq', (SELECT MAX(id) FROM log_data));
SELECT setval('migrations_id_seq', (SELECT MAX(id) FROM migrations));