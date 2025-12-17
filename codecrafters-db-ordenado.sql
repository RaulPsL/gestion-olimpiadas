-- ============================================================
-- ARCHIVO SQL ORDENADO POR DEPENDENCIAS
-- Base de datos: codecrafters
-- Orden de tablas para inserción sin errores de FK
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
-- NIVEL 0: Tablas sin dependencias (tablas base/catálogos)
-- ============================================================

-- 1. GRADOS
INSERT INTO public.grados VALUES (1, '3ro Primaria');
INSERT INTO public.grados VALUES (2, '4to Primaria');
INSERT INTO public.grados VALUES (3, '5to Primaria');
INSERT INTO public.grados VALUES (4, '6to Primaria');
INSERT INTO public.grados VALUES (5, '1ro Secundaria');
INSERT INTO public.grados VALUES (6, '2do Secundaria');
INSERT INTO public.grados VALUES (7, '3ro Secundaria');
INSERT INTO public.grados VALUES (8, '4to Secundaria');
INSERT INTO public.grados VALUES (9, '5to Secundaria');
INSERT INTO public.grados VALUES (10, '6to Secundaria');

-- 2. NIVELS (Niveles educativos)
INSERT INTO public.nivels VALUES (1, '3P');
INSERT INTO public.nivels VALUES (2, '4P');
INSERT INTO public.nivels VALUES (3, '5P');
INSERT INTO public.nivels VALUES (4, '6P');
INSERT INTO public.nivels VALUES (5, '1S');
INSERT INTO public.nivels VALUES (6, '2S');
INSERT INTO public.nivels VALUES (7, '3S');
INSERT INTO public.nivels VALUES (8, '4S');
INSERT INTO public.nivels VALUES (9, '5S');
INSERT INTO public.nivels VALUES (10, '6S');
INSERT INTO public.nivels VALUES (11, 'Primer Nivel');
INSERT INTO public.nivels VALUES (12, 'Segundo Nivel');
INSERT INTO public.nivels VALUES (13, 'Tercer Nivel');
INSERT INTO public.nivels VALUES (14, 'Cuarto Nivel');
INSERT INTO public.nivels VALUES (15, 'Quinto Nivel');
INSERT INTO public.nivels VALUES (16, 'Sexto Nivel');
INSERT INTO public.nivels VALUES (17, 'Guscanayo');
INSERT INTO public.nivels VALUES (18, 'Guanaco');
INSERT INTO public.nivels VALUES (19, 'Locorito');
INSERT INTO public.nivels VALUES (20, 'Jucumari');
INSERT INTO public.nivels VALUES (21, 'Búfeo');
INSERT INTO public.nivels VALUES (22, 'Puma');
INSERT INTO public.nivels VALUES (23, 'Builders P');
INSERT INTO public.nivels VALUES (24, 'Builders S');
INSERT INTO public.nivels VALUES (25, 'Lego P');
INSERT INTO public.nivels VALUES (26, 'Lego S');

-- 3. AREAS
INSERT INTO public.areas VALUES (1, 'ASTRONOMÍA - ASTROFÍSICA', 'AST', 'Área de astronomía y astrofísica enfocada en el estudio del universo, los cuerpos celestes y fenómenos astronómicos.', NULL, NULL);
INSERT INTO public.areas VALUES (2, 'BIOLOGÍA', 'BIO', 'Área de biología dedicada al estudio de los seres vivos, su estructura, función, evolución y relaciones.', NULL, NULL);
INSERT INTO public.areas VALUES (3, 'FÍSICA', 'FIS', 'Área de física enfocada en el estudio de la materia, energía y sus interacciones en el universo.', NULL, NULL);
INSERT INTO public.areas VALUES (4, 'INFORMÁTICA', 'INF', 'Área de informática centrada en programación, algoritmos y resolución de problemas computacionales.', NULL, NULL);

-- 4. DEPARTAMENTOS
INSERT INTO public.departamentos VALUES (1, 'Chuquisaca', 'CH', NULL, NULL);
INSERT INTO public.departamentos VALUES (2, 'La Paz', 'LP', NULL, NULL);
INSERT INTO public.departamentos VALUES (3, 'Cochabamba', 'CB', NULL, NULL);
INSERT INTO public.departamentos VALUES (4, 'Oruro', 'OR', NULL, NULL);
INSERT INTO public.departamentos VALUES (5, 'Potosí', 'PT', NULL, NULL);
INSERT INTO public.departamentos VALUES (6, 'Tarija', 'TJ', NULL, NULL);
INSERT INTO public.departamentos VALUES (7, 'Santa Cruz', 'SC', NULL, NULL);
INSERT INTO public.departamentos VALUES (8, 'Beni', 'BN', NULL, NULL);
INSERT INTO public.departamentos VALUES (9, 'Pando', 'PD', NULL, NULL);

-- 5. ROLS
INSERT INTO public.rols VALUES (1, 'Evaluador', 'Encargado de evaluar a los participantes', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'EVA');
INSERT INTO public.rols VALUES (2, 'Encargado de Área', 'Responsable de gestionar un área', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'EDA');
INSERT INTO public.rols VALUES (3, 'Administrador de Sistema', 'Responsable de gestionar todo el areas y usuarios.', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'ADM');

-- 6. TUTORS
INSERT INTO public.tutors VALUES (1, 'Juan', 'Pérez García', 70123456, 'juan.perez@example.com', 1234567, '2025-11-01 17:18:14', '2025-11-01 17:18:14');
INSERT INTO public.tutors VALUES (2, 'María', 'López Rodríguez', 71234567, 'maria.lopez@example.com', 2345678, '2025-11-01 17:18:14', '2025-11-01 17:18:14');

-- 7. MENUS (sin dependencias primero, luego con menu_id)
INSERT INTO public.menus VALUES (1, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (4, 'Calificaciones', '/calificaciones', 'icon-clipboard-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (8, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (12, 'Evaluadores', '/evaluadores', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (15, 'Olimpistas', '/olimpistas', 'icon-award', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (19, 'Ver acciones de evaluadores', '/acciones/evaluadores', 'icon-activity', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (20, 'Cierre de fases', '/fases/cierre de fase', 'ti ti-lock-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (21, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (23, 'Usuarios', '/usuarios', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (26, 'Ver acciones de usuarios', '/acciones/usuarios', 'icon-list-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (27, 'Ver fases finalizadas', '/fases/ver cierres', 'ti ti-adjustments-x', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (28, 'Generar reportes', '/reportes/generar', 'ti ti-news', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);

-- ============================================================
-- NIVEL 1: Tablas que dependen del NIVEL 0
-- ============================================================

-- 8. PROVINCIAS (depende de DEPARTAMENTOS)
INSERT INTO public.provincias VALUES (1, 'Oropeza', 'ORP', 1);
INSERT INTO public.provincias VALUES (2, 'Azurduy', 'AZU', 1);
INSERT INTO public.provincias VALUES (3, 'Zudáñez', 'ZUD', 1);
INSERT INTO public.provincias VALUES (31, 'Cercado', 'CER', 3);
INSERT INTO public.provincias VALUES (32, 'Arani', 'ARA', 3);
INSERT INTO public.provincias VALUES (43, 'Quillacollo', 'QUI', 3);
-- [Aquí deberías incluir todas las provincias, solo incluyo algunas como ejemplo]

-- 9. NIVELES_GRADOS (depende de NIVELS y GRADOS)
INSERT INTO public.niveles_grados VALUES (1, 1, 1, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (2, 2, 2, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (3, 3, 3, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
-- [Incluir todos los registros de niveles_grados]

-- 10. NIVELES_AREAS (depende de NIVELS y AREAS)
INSERT INTO public.niveles_areas VALUES (1, 1, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (2, 2, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (3, 3, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
-- [Incluir todos los registros de niveles_areas]

-- 11. MENUS con menu_id (submenús que dependen de MENUS)
INSERT INTO public.menus VALUES (2, 'Ver áreas', '/areas/ver areas', 'icon-map', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 1);
INSERT INTO public.menus VALUES (3, 'Ver fases', '/areas/ver fases', 'icon-layers', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 1);
INSERT INTO public.menus VALUES (5, 'Olimpistas', '/calificaciones/olimpistas', 'icon-award', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 4);
INSERT INTO public.menus VALUES (6, 'Grupos', '/calificaciones/grupos', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 4);
INSERT INTO public.menus VALUES (7, 'Cierre de fases', '/fases/cierre de fase', 'ti ti-lock-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (9, 'Crear fases', '/areas/fases/preparacion de fase', 'icon-circle-fading-plus', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 8);
INSERT INTO public.menus VALUES (10, 'Ver áreas', '/areas/ver areas', 'icon-map', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 8);
INSERT INTO public.menus VALUES (11, 'Ver fases', '/areas/ver fases', 'icon-eye', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 8);
INSERT INTO public.menus VALUES (13, 'Ver evaluadores', '/evaluadores/ver evaluadores', 'icon-user-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 12);
INSERT INTO public.menus VALUES (16, 'Inscribir olimpistas', '/olimpistas/registrar olimpista(s)', 'icon-user-plus', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 15);
INSERT INTO public.menus VALUES (17, 'Inscribir grupos', '/olimpistas/registrar grupo(s)', 'icon-users-round', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 15);
INSERT INTO public.menus VALUES (18, 'Ver olimpistas', '/olimpistas/ver olimpistas', 'icon-award', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 15);
INSERT INTO public.menus VALUES (22, 'Crear áreas', '/areas/crear area', 'icon-map-plus', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 21);
INSERT INTO public.menus VALUES (24, 'Crear encargado', '/usuarios/crear-encargado', 'icon-user-plus', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 23);
INSERT INTO public.menus VALUES (25, 'Crear evaluador', '/usuarios/crear-evaluador', 'icon-user-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 23);
INSERT INTO public.menus VALUES (29, 'Ver áreas', '/areas/ver areas', 'icon-map', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 21);
INSERT INTO public.menus VALUES (30, 'Ver fases', '/areas/ver fases', 'icon-layers', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 21);
INSERT INTO public.menus VALUES (31, 'Ver usuarios', '/ver usuarios', 'ti ti-users-group', '2025-11-18 20:30:17', '2025-11-18 20:30:17', 23);

-- 12. ROL_MENUS (depende de ROLS y MENUS)
INSERT INTO public.rol_menus VALUES (1, 1, 1, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (2, 1, 4, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (3, 1, 7, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (4, 1, 18, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (5, 2, 8, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (6, 2, 12, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (7, 2, 15, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (8, 2, 19, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (9, 2, 20, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (10, 3, 18, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (11, 3, 21, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (12, 3, 23, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (13, 3, 26, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (14, 3, 27, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.rol_menus VALUES (15, 3, 28, '2025-11-01 17:18:15', '2025-11-01 17:18:15');

-- 13. USUARIOS (depende de NIVELS, puede ser NULL)
INSERT INTO public.usuarios VALUES (21, 'Admin', 'Sistema', 70000000, 'admin@codecrafters.com', '$2y$12$CnqTBg3j2alVIqCcFTyQ9OOQsfactQ8w4td1uwt7EeZ7RCVZAMXW6', NULL, '2025-11-14 16:13:37', '2025-11-14 16:13:37', 10000000, NULL);

-- ============================================================
-- NIVEL 2: Tablas que dependen del NIVEL 1
-- ============================================================

-- 14. COLEGIOS (depende de PROVINCIAS)
INSERT INTO public.colegios VALUES (1, 'Colegio San Simón', '4-4234567', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 31);
INSERT INTO public.colegios VALUES (2, 'Colegio Americano', '4-4245678', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 31);
-- [Incluir todos los colegios]

-- 15. FASES (depende de AREAS, NIVELS, y puede depender de otra FASE)
-- Primero las fases sin fase_id (fases padre)
INSERT INTO public.fases VALUES (1, 'preliminares', 'PREL-1', 'Fase preliminar de Astronomía', 50, 10, 'pendiente', '2025-11-15 08:00:00', '2025-11-30 18:00:00', 1, '2025-11-01 17:18:14', '2025-11-01 17:18:14', 10, 1, NULL, NULL);
-- Luego las fases que dependen de otras fases (con fase_id)
-- INSERT INTO public.fases VALUES (2, 'clasificatorias', 'CLAS-1', 'Fase clasificatoria', 30, 5, 'pendiente', '2025-12-01 08:00:00', '2025-12-15 18:00:00', 1, '2025-11-01 17:18:14', '2025-11-01 17:18:14', 5, 1, NULL, 1);

-- 16. USUARIO_ROLS (depende de USUARIOS y ROLS)
INSERT INTO public.usuario_rols VALUES (1, 3, 21, '2025-11-14 16:13:37', '2025-11-14 16:13:37');

-- 17. USUARIO_AREAS (depende de USUARIOS y AREAS)
INSERT INTO public.usuario_areas VALUES (1, 21, 1, '2025-11-14 16:13:37', '2025-11-14 16:13:37');
INSERT INTO public.usuario_areas VALUES (2, 21, 2, '2025-11-14 16:13:37', '2025-11-14 16:13:37');
INSERT INTO public.usuario_areas VALUES (3, 21, 3, '2025-11-14 16:13:37', '2025-11-14 16:13:37');
INSERT INTO public.usuario_areas VALUES (4, 21, 4, '2025-11-14 16:13:37', '2025-11-14 16:13:37');

-- ============================================================
-- NIVEL 3: Tablas que dependen del NIVEL 2
-- ============================================================

-- 18. GRUPOS (depende de TUTORS y COLEGIOS)
INSERT INTO public.grupos VALUES (1, 'Grupo Científicos A', 1, 1, '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'activo');
-- [Incluir todos los grupos]

-- 19. OLIMPISTAS (depende de GRADOS, COLEGIOS, TUTORS)
INSERT INTO public.olimpistas VALUES (1, 'Carlos', 'Ramírez', 'López', 'activo', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 12345678, 70111111, 5, 'carlos.ramirez@example.com', '2010-03-15', 1, 1);
-- [Incluir todos los olimpistas]

-- 20. USUARIO_FASES (depende de USUARIOS y FASES)
-- INSERT INTO public.usuario_fases VALUES (...);

-- 21. VERIFICACION_CIERRES (depende de USUARIOS y FASES)
-- INSERT INTO public.verificacion_cierres VALUES (...);

-- ============================================================
-- NIVEL 4: Tablas que dependen del NIVEL 3
-- ============================================================

-- 22. GRUPO_AREAS (depende de GRUPOS y AREAS)
INSERT INTO public.grupo_areas VALUES (1, 1, 1, '2025-11-01 17:18:14', '2025-11-01 17:18:14');
-- [Incluir todos los registros]

-- 23. OLIMPISTA_GRUPOS (depende de OLIMPISTAS y GRUPOS)
INSERT INTO public.olimpista_grupos VALUES (1, 1, 1, '2025-11-01 17:18:14', '2025-11-01 17:18:14');
-- [Incluir todos los registros]

-- 24. OLIMPISTA_AREAS (depende de OLIMPISTAS y AREAS)
INSERT INTO public.olimpista_areas VALUES (1, 1, 1, '2025-11-01 17:18:14', '2025-11-01 17:18:14');
-- [Incluir todos los registros]

-- 25. TUTOR_OLIMPISTAS (depende de TUTORS y OLIMPISTAS)
INSERT INTO public.tutor_olimpistas VALUES (1, 1, 1, '2025-11-01 17:18:14', '2025-11-01 17:18:14');
-- [Incluir todos los registros]

-- 26. CALIFICACIONS (depende de OLIMPISTAS y FASES)
-- INSERT INTO public.calificacions VALUES (...);

-- 27. CALIFICACION_GRUPOS (depende de GRUPOS y FASES)
-- INSERT INTO public.calificacion_grupos VALUES (...);

-- ============================================================
-- NIVEL 5: Tablas que dependen del NIVEL 4
-- ============================================================

-- 28. LOG_DATA (depende de USUARIOS, OLIMPISTAS y CALIFICACIONS)
-- INSERT INTO public.log_data VALUES (...);

-- ============================================================
-- ACTUALIZAR SECUENCIAS
-- ============================================================
SELECT setval('areas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.areas));
SELECT setval('departamentos_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.departamentos));
SELECT setval('grados_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.grados));
SELECT setval('nivels_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.nivels));
SELECT setval('rols_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.rols));
SELECT setval('tutors_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.tutors));
SELECT setval('menus_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.menus));
SELECT setval('provincias_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.provincias));
SELECT setval('niveles_grados_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.niveles_grados));
SELECT setval('niveles_areas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.niveles_areas));
SELECT setval('rol_menus_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.rol_menus));
SELECT setval('usuarios_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.usuarios));
SELECT setval('colegios_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.colegios));
SELECT setval('fases_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.fases));
SELECT setval('usuario_rols_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.usuario_rols));
SELECT setval('usuario_areas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.usuario_areas));
SELECT setval('grupos_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.grupos));
SELECT setval('olimpistas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.olimpistas));
SELECT setval('usuario_fases_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.usuario_fases));
SELECT setval('verificacion_cierres_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.verificacion_cierres));
SELECT setval('grupo_areas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.grupo_areas));
SELECT setval('olimpista_grupos_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.olimpista_grupos));
SELECT setval('olimpista_areas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.olimpista_areas));
SELECT setval('tutor_olimpistas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.tutor_olimpistas));
SELECT setval('calificacions_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.calificacions));
SELECT setval('calificacion_grupos_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.calificacion_grupos));
SELECT setval('log_data_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.log_data));
