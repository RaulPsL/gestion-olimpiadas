-- ============================================================
-- ARCHIVO SQL COMPLETAMENTE ORDENADO POR DEPENDENCIAS
-- Base de datos: codecrafters
-- Todos los INSERT organizados para evitar errores de FK
-- ============================================================

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- ============================================================
-- NIVEL 0: Tablas base sin dependencias
-- ============================================================

-- 1. GRADOS (sin FK)
INSERT INTO public.grados (id, nombre) VALUES
(1, '3ro Primaria'),
(2, '4to Primaria'),
(3, '5to Primaria'),
(4, '6to Primaria'),
(5, '1ro Secundaria'),
(6, '2do Secundaria'),
(7, '3ro Secundaria'),
(8, '4to Secundaria'),
(9, '5to Secundaria'),
(10, '6to Secundaria');

-- 2. NIVELS (sin FK)
INSERT INTO public.nivels (id, nombre) VALUES
(1, '3P'),
(2, '4P'),
(3, '5P'),
(4, '6P'),
(5, '1S'),
(6, '2S'),
(7, '3S'),
(8, '4S'),
(9, '5S'),
(10, '6S'),
(11, 'Primer Nivel'),
(12, 'Segundo Nivel'),
(13, 'Tercer Nivel'),
(14, 'Cuarto Nivel'),
(15, 'Quinto Nivel'),
(16, 'Sexto Nivel'),
(17, 'Guscanayo'),
(18, 'Guanaco'),
(19, 'Locorito'),
(20, 'Jucumari'),
(21, 'Búfeo'),
(22, 'Puma'),
(23, 'Builders P'),
(24, 'Builders S'),
(25, 'Lego P'),
(26, 'Lego S');

-- 3. AREAS (sin FK)
INSERT INTO public.areas (id, nombre, sigla, descripcion, created_at, updated_at) VALUES
(1, 'ASTRONOMÍA - ASTROFÍSICA', 'AST', 'Área de astronomía y astrofísica enfocada en el estudio del universo, los cuerpos celestes y fenómenos astronómicos.', NULL, NULL),
(2, 'BIOLOGÍA', 'BIO', 'Área de biología dedicada al estudio de los seres vivos, su estructura, función, evolución y relaciones.', NULL, NULL),
(3, 'FÍSICA', 'FIS', 'Área de física enfocada en el estudio de la materia, energía y sus interacciones en el universo.', NULL, NULL),
(4, 'INFORMÁTICA', 'INF', 'Área de informática centrada en programación, algoritmos y resolución de problemas computacionales.', NULL, NULL);

-- 4. DEPARTAMENTOS (sin FK)
INSERT INTO public.departamentos (id, nombre, sigla, created_at, updated_at) VALUES
(1, 'Chuquisaca', 'CH', NULL, NULL),
(2, 'La Paz', 'LP', NULL, NULL),
(3, 'Cochabamba', 'CB', NULL, NULL),
(4, 'Oruro', 'OR', NULL, NULL),
(5, 'Potosí', 'PT', NULL, NULL),
(6, 'Tarija', 'TJ', NULL, NULL),
(7, 'Santa Cruz', 'SC', NULL, NULL),
(8, 'Beni', 'BN', NULL, NULL),
(9, 'Pando', 'PD', NULL, NULL);

-- 5. ROLS (sin FK)
INSERT INTO public.rols (id, nombre, descripcion, created_at, updated_at, sigla) VALUES
(1, 'Evaluador', 'Encargado de evaluar a los participantes', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'EVA'),
(2, 'Encargado de Área', 'Responsable de gestionar un área', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'EDA'),
(3, 'Administrador de Sistema', 'Responsable de gestionar todo el areas y usuarios.', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'ADM');

-- 6. TUTORS (sin FK - aunque puede referenciar olimpistas, la FK es opcional)
-- Nota: No hay datos de tutors en el dump original, agregamos solo una estructura vacía

-- 7. MENUS principales (sin menu_id)
INSERT INTO public.menus (id, title, url, icon, created_at, updated_at, menu_id) VALUES
(1, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(4, 'Calificaciones', '/calificaciones', 'icon-clipboard-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(7, 'Cierre de fases', '/fases/cierre de fase', 'ti ti-lock-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(8, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(12, 'Evaluadores', '/evaluadores', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(15, 'Olimpistas', '/olimpistas', 'icon-award', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(19, 'Ver acciones de evaluadores', '/acciones/evaluadores', 'icon-activity', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(20, 'Cierre de fases', '/fases/cierre de fase', 'ti ti-lock-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(21, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(23, 'Usuarios', '/usuarios', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(26, 'Ver acciones de usuarios', '/acciones/usuarios', 'icon-list-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(27, 'Ver fases finalizadas', '/fases/ver cierres', 'ti ti-adjustments-x', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL),
(28, 'Generar reportes', '/reportes/generar', 'ti ti-news', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);

-- ============================================================
-- NIVEL 1: Tablas que dependen de las del NIVEL 0
-- ============================================================

-- 8. PROVINCIAS (depende de DEPARTAMENTOS)
INSERT INTO public.provincias (id, nombre, sigla, departamento_id) VALUES
(1, 'Oropeza', 'ORP', 1),
(2, 'Azurduy', 'AZU', 1),
(3, 'Zudáñez', 'ZUD', 1),
(4, 'Tomina', 'TOM', 1),
(5, 'Hernando Siles', 'HSI', 1),
(6, 'Yamparáez', 'YAM', 1),
(7, 'Nor Cinti', 'NCI', 1),
(8, 'Sud Cinti', 'SCI', 1),
(9, 'Belisario Boeto', 'BBO', 1),
(10, 'Luis Calvo', 'LCA', 1),
(11, 'Murillo', 'MUR', 2),
(12, 'Omasuyos', 'OMA', 2),
(13, 'Pacajes', 'PAC', 2),
(14, 'Camacho', 'CAM', 2),
(15, 'Muñecas', 'MUÑ', 2),
(16, 'Larecaja', 'LAR', 2),
(17, 'Franz Tamayo', 'FTA', 2),
(18, 'Ingavi', 'ING', 2),
(19, 'Loayza', 'LOA', 2),
(20, 'Inquisivi', 'INQ', 2),
(21, 'Sud Yungas', 'SYU', 2),
(22, 'Los Andes', 'AND', 2),
(23, 'Aroma', 'ARO', 2),
(24, 'Nor Yungas', 'NYU', 2),
(25, 'Abel Iturralde', 'AIT', 2),
(26, 'Bautista Saavedra', 'BSA', 2),
(27, 'Manco Kapac', 'MKA', 2),
(28, 'Gualberto Villarroel', 'GVI', 2),
(29, 'General José Manuel Pando', 'PAN', 2),
(30, 'Caranavi', 'CRV', 2),
(31, 'Cercado', 'CER', 3),
(32, 'Arani', 'ARA', 3),
(33, 'Arque', 'ARQ', 3),
(34, 'Ayopaya', 'AYO', 3),
(35, 'Campero', 'CAM', 3),
(36, 'Capinota', 'CAP', 3),
(37, 'Carrasco', 'CRR', 3),
(38, 'Chapare', 'CHP', 3),
(39, 'Esteban Arce', 'EAR', 3),
(40, 'Germán Jordán', 'GJO', 3),
(41, 'Mizque', 'MIZ', 3),
(42, 'Punata', 'PUN', 3),
(43, 'Quillacollo', 'QUI', 3),
(44, 'Tapacarí', 'TAP', 3),
(45, 'Tiraque', 'TIR', 3),
(46, 'Bolívar', 'BOL', 3),
(47, 'Cercado', 'CER', 4),
(48, 'Abaroa', 'ABA', 4),
(49, 'Carangas', 'CRG', 4),
(50, 'Cercado', 'CER', 4),
(51, 'Eduardo Avaroa', 'EAV', 4),
(52, 'Ladislao Cabrera', 'LCA', 4),
(53, 'Litoral', 'LIT', 4),
(54, 'Nor Carangas', 'NCR', 4),
(55, 'Pantaleón Dalence', 'PDA', 4),
(56, 'Poopó', 'POO', 4),
(57, 'Sajama', 'SAJ', 4),
(58, 'San Pedro de Totora', 'SPT', 4),
(59, 'Saucarí', 'SAU', 4),
(60, 'Sebastián Pagador', 'SPA', 4),
(61, 'Sud Carangas', 'SCR', 4),
(62, 'Tomás Barrón', 'TBA', 4),
(63, 'Tomás Frías', 'TFR', 5),
(64, 'Rafael Bustillo', 'RBU', 5),
(65, 'Cornelio Saavedra', 'CSA', 5),
(66, 'Chayanta', 'CHY', 5),
(67, 'Charcas', 'CHR', 5),
(68, 'Nor Chichas', 'NCH', 5),
(69, 'Alonso de Ibáñez', 'AIB', 5),
(70, 'Sur Chichas', 'SCH', 5),
(71, 'Nor Lípez', 'NLI', 5),
(72, 'Sur Lípez', 'SLI', 5),
(73, 'José María Linares', 'JML', 5),
(74, 'Antonio Quijarro', 'AQU', 5),
(75, 'Bernardino Bilbao', 'BBI', 5),
(76, 'Daniel Campos', 'DCA', 5),
(77, 'Modesto Omiste', 'MOM', 5),
(78, 'Enrique Baldivieso', 'EBA', 5),
(79, 'Cercado', 'CER', 6),
(80, 'Aniceto Arce', 'AAR', 6),
(81, 'Gran Chaco', 'GCH', 6),
(82, 'José María Avilés', 'JMA', 6),
(83, 'Méndez', 'MEN', 6),
(84, 'Burnet O''Connor', 'BOC', 6),
(85, 'Andrés Ibáñez', 'AIB', 7),
(86, 'Warnes', 'WAR', 7),
(87, 'Velasco', 'VEL', 7),
(88, 'Ichilo', 'ICH', 7),
(89, 'Chiquitos', 'CHI', 7),
(90, 'Sara', 'SAR', 7),
(91, 'Cordillera', 'COR', 7),
(92, 'Vallegrande', 'VAL', 7),
(93, 'Florida', 'FLO', 7),
(94, 'Obispo Santistevan', 'OSA', 7),
(95, 'Ñuflo de Chávez', 'ÑCH', 7),
(96, 'Ángel Sandoval', 'ASA', 7),
(97, 'Caballero', 'CAB', 7),
(98, 'Germán Busch', 'GBU', 7),
(99, 'Guarayos', 'GUA', 7),
(100, 'Cercado', 'CER', 8),
(101, 'Vaca Díez', 'VDI', 8),
(102, 'José Ballivián', 'JBA', 8),
(103, 'Yacuma', 'YAC', 8),
(104, 'Moxos', 'MOX', 8),
(105, 'Marbán', 'MAR', 8),
(106, 'Mamoré', 'MAM', 8),
(107, 'Iténez', 'ITE', 8),
(108, 'Nicolás Suárez', 'NSU', 9),
(109, 'Manuripi', 'MAN', 9),
(110, 'Madre de Dios', 'MDD', 9),
(111, 'Abuná', 'ABU', 9),
(112, 'Federico Román', 'FRO', 9);

-- 9. NIVELES_GRADOS (depende de NIVELS y GRADOS)
INSERT INTO public.niveles_grados (id, nivel_id, grado_id, created_at, updated_at) VALUES
(1, 1, 1, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(2, 2, 2, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(3, 3, 3, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(4, 4, 4, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(5, 5, 5, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(6, 6, 6, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(7, 7, 7, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(8, 8, 8, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(9, 9, 9, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(10, 10, 10, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(11, 17, 3, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(12, 17, 4, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(13, 18, 5, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(14, 18, 6, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(15, 18, 7, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(16, 19, 5, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(17, 19, 6, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(18, 19, 7, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(19, 20, 8, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(20, 20, 9, '2025-11-01 17:18:15', '2025-11-01 17:18:15'),
(21, 20, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(22, 21, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(23, 21, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(24, 21, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(25, 22, 8, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(26, 22, 9, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(27, 22, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(28, 11, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(29, 12, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(30, 13, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(31, 14, 8, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(32, 15, 9, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(33, 16, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(34, 23, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(35, 23, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(36, 24, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(37, 24, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(38, 24, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(39, 24, 8, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(40, 24, 9, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(41, 24, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(42, 25, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(43, 25, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(44, 26, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(45, 26, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(46, 26, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(47, 26, 8, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(48, 26, 9, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(49, 26, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16');

-- 10. NIVELES_AREAS (depende de NIVELS y AREAS)
INSERT INTO public.niveles_areas (id, nivel_id, area_id, created_at, updated_at) VALUES
(1, 1, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(2, 2, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(3, 3, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(4, 4, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(5, 5, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(6, 6, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(7, 7, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(8, 8, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(9, 9, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(10, 10, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(11, 6, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(12, 7, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(13, 8, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(14, 9, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(15, 10, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(16, 8, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(17, 9, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(18, 10, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(19, 17, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(20, 18, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(21, 19, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(22, 20, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(23, 21, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(24, 22, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(25, 11, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(26, 12, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(27, 13, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(28, 14, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(29, 15, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(30, 16, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(31, 6, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(32, 7, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(33, 8, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(34, 9, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(35, 10, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(36, 23, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(37, 24, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(38, 25, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16'),
(39, 26, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16');

-- 11. MENUS con menu_id (submenús - depende de MENUS)
INSERT INTO public.menus (id, title, url, icon, created_at, updated_at, menu_id) VALUES
(2, 'Ver áreas', '/areas/ver areas', 'icon-map', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 1),
(3, 'Ver fases', '/areas/ver fases', 'icon-layers', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 1),
(5, 'Olimpistas', '/calificaciones/olimpistas', 'icon-award', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 4),
(6, 'Grupos', '/calificaciones/grupos', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 4),
(9, 'Crear