

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

ALTER TABLE ONLY public.verificacion_cierres DROP CONSTRAINT verificacion_cierres_usuario_evaluador_id_foreign;
ALTER TABLE ONLY public.verificacion_cierres DROP CONSTRAINT verificacion_cierres_usuario_encargado_id_foreign;
ALTER TABLE ONLY public.verificacion_cierres DROP CONSTRAINT verificacion_cierres_fase_id_foreign;
ALTER TABLE ONLY public.usuario_rols DROP CONSTRAINT usuario_rols_usuario_id_foreign;
ALTER TABLE ONLY public.usuario_rols DROP CONSTRAINT usuario_rols_rol_id_foreign;
ALTER TABLE ONLY public.usuario_fases DROP CONSTRAINT usuario_fases_usuario_id_foreign;
ALTER TABLE ONLY public.usuario_fases DROP CONSTRAINT usuario_fases_fase_id_foreign;
ALTER TABLE ONLY public.usuario_areas DROP CONSTRAINT usuario_areas_usuario_id_foreign;
ALTER TABLE ONLY public.usuario_areas DROP CONSTRAINT usuario_areas_area_id_foreign;
ALTER TABLE ONLY public.tutor_olimpistas DROP CONSTRAINT tutor_olimpistas_tutor_id_foreign;
ALTER TABLE ONLY public.tutor_olimpistas DROP CONSTRAINT tutor_olimpistas_olimpista_id_foreign;
ALTER TABLE ONLY public.rol_menus DROP CONSTRAINT rol_menus_rol_id_foreign;
ALTER TABLE ONLY public.rol_menus DROP CONSTRAINT rol_menus_menu_id_foreign;
ALTER TABLE ONLY public.provincias DROP CONSTRAINT provincias_departamento_id_foreign;
ALTER TABLE ONLY public.olimpistas DROP CONSTRAINT olimpistas_tutor_id_foreign;
ALTER TABLE ONLY public.olimpistas DROP CONSTRAINT olimpistas_grado_id_foreign;
ALTER TABLE ONLY public.olimpistas DROP CONSTRAINT olimpistas_colegio_id_foreign;
ALTER TABLE ONLY public.olimpista_grupos DROP CONSTRAINT olimpista_grupos_olimpista_id_foreign;
ALTER TABLE ONLY public.olimpista_grupos DROP CONSTRAINT olimpista_grupos_grupo_id_foreign;
ALTER TABLE ONLY public.olimpista_areas DROP CONSTRAINT olimpista_areas_olimpista_id_foreign;
ALTER TABLE ONLY public.olimpista_areas DROP CONSTRAINT olimpista_areas_area_id_foreign;
ALTER TABLE ONLY public.niveles_grados DROP CONSTRAINT niveles_grados_nivel_id_foreign;
ALTER TABLE ONLY public.niveles_grados DROP CONSTRAINT niveles_grados_grado_id_foreign;
ALTER TABLE ONLY public.niveles_areas DROP CONSTRAINT niveles_areas_nivel_id_foreign;
ALTER TABLE ONLY public.niveles_areas DROP CONSTRAINT niveles_areas_area_id_foreign;
ALTER TABLE ONLY public.menus DROP CONSTRAINT menus_menu_id_foreign;
ALTER TABLE ONLY public.log_data DROP CONSTRAINT log_data_usuario_id_foreign;
ALTER TABLE ONLY public.log_data DROP CONSTRAINT log_data_olimpista_id_foreign;
ALTER TABLE ONLY public.log_data DROP CONSTRAINT log_data_calificacion_id_foreign;
ALTER TABLE ONLY public.grupos DROP CONSTRAINT grupos_tutor_id_foreign;
ALTER TABLE ONLY public.grupos DROP CONSTRAINT grupos_colegio_id_foreign;
ALTER TABLE ONLY public.grupo_areas DROP CONSTRAINT grupo_areas_grupo_id_foreign;
ALTER TABLE ONLY public.grupo_areas DROP CONSTRAINT grupo_areas_area_id_foreign;
ALTER TABLE ONLY public.fases DROP CONSTRAINT fases_nivel_id_foreign;
ALTER TABLE ONLY public.fases DROP CONSTRAINT fases_fase_id_foreign;
ALTER TABLE ONLY public.fases DROP CONSTRAINT fases_area_id_foreign;
ALTER TABLE ONLY public.colegios DROP CONSTRAINT colegios_provincia_id_foreign;
ALTER TABLE ONLY public.calificacions DROP CONSTRAINT calificacions_olimpista_id_foreign;
ALTER TABLE ONLY public.calificacions DROP CONSTRAINT calificacions_fase_id_foreign;
ALTER TABLE ONLY public.calificacion_grupos DROP CONSTRAINT calificacion_grupos_grupo_id_foreign;
ALTER TABLE ONLY public.calificacion_grupos DROP CONSTRAINT calificacion_grupos_fase_id_foreign;
ALTER TABLE ONLY public.verificacion_cierres DROP CONSTRAINT verificacion_cierres_pkey;
ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_id_unique;
ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_unique;
ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_ci_unique;
ALTER TABLE ONLY public.usuario_rols DROP CONSTRAINT usuario_rols_pkey;
ALTER TABLE ONLY public.usuario_fases DROP CONSTRAINT usuario_fases_pkey;
ALTER TABLE ONLY public.usuario_areas DROP CONSTRAINT usuario_areas_pkey;
ALTER TABLE ONLY public.tutors DROP CONSTRAINT tutors_pkey;
ALTER TABLE ONLY public.tutors DROP CONSTRAINT tutors_email_unique;
ALTER TABLE ONLY public.tutors DROP CONSTRAINT tutors_ci_unique;
ALTER TABLE ONLY public.tutor_olimpistas DROP CONSTRAINT tutor_olimpistas_pkey;
ALTER TABLE ONLY public.rols DROP CONSTRAINT rols_pkey;
ALTER TABLE ONLY public.rol_menus DROP CONSTRAINT rol_menus_pkey;
ALTER TABLE ONLY public.provincias DROP CONSTRAINT provincias_pkey;
ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_key;
ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
ALTER TABLE ONLY public.password_reset_tokens DROP CONSTRAINT password_reset_tokens_pkey;
ALTER TABLE ONLY public.olimpistas DROP CONSTRAINT olimpistas_pkey;
ALTER TABLE ONLY public.olimpistas DROP CONSTRAINT olimpistas_ci_unique;
ALTER TABLE ONLY public.olimpista_grupos DROP CONSTRAINT olimpista_grupos_pkey;
ALTER TABLE ONLY public.olimpista_areas DROP CONSTRAINT olimpista_areas_pkey;
ALTER TABLE ONLY public.nivels DROP CONSTRAINT nivels_pkey;
ALTER TABLE ONLY public.niveles_grados DROP CONSTRAINT niveles_grados_pkey;
ALTER TABLE ONLY public.niveles_areas DROP CONSTRAINT niveles_areas_pkey;
ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
ALTER TABLE ONLY public.menus DROP CONSTRAINT menus_pkey;
ALTER TABLE ONLY public.menus DROP CONSTRAINT menus_id_unique;
ALTER TABLE ONLY public.log_data DROP CONSTRAINT log_data_pkey;
ALTER TABLE ONLY public.grupos DROP CONSTRAINT grupos_pkey;
ALTER TABLE ONLY public.grupo_areas DROP CONSTRAINT grupo_areas_pkey;
ALTER TABLE ONLY public.grados DROP CONSTRAINT grados_pkey;
ALTER TABLE ONLY public.fases DROP CONSTRAINT fases_pkey;
ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
ALTER TABLE ONLY public.departamentos DROP CONSTRAINT departamentos_pkey;
ALTER TABLE ONLY public.colegios DROP CONSTRAINT colegios_pkey;
ALTER TABLE ONLY public.calificacions DROP CONSTRAINT calificacions_pkey;
ALTER TABLE ONLY public.calificacion_grupos DROP CONSTRAINT calificacion_grupos_pkey;
ALTER TABLE ONLY public.areas DROP CONSTRAINT areas_pkey;
ALTER TABLE public.verificacion_cierres ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.usuario_rols ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.usuario_fases ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.usuario_areas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.tutors ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.tutor_olimpistas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.rols ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.rol_menus ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.provincias ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.olimpistas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.olimpista_grupos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.olimpista_areas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.nivels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.niveles_grados ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.niveles_areas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.menus ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.log_data ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.grupos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.grupo_areas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.grados ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.fases ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.departamentos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.colegios ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.calificacions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.calificacion_grupos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.areas ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.verificacion_cierres_id_seq;
DROP TABLE public.verificacion_cierres;
DROP SEQUENCE public.usuarios_id_seq;
DROP TABLE public.usuarios;
DROP SEQUENCE public.usuario_rols_id_seq;
DROP TABLE public.usuario_rols;
DROP SEQUENCE public.usuario_fases_id_seq;
DROP TABLE public.usuario_fases;
DROP SEQUENCE public.usuario_areas_id_seq;
DROP TABLE public.usuario_areas;
DROP SEQUENCE public.tutors_id_seq;
DROP TABLE public.tutors;
DROP SEQUENCE public.tutor_olimpistas_id_seq;
DROP TABLE public.tutor_olimpistas;
DROP SEQUENCE public.rols_id_seq;
DROP TABLE public.rols;
DROP SEQUENCE public.rol_menus_id_seq;
DROP TABLE public.rol_menus;
DROP SEQUENCE public.provincias_id_seq;
DROP TABLE public.provincias;
DROP SEQUENCE public.personal_access_tokens_id_seq;
DROP TABLE public.personal_access_tokens;
DROP TABLE public.password_reset_tokens;
DROP SEQUENCE public.olimpistas_id_seq;
DROP TABLE public.olimpistas;
DROP SEQUENCE public.olimpista_grupos_id_seq;
DROP TABLE public.olimpista_grupos;
DROP SEQUENCE public.olimpista_areas_id_seq;
DROP TABLE public.olimpista_areas;
DROP SEQUENCE public.nivels_id_seq;
DROP TABLE public.nivels;
DROP SEQUENCE public.niveles_grados_id_seq;
DROP TABLE public.niveles_grados;
DROP SEQUENCE public.niveles_areas_id_seq;
DROP TABLE public.niveles_areas;
DROP SEQUENCE public.migrations_id_seq;
DROP TABLE public.migrations;
DROP SEQUENCE public.menus_id_seq;
DROP TABLE public.menus;
DROP SEQUENCE public.log_data_id_seq;
DROP TABLE public.log_data;
DROP SEQUENCE public.grupos_id_seq;
DROP TABLE public.grupos;
DROP SEQUENCE public.grupo_areas_id_seq;
DROP TABLE public.grupo_areas;
DROP SEQUENCE public.grados_id_seq;
DROP TABLE public.grados;
DROP SEQUENCE public.fases_id_seq;
DROP TABLE public.fases;
DROP SEQUENCE public.failed_jobs_id_seq;
DROP TABLE public.failed_jobs;
DROP SEQUENCE public.departamentos_id_seq;
DROP TABLE public.departamentos;
DROP SEQUENCE public.colegios_id_seq;
DROP TABLE public.colegios;
DROP SEQUENCE public.calificacions_id_seq;
DROP TABLE public.calificacions;
DROP SEQUENCE public.calificacion_grupos_id_seq;
DROP TABLE public.calificacion_grupos;
DROP SEQUENCE public.areas_id_seq;
DROP TABLE public.areas;
SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.areas (
    id bigint NOT NULL,
    nombre character varying(45) NOT NULL,
    sigla character varying(3) NOT NULL,
    descripcion character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.areas OWNER TO codecrafters;

CREATE SEQUENCE public.areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.areas_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.areas_id_seq OWNED BY public.areas.id;

CREATE TABLE public.departamentos (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    sigla character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.departamentos OWNER TO codecrafters;

CREATE SEQUENCE public.departamentos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departamentos_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.departamentos_id_seq OWNED BY public.departamentos.id;


CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO codecrafters;

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.failed_jobs_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


CREATE TABLE public.grados (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL
);


ALTER TABLE public.grados OWNER TO codecrafters;

CREATE SEQUENCE public.grados_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grados_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.grados_id_seq OWNED BY public.grados.id;


CREATE TABLE public.menus (
    id bigint NOT NULL,
    title character varying(45) NOT NULL,
    url character varying(128) NOT NULL,
    icon character varying(45) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    menu_id bigint
);


ALTER TABLE public.menus OWNER TO codecrafters;

CREATE SEQUENCE public.menus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menus_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.menus_id_seq OWNED BY public.menus.id;


CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO codecrafters;

CREATE SEQUENCE public.migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


CREATE TABLE public.nivels (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL
);


ALTER TABLE public.nivels OWNER TO codecrafters;

CREATE SEQUENCE public.nivels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nivels_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.nivels_id_seq OWNED BY public.nivels.id;

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_reset_tokens OWNER TO codecrafters;

CREATE TABLE public.personal_access_tokens (
    id integer NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id integer NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO codecrafters;

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personal_access_tokens_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;



CREATE TABLE public.rols (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    sigla character varying(255) NOT NULL
);


ALTER TABLE public.rols OWNER TO codecrafters;

CREATE SEQUENCE public.rols_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rols_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.rols_id_seq OWNED BY public.rols.id;

CREATE TABLE public.tutors (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    apellidos character varying(255) NOT NULL,
    celular integer NOT NULL,
    email character varying(255) NOT NULL,
    ci integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.tutors OWNER TO codecrafters;

CREATE SEQUENCE public.tutors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tutors_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.tutors_id_seq OWNED BY public.tutors.id;

CREATE TABLE public.usuarios (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    celular integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    ci integer NOT NULL,
    nivel_id bigint
);


ALTER TABLE public.usuarios OWNER TO codecrafters;

CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;

CREATE TABLE public.provincias (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    sigla character varying(255) NOT NULL,
    departamento_id bigint NOT NULL
);


ALTER TABLE public.provincias OWNER TO codecrafters;

CREATE SEQUENCE public.provincias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.provincias_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.provincias_id_seq OWNED BY public.provincias.id;


CREATE TABLE public.olimpistas (
    id bigint NOT NULL,
    nombres character varying(15) NOT NULL,
    apellido_paterno character varying(15) NOT NULL,
    apellido_materno character varying(15) NOT NULL,
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    ci integer NOT NULL,
    celular integer NOT NULL,
    grado_id bigint NOT NULL,
    email character varying(255) NOT NULL,
    fecha_nacimiento date NOT NULL,
    colegio_id bigint NOT NULL,
    tutor_id bigint,
    CONSTRAINT olimpistas_estado_check CHECK (((estado)::text = ANY (ARRAY[('clasificado'::character varying)::text, ('desclasificado'::character varying)::text, ('no clasificado'::character varying)::text, ('activo'::character varying)::text])))
);


ALTER TABLE public.olimpistas OWNER TO codecrafters;

CREATE SEQUENCE public.olimpistas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.olimpistas_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.olimpistas_id_seq OWNED BY public.olimpistas.id;


CREATE TABLE public.colegios (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    telefono character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    provincia_id bigint
);


ALTER TABLE public.colegios OWNER TO codecrafters;

CREATE SEQUENCE public.colegios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.colegios_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.colegios_id_seq OWNED BY public.colegios.id;

CREATE TABLE public.fases (
    id bigint NOT NULL,
    tipo_fase character varying(255) DEFAULT 'preliminales'::character varying NOT NULL,
    sigla character varying(255) NOT NULL,
    descripcion text,
    cantidad_max_participantes integer NOT NULL,
    cantidad_min_participantes integer NOT NULL,
    estado character varying(255) DEFAULT 'pendiente'::character varying NOT NULL,
    fecha_inicio timestamp(0) without time zone NOT NULL,
    fecha_fin timestamp(0) without time zone NOT NULL,
    area_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    cantidad_ganadores integer,
    nivel_id bigint,
    fecha_calificacion timestamp(0) without time zone,
    fase_id bigint,
    CONSTRAINT fases_estado_check CHECK (((estado)::text = ANY (ARRAY[('pendiente'::character varying)::text, ('en curso'::character varying)::text, ('finalizada'::character varying)::text]))),
    CONSTRAINT fases_tipo_fase_check CHECK (((tipo_fase)::text = ANY (ARRAY[('preliminares'::character varying)::text, ('clasificatorias'::character varying)::text, ('finales'::character varying)::text])))
);


ALTER TABLE public.fases OWNER TO codecrafters;

CREATE SEQUENCE public.fases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fases_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.fases_id_seq OWNED BY public.fases.id;


CREATE TABLE public.grupos (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    tutor_id bigint NOT NULL,
    colegio_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    estado character varying(255) DEFAULT 'activo'::character varying NOT NULL,
    CONSTRAINT grupos_estado_check CHECK (((estado)::text = ANY (ARRAY[('clasificado'::character varying)::text, ('desclasificado'::character varying)::text, ('no clasificado'::character varying)::text, ('activo'::character varying)::text])))
);


ALTER TABLE public.grupos OWNER TO codecrafters;

CREATE SEQUENCE public.grupos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grupos_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.grupos_id_seq OWNED BY public.grupos.id;

CREATE TABLE public.calificacion_grupos (
    id bigint NOT NULL,
    puntaje numeric(5,2) NOT NULL,
    comentarios character varying(255) NOT NULL,
    grupo_id bigint NOT NULL,
    fase_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.calificacion_grupos OWNER TO codecrafters;

CREATE SEQUENCE public.calificacion_grupos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calificacion_grupos_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.calificacion_grupos_id_seq OWNED BY public.calificacion_grupos.id;


CREATE TABLE public.calificacions (
    id bigint NOT NULL,
    puntaje integer NOT NULL,
    comentarios character varying(255) NOT NULL,
    olimpista_id bigint NOT NULL,
    fase_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.calificacions OWNER TO codecrafters;

CREATE SEQUENCE public.calificacions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.calificacions_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.calificacions_id_seq OWNED BY public.calificacions.id;


CREATE TABLE public.grupo_areas (
    id bigint NOT NULL,
    grupo_id bigint NOT NULL,
    area_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.grupo_areas OWNER TO codecrafters;

CREATE SEQUENCE public.grupo_areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grupo_areas_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.grupo_areas_id_seq OWNED BY public.grupo_areas.id;

CREATE TABLE public.log_data (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    accion character varying(255) NOT NULL,
    tabla character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    olimpista_id bigint NOT NULL,
    calificacion_id bigint NOT NULL
);


ALTER TABLE public.log_data OWNER TO codecrafters;

CREATE SEQUENCE public.log_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_data_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.log_data_id_seq OWNED BY public.log_data.id;

CREATE TABLE public.niveles_areas (
    id bigint NOT NULL,
    nivel_id bigint NOT NULL,
    area_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.niveles_areas OWNER TO codecrafters;

CREATE SEQUENCE public.niveles_areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.niveles_areas_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.niveles_areas_id_seq OWNED BY public.niveles_areas.id;


CREATE TABLE public.niveles_grados (
    id bigint NOT NULL,
    nivel_id bigint NOT NULL,
    grado_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.niveles_grados OWNER TO codecrafters;

CREATE SEQUENCE public.niveles_grados_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.niveles_grados_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.niveles_grados_id_seq OWNED BY public.niveles_grados.id;

CREATE TABLE public.olimpista_areas (
    id bigint NOT NULL,
    olimpista_id bigint NOT NULL,
    area_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.olimpista_areas OWNER TO codecrafters;

CREATE SEQUENCE public.olimpista_areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.olimpista_areas_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.olimpista_areas_id_seq OWNED BY public.olimpista_areas.id;


CREATE TABLE public.olimpista_grupos (
    id bigint NOT NULL,
    olimpista_id bigint NOT NULL,
    grupo_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.olimpista_grupos OWNER TO codecrafters;

CREATE SEQUENCE public.olimpista_grupos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.olimpista_grupos_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.olimpista_grupos_id_seq OWNED BY public.olimpista_grupos.id;

CREATE TABLE public.rol_menus (
    id bigint NOT NULL,
    rol_id bigint NOT NULL,
    menu_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.rol_menus OWNER TO codecrafters;

CREATE SEQUENCE public.rol_menus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_menus_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.rol_menus_id_seq OWNED BY public.rol_menus.id;




CREATE TABLE public.tutor_olimpistas (
    id bigint NOT NULL,
    olimpista_id bigint NOT NULL,
    tutor_id bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.tutor_olimpistas OWNER TO codecrafters;

CREATE SEQUENCE public.tutor_olimpistas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tutor_olimpistas_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.tutor_olimpistas_id_seq OWNED BY public.tutor_olimpistas.id;


CREATE TABLE public.usuario_areas (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    area_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.usuario_areas OWNER TO codecrafters;

CREATE SEQUENCE public.usuario_areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_areas_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.usuario_areas_id_seq OWNED BY public.usuario_areas.id;


CREATE TABLE public.usuario_fases (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    fase_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.usuario_fases OWNER TO codecrafters;

CREATE SEQUENCE public.usuario_fases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_fases_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.usuario_fases_id_seq OWNED BY public.usuario_fases.id;


CREATE TABLE public.usuario_rols (
    id bigint NOT NULL,
    rol_id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.usuario_rols OWNER TO codecrafters;

CREATE SEQUENCE public.usuario_rols_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_rols_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.usuario_rols_id_seq OWNED BY public.usuario_rols.id;

CREATE TABLE public.verificacion_cierres (
    id bigint NOT NULL,
    usuario_encargado_id bigint,
    usuario_evaluador_id bigint,
    fase_id bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.verificacion_cierres OWNER TO codecrafters;

CREATE SEQUENCE public.verificacion_cierres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.verificacion_cierres_id_seq OWNER TO codecrafters;

ALTER SEQUENCE public.verificacion_cierres_id_seq OWNED BY public.verificacion_cierres.id;

ALTER TABLE ONLY public.areas ALTER COLUMN id SET DEFAULT nextval('public.areas_id_seq'::regclass);

ALTER TABLE ONLY public.calificacion_grupos ALTER COLUMN id SET DEFAULT nextval('public.calificacion_grupos_id_seq'::regclass);

ALTER TABLE ONLY public.calificacions ALTER COLUMN id SET DEFAULT nextval('public.calificacions_id_seq'::regclass);

ALTER TABLE ONLY public.colegios ALTER COLUMN id SET DEFAULT nextval('public.colegios_id_seq'::regclass);

ALTER TABLE ONLY public.departamentos ALTER COLUMN id SET DEFAULT nextval('public.departamentos_id_seq'::regclass);

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);

ALTER TABLE ONLY public.fases ALTER COLUMN id SET DEFAULT nextval('public.fases_id_seq'::regclass);

ALTER TABLE ONLY public.grados ALTER COLUMN id SET DEFAULT nextval('public.grados_id_seq'::regclass);

ALTER TABLE ONLY public.grupo_areas ALTER COLUMN id SET DEFAULT nextval('public.grupo_areas_id_seq'::regclass);

ALTER TABLE ONLY public.grupos ALTER COLUMN id SET DEFAULT nextval('public.grupos_id_seq'::regclass);

ALTER TABLE ONLY public.log_data ALTER COLUMN id SET DEFAULT nextval('public.log_data_id_seq'::regclass);

ALTER TABLE ONLY public.menus ALTER COLUMN id SET DEFAULT nextval('public.menus_id_seq'::regclass);

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);

ALTER TABLE ONLY public.niveles_areas ALTER COLUMN id SET DEFAULT nextval('public.niveles_areas_id_seq'::regclass);

ALTER TABLE ONLY public.niveles_grados ALTER COLUMN id SET DEFAULT nextval('public.niveles_grados_id_seq'::regclass);

ALTER TABLE ONLY public.nivels ALTER COLUMN id SET DEFAULT nextval('public.nivels_id_seq'::regclass);

ALTER TABLE ONLY public.olimpista_areas ALTER COLUMN id SET DEFAULT nextval('public.olimpista_areas_id_seq'::regclass);

ALTER TABLE ONLY public.olimpista_grupos ALTER COLUMN id SET DEFAULT nextval('public.olimpista_grupos_id_seq'::regclass);

ALTER TABLE ONLY public.olimpistas ALTER COLUMN id SET DEFAULT nextval('public.olimpistas_id_seq'::regclass);

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);

ALTER TABLE ONLY public.provincias ALTER COLUMN id SET DEFAULT nextval('public.provincias_id_seq'::regclass);

ALTER TABLE ONLY public.rol_menus ALTER COLUMN id SET DEFAULT nextval('public.rol_menus_id_seq'::regclass);

ALTER TABLE ONLY public.rols ALTER COLUMN id SET DEFAULT nextval('public.rols_id_seq'::regclass);

ALTER TABLE ONLY public.tutor_olimpistas ALTER COLUMN id SET DEFAULT nextval('public.tutor_olimpistas_id_seq'::regclass);

ALTER TABLE ONLY public.tutors ALTER COLUMN id SET DEFAULT nextval('public.tutors_id_seq'::regclass);

ALTER TABLE ONLY public.usuario_areas ALTER COLUMN id SET DEFAULT nextval('public.usuario_areas_id_seq'::regclass);

ALTER TABLE ONLY public.usuario_fases ALTER COLUMN id SET DEFAULT nextval('public.usuario_fases_id_seq'::regclass);

ALTER TABLE ONLY public.usuario_rols ALTER COLUMN id SET DEFAULT nextval('public.usuario_rols_id_seq'::regclass);

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);

ALTER TABLE ONLY public.verificacion_cierres ALTER COLUMN id SET DEFAULT nextval('public.verificacion_cierres_id_seq'::regclass);

INSERT INTO public.areas VALUES (1, 'ASTRONOMÍA - ASTROFÍSICA', 'AST', 'Área de astronomía y astrofísica enfocada en el estudio del universo, los cuerpos celestes y fenómenos astronómicos.', NULL, NULL);
INSERT INTO public.areas VALUES (2, 'BIOLOGÍA', 'BIO', 'Área de biología dedicada al estudio de los seres vivos, su estructura, función, evolución y relaciones.', NULL, NULL);
INSERT INTO public.areas VALUES (3, 'FÍSICA', 'FIS', 'Área de física enfocada en el estudio de la materia, energía y sus interacciones en el universo.', NULL, NULL);
INSERT INTO public.areas VALUES (4, 'INFORMÁTICA', 'INF', 'Área de informática centrada en programación, algoritmos y resolución de problemas computacionales.', NULL, NULL);

INSERT INTO public.departamentos VALUES (1, 'Chuquisaca', 'CH', NULL, NULL);
INSERT INTO public.departamentos VALUES (2, 'La Paz', 'LP', NULL, NULL);
INSERT INTO public.departamentos VALUES (3, 'Cochabamba', 'CB', NULL, NULL);
INSERT INTO public.departamentos VALUES (4, 'Oruro', 'OR', NULL, NULL);
INSERT INTO public.departamentos VALUES (5, 'Potosí', 'PT', NULL, NULL);
INSERT INTO public.departamentos VALUES (6, 'Tarija', 'TJ', NULL, NULL);
INSERT INTO public.departamentos VALUES (7, 'Santa Cruz', 'SC', NULL, NULL);
INSERT INTO public.departamentos VALUES (8, 'Beni', 'BN', NULL, NULL);
INSERT INTO public.departamentos VALUES (9, 'Pando', 'PD', NULL, NULL);

INSERT INTO public.menus VALUES (1, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (2, 'Ver áreas', '/areas/ver areas', 'icon-map', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 1);
INSERT INTO public.menus VALUES (3, 'Ver fases', '/areas/ver fases', 'icon-layers', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 1);
INSERT INTO public.menus VALUES (4, 'Calificaciones', '/calificaciones', 'icon-clipboard-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (5, 'Olimpistas', '/calificaciones/olimpistas', 'icon-award', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 4);
INSERT INTO public.menus VALUES (6, 'Grupos', '/calificaciones/grupos', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 4);
INSERT INTO public.menus VALUES (8, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (9, 'Crear fases', '/areas/fases/preparacion de fase', 'icon-circle-fading-plus', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 8);
INSERT INTO public.menus VALUES (10, 'Ver áreas', '/areas/ver areas', 'icon-map', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 8);
INSERT INTO public.menus VALUES (11, 'Ver fases', '/areas/ver fases', 'icon-eye', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 8);
INSERT INTO public.menus VALUES (12, 'Evaluadores', '/evaluadores', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (13, 'Ver evaluadores', '/evaluadores/ver evaluadores', 'icon-user-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 12);
INSERT INTO public.menus VALUES (15, 'Olimpistas', '/olimpistas', 'icon-award', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (16, 'Inscribir olimpistas', '/olimpistas/registrar olimpista(s)', 'icon-user-plus', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 15);
INSERT INTO public.menus VALUES (17, 'Inscribir grupos', '/olimpistas/registrar grupo(s)', 'icon-users-round', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 15);
INSERT INTO public.menus VALUES (18, 'Ver olimpistas', '/olimpistas/ver olimpistas', 'icon-award', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 15);
INSERT INTO public.menus VALUES (19, 'Ver acciones de evaluadores', '/acciones/evaluadores', 'icon-activity', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (21, 'Áreas', '/areas', 'icon-goal', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (22, 'Crear áreas', '/areas/crear area', 'icon-map-plus', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 21);
INSERT INTO public.menus VALUES (23, 'Usuarios', '/usuarios', 'icon-users', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (24, 'Crear encargado', '/usuarios/crear-encargado', 'icon-user-plus', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 23);
INSERT INTO public.menus VALUES (25, 'Crear evaluador', '/usuarios/crear-evaluador', 'icon-user-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 23);
INSERT INTO public.menus VALUES (26, 'Ver acciones de usuarios', '/acciones/usuarios', 'icon-list-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (27, 'Ver fases finalizadas', '/fases/ver cierres', 'ti ti-adjustments-x', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (28, 'Generar reportes', '/reportes/generar', 'ti ti-news', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (29, 'Ver áreas', '/areas/ver areas', 'icon-map', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 21);
INSERT INTO public.menus VALUES (30, 'Ver fases', '/areas/ver fases', 'icon-layers', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 21);
INSERT INTO public.menus VALUES (31, 'Ver usuarios', '/ver usuarios', 'ti ti-users-group', '2025-11-18 20:30:17', '2025-11-18 20:30:17', 23);
INSERT INTO public.menus VALUES (20, 'Cierre de fases', '/fases/cierre de fase', 'ti ti-lock-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);
INSERT INTO public.menus VALUES (7, 'Cierre de fases', '/fases/cierre de fase', 'ti ti-lock-check', '2025-11-01 17:18:14', '2025-11-01 17:18:14', NULL);

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

INSERT INTO public.grados (id, nombre) VALUES (1, '3ro Primaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (2, '4to Primaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (3, '5to Primaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (4, '6to Primaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (5, '1ro Secundaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (6, '2do Secundaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (7, '3ro Secundaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (8, '4to Secundaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (9, '5to Secundaria') ON CONFLICT DO NOTHING;
INSERT INTO public.grados (id, nombre) VALUES (10, '6to Secundaria') ON CONFLICT DO NOTHING;

INSERT INTO public.niveles_areas VALUES (1, 1, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (2, 2, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (3, 3, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (4, 4, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (5, 5, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (6, 6, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (7, 7, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (8, 8, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (9, 9, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (10, 10, 1, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (11, 6, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (12, 7, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (13, 8, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (14, 9, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (15, 10, 2, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (16, 8, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (17, 9, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (18, 10, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (19, 17, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (20, 18, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (21, 19, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (22, 20, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (23, 21, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_areas VALUES (24, 22, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16');

INSERT INTO public.niveles_grados VALUES (1, 1, 1, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (2, 2, 2, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (3, 3, 3, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (4, 4, 4, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (5, 5, 5, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (6, 6, 6, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (7, 7, 7, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (8, 8, 8, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (9, 9, 9, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (10, 10, 10, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (11, 17, 3, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (12, 17, 4, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (13, 18, 5, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (14, 18, 6, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (15, 18, 7, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (16, 19, 5, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (17, 19, 6, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (18, 19, 7, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (19, 20, 8, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (20, 20, 9, '2025-11-01 17:18:15', '2025-11-01 17:18:15');
INSERT INTO public.niveles_grados VALUES (21, 20, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (22, 21, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (23, 21, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (24, 21, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (25, 22, 8, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (26, 22, 9, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (27, 22, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (28, 11, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (29, 12, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (30, 13, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (31, 14, 8, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (32, 15, 9, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (33, 16, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (34, 23, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (35, 23, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (36, 24, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (37, 24, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (38, 24, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (39, 24, 8, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (40, 24, 9, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (41, 24, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (42, 25, 3, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (43, 25, 4, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (44, 26, 5, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (45, 26, 6, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (46, 26, 7, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (47, 26, 8, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (48, 26, 9, '2025-11-01 17:18:16', '2025-11-01 17:18:16');
INSERT INTO public.niveles_grados VALUES (49, 26, 10, '2025-11-01 17:18:16', '2025-11-01 17:18:16');

INSERT INTO public.provincias VALUES (1, 'Oropeza', 'ORP', 1);
INSERT INTO public.provincias VALUES (2, 'Azurduy', 'AZU', 1);
INSERT INTO public.provincias VALUES (3, 'Zudáñez', 'ZUD', 1);
INSERT INTO public.provincias VALUES (4, 'Tomina', 'TOM', 1);
INSERT INTO public.provincias VALUES (5, 'Hernando Siles', 'HSI', 1);
INSERT INTO public.provincias VALUES (6, 'Yamparáez', 'YAM', 1);
INSERT INTO public.provincias VALUES (7, 'Nor Cinti', 'NCI', 1);
INSERT INTO public.provincias VALUES (8, 'Sud Cinti', 'SCI', 1);
INSERT INTO public.provincias VALUES (9, 'Belisario Boeto', 'BBO', 1);
INSERT INTO public.provincias VALUES (10, 'Luis Calvo', 'LCA', 1);
INSERT INTO public.provincias VALUES (11, 'Murillo', 'MUR', 2);
INSERT INTO public.provincias VALUES (12, 'Omasuyos', 'OMA', 2);
INSERT INTO public.provincias VALUES (13, 'Pacajes', 'PAC', 2);
INSERT INTO public.provincias VALUES (14, 'Camacho', 'CAM', 2);
INSERT INTO public.provincias VALUES (15, 'Muñecas', 'MUÑ', 2);
INSERT INTO public.provincias VALUES (16, 'Larecaja', 'LAR', 2);
INSERT INTO public.provincias VALUES (17, 'Franz Tamayo', 'FTA', 2);
INSERT INTO public.provincias VALUES (18, 'Ingavi', 'ING', 2);
INSERT INTO public.provincias VALUES (19, 'Loayza', 'LOA', 2);
INSERT INTO public.provincias VALUES (20, 'Inquisivi', 'INQ', 2);
INSERT INTO public.provincias VALUES (21, 'Sud Yungas', 'SYU', 2);
INSERT INTO public.provincias VALUES (22, 'Los Andes', 'AND', 2);
INSERT INTO public.provincias VALUES (23, 'Aroma', 'ARO', 2);
INSERT INTO public.provincias VALUES (24, 'Nor Yungas', 'NYU', 2);
INSERT INTO public.provincias VALUES (25, 'Abel Iturralde', 'AIT', 2);
INSERT INTO public.provincias VALUES (26, 'Bautista Saavedra', 'BSA', 2);
INSERT INTO public.provincias VALUES (27, 'Manco Kapac', 'MKA', 2);
INSERT INTO public.provincias VALUES (28, 'Gualberto Villarroel', 'GVI', 2);
INSERT INTO public.provincias VALUES (29, 'General José Manuel Pando', 'PAN', 2);
INSERT INTO public.provincias VALUES (30, 'Caranavi', 'CRV', 2);
INSERT INTO public.provincias VALUES (31, 'Cercado', 'CER', 3);
INSERT INTO public.provincias VALUES (32, 'Arani', 'ARA', 3);
INSERT INTO public.provincias VALUES (33, 'Arque', 'ARQ', 3);
INSERT INTO public.provincias VALUES (34, 'Ayopaya', 'AYO', 3);
INSERT INTO public.provincias VALUES (35, 'Campero', 'CAM', 3);
INSERT INTO public.provincias VALUES (36, 'Capinota', 'CAP', 3);
INSERT INTO public.provincias VALUES (37, 'Carrasco', 'CRR', 3);
INSERT INTO public.provincias VALUES (38, 'Chapare', 'CHP', 3);
INSERT INTO public.provincias VALUES (39, 'Esteban Arce', 'EAR', 3);
INSERT INTO public.provincias VALUES (40, 'Germán Jordán', 'GJO', 3);
INSERT INTO public.provincias VALUES (41, 'Mizque', 'MIZ', 3);
INSERT INTO public.provincias VALUES (42, 'Punata', 'PUN', 3);
INSERT INTO public.provincias VALUES (43, 'Quillacollo', 'QUI', 3);
INSERT INTO public.provincias VALUES (44, 'Tapacarí', 'TAP', 3);
INSERT INTO public.provincias VALUES (45, 'Tiraque', 'TIR', 3);
INSERT INTO public.provincias VALUES (46, 'Bolívar', 'BOL', 3);
INSERT INTO public.provincias VALUES (47, 'Cercado', 'CER', 4);
INSERT INTO public.provincias VALUES (48, 'Abaroa', 'ABA', 4);
INSERT INTO public.provincias VALUES (49, 'Carangas', 'CRG', 4);
INSERT INTO public.provincias VALUES (50, 'Cercado', 'CER', 4);
INSERT INTO public.provincias VALUES (51, 'Eduardo Avaroa', 'EAV', 4);
INSERT INTO public.provincias VALUES (52, 'Ladislao Cabrera', 'LCA', 4);
INSERT INTO public.provincias VALUES (53, 'Litoral', 'LIT', 4);
INSERT INTO public.provincias VALUES (54, 'Nor Carangas', 'NCR', 4);
INSERT INTO public.provincias VALUES (55, 'Pantaleón Dalence', 'PDA', 4);
INSERT INTO public.provincias VALUES (56, 'Poopó', 'POO', 4);
INSERT INTO public.provincias VALUES (57, 'Sajama', 'SAJ', 4);
INSERT INTO public.provincias VALUES (58, 'San Pedro de Totora', 'SPT', 4);
INSERT INTO public.provincias VALUES (59, 'Saucarí', 'SAU', 4);
INSERT INTO public.provincias VALUES (60, 'Sebastián Pagador', 'SPA', 4);
INSERT INTO public.provincias VALUES (61, 'Sud Carangas', 'SCR', 4);
INSERT INTO public.provincias VALUES (62, 'Tomás Barrón', 'TBA', 4);
INSERT INTO public.provincias VALUES (63, 'Tomás Frías', 'TFR', 5);
INSERT INTO public.provincias VALUES (64, 'Rafael Bustillo', 'RBU', 5);
INSERT INTO public.provincias VALUES (65, 'Cornelio Saavedra', 'CSA', 5);
INSERT INTO public.provincias VALUES (66, 'Chayanta', 'CHY', 5);
INSERT INTO public.provincias VALUES (67, 'Charcas', 'CHR', 5);
INSERT INTO public.provincias VALUES (68, 'Nor Chichas', 'NCH', 5);
INSERT INTO public.provincias VALUES (69, 'Alonso de Ibáñez', 'AIB', 5);
INSERT INTO public.provincias VALUES (70, 'Sur Chichas', 'SCH', 5);
INSERT INTO public.provincias VALUES (71, 'Nor Lípez', 'NLI', 5);
INSERT INTO public.provincias VALUES (72, 'Sur Lípez', 'SLI', 5);
INSERT INTO public.provincias VALUES (73, 'José María Linares', 'JML', 5);
INSERT INTO public.provincias VALUES (74, 'Antonio Quijarro', 'AQU', 5);
INSERT INTO public.provincias VALUES (75, 'Bernardino Bilbao', 'BBI', 5);
INSERT INTO public.provincias VALUES (76, 'Daniel Campos', 'DCA', 5);
INSERT INTO public.provincias VALUES (77, 'Modesto Omiste', 'MOM', 5);
INSERT INTO public.provincias VALUES (78, 'Enrique Baldivieso', 'EBA', 5);
INSERT INTO public.provincias VALUES (79, 'Cercado', 'CER', 6);
INSERT INTO public.provincias VALUES (80, 'Aniceto Arce', 'AAR', 6);
INSERT INTO public.provincias VALUES (81, 'Gran Chaco', 'GCH', 6);
INSERT INTO public.provincias VALUES (82, 'José María Avilés', 'JMA', 6);
INSERT INTO public.provincias VALUES (83, 'Méndez', 'MEN', 6);
INSERT INTO public.provincias VALUES (84, 'Burnet O''Connor', 'BOC', 6);
INSERT INTO public.provincias VALUES (85, 'Andrés Ibáñez', 'AIB', 7);
INSERT INTO public.provincias VALUES (86, 'Warnes', 'WAR', 7);
INSERT INTO public.provincias VALUES (87, 'Velasco', 'VEL', 7);
INSERT INTO public.provincias VALUES (88, 'Ichilo', 'ICH', 7);
INSERT INTO public.provincias VALUES (89, 'Chiquitos', 'CHI', 7);
INSERT INTO public.provincias VALUES (90, 'Sara', 'SAR', 7);
INSERT INTO public.provincias VALUES (91, 'Cordillera', 'COR', 7);
INSERT INTO public.provincias VALUES (92, 'Vallegrande', 'VAL', 7);
INSERT INTO public.provincias VALUES (93, 'Florida', 'FLO', 7);
INSERT INTO public.provincias VALUES (94, 'Obispo Santistevan', 'OSA', 7);
INSERT INTO public.provincias VALUES (95, 'Ñuflo de Chávez', 'ÑCH', 7);
INSERT INTO public.provincias VALUES (96, 'Ángel Sandoval', 'ASA', 7);
INSERT INTO public.provincias VALUES (97, 'Caballero', 'CAB', 7);
INSERT INTO public.provincias VALUES (98, 'Germán Busch', 'GBU', 7);
INSERT INTO public.provincias VALUES (99, 'Guarayos', 'GUA', 7);
INSERT INTO public.provincias VALUES (100, 'Cercado', 'CER', 8);
INSERT INTO public.provincias VALUES (101, 'Vaca Díez', 'VDI', 8);
INSERT INTO public.provincias VALUES (102, 'José Ballivián', 'JBA', 8);
INSERT INTO public.provincias VALUES (103, 'Yacuma', 'YAC', 8);
INSERT INTO public.provincias VALUES (104, 'Moxos', 'MOX', 8);
INSERT INTO public.provincias VALUES (105, 'Marbán', 'MAR', 8);
INSERT INTO public.provincias VALUES (106, 'Mamoré', 'MAM', 8);
INSERT INTO public.provincias VALUES (107, 'Iténez', 'ITE', 8);
INSERT INTO public.provincias VALUES (108, 'Nicolás Suárez', 'NSU', 9);
INSERT INTO public.provincias VALUES (109, 'Manuripi', 'MAN', 9);
INSERT INTO public.provincias VALUES (110, 'Madre de Dios', 'MDD', 9);
INSERT INTO public.provincias VALUES (111, 'Abuná', 'ABU', 9);
INSERT INTO public.provincias VALUES (112, 'Federico Román', 'FRO', 9);

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

INSERT INTO public.rols VALUES (1, 'Evaluador', 'Encargado de evaluar a los participantes', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'EVA');
INSERT INTO public.rols VALUES (2, 'Encargado de Área', 'Responsable de gestionar un área', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'EDA');
INSERT INTO public.rols VALUES (3, 'Administrador de Sistema', 'Responsable de gestionar todo el areas y usuarios.', '2025-11-01 17:18:14', '2025-11-01 17:18:14', 'ADM');

INSERT INTO public.usuario_areas VALUES (1, 1, 1, '2025-11-14 16:13:37', '2025-11-14 16:13:37');
INSERT INTO public.usuario_areas VALUES (2, 1, 2, '2025-11-14 16:13:37', '2025-11-14 16:13:37');
INSERT INTO public.usuario_areas VALUES (3, 1, 3, '2025-11-14 16:13:37', '2025-11-14 16:13:37');
INSERT INTO public.usuario_areas VALUES (4, 1, 4, '2025-11-14 16:13:37', '2025-11-14 16:13:37');

INSERT INTO public.usuario_rols VALUES (1, 3, 1, '2025-11-14 16:13:37', '2025-11-14 16:13:37');

INSERT INTO public.usuarios VALUES (1, 'Antonio', 'Garnica', 70202022, 'antonio.garnica@example.com', '$2y$12$CnqTBg3j2alVIqCcFTyQ9OOQsfactQ8w4td1uwt7EeZ7RCVZAMXW6', NULL, '2025-11-12 21:59:41', '2025-11-12 21:59:41', 1234581, NULL);

SELECT pg_catalog.setval('public.areas_id_seq', 11, true);

SELECT pg_catalog.setval('public.calificacion_grupos_id_seq', 85, true);

SELECT pg_catalog.setval('public.calificacions_id_seq', 389, true);

SELECT pg_catalog.setval('public.colegios_id_seq', 22, true);

SELECT pg_catalog.setval('public.departamentos_id_seq', 9, true);

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, true);

SELECT pg_catalog.setval('public.fases_id_seq', 115, true);

SELECT pg_catalog.setval('public.grados_id_seq', 10, true);

SELECT pg_catalog.setval('public.grupo_areas_id_seq', 25, true);

SELECT pg_catalog.setval('public.grupos_id_seq', 10, true);

SELECT pg_catalog.setval('public.log_data_id_seq', 26, true);

SELECT pg_catalog.setval('public.menus_id_seq', 31, true);

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);

SELECT pg_catalog.setval('public.niveles_areas_id_seq', 48, true);

SELECT pg_catalog.setval('public.niveles_grados_id_seq', 56, true);

SELECT pg_catalog.setval('public.nivels_id_seq', 30, true);

SELECT pg_catalog.setval('public.olimpista_areas_id_seq', 123, true);

SELECT pg_catalog.setval('public.olimpista_grupos_id_seq', 59, true);

SELECT pg_catalog.setval('public.olimpistas_id_seq', 122, true);

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 119, true);

SELECT pg_catalog.setval('public.provincias_id_seq', 112, true);

SELECT pg_catalog.setval('public.rol_menus_id_seq', 15, true);

SELECT pg_catalog.setval('public.rols_id_seq', 3, true);

SELECT pg_catalog.setval('public.tutor_olimpistas_id_seq', 34, true);

SELECT pg_catalog.setval('public.tutors_id_seq', 10, true);

SELECT pg_catalog.setval('public.usuario_areas_id_seq', 81, true);

SELECT pg_catalog.setval('public.usuario_fases_id_seq', 337, true);

SELECT pg_catalog.setval('public.usuario_rols_id_seq', 62, true);

SELECT pg_catalog.setval('public.usuarios_id_seq', 62, true);

SELECT pg_catalog.setval('public.verificacion_cierres_id_seq', 6, true);

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.calificacion_grupos
    ADD CONSTRAINT calificacion_grupos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.calificacions
    ADD CONSTRAINT calificacions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.colegios
    ADD CONSTRAINT colegios_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT departamentos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);

ALTER TABLE ONLY public.fases
    ADD CONSTRAINT fases_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.grados
    ADD CONSTRAINT grados_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.grupo_areas
    ADD CONSTRAINT grupo_areas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.log_data
    ADD CONSTRAINT log_data_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_id_unique UNIQUE (id);

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.niveles_areas
    ADD CONSTRAINT niveles_areas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.niveles_grados
    ADD CONSTRAINT niveles_grados_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.nivels
    ADD CONSTRAINT nivels_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.olimpista_areas
    ADD CONSTRAINT olimpista_areas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.olimpista_grupos
    ADD CONSTRAINT olimpista_grupos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.olimpistas
    ADD CONSTRAINT olimpistas_ci_unique UNIQUE (ci);

ALTER TABLE ONLY public.olimpistas
    ADD CONSTRAINT olimpistas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_key UNIQUE (token);

ALTER TABLE ONLY public.provincias
    ADD CONSTRAINT provincias_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.rol_menus
    ADD CONSTRAINT rol_menus_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.rols
    ADD CONSTRAINT rols_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tutor_olimpistas
    ADD CONSTRAINT tutor_olimpistas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tutors
    ADD CONSTRAINT tutors_ci_unique UNIQUE (ci);

ALTER TABLE ONLY public.tutors
    ADD CONSTRAINT tutors_email_unique UNIQUE (email);

ALTER TABLE ONLY public.tutors
    ADD CONSTRAINT tutors_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.usuario_areas
    ADD CONSTRAINT usuario_areas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.usuario_fases
    ADD CONSTRAINT usuario_fases_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.usuario_rols
    ADD CONSTRAINT usuario_rols_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_ci_unique UNIQUE (ci);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_unique UNIQUE (email);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_unique UNIQUE (id);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.verificacion_cierres
    ADD CONSTRAINT verificacion_cierres_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.calificacion_grupos
    ADD CONSTRAINT calificacion_grupos_fase_id_foreign FOREIGN KEY (fase_id) REFERENCES public.fases(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.calificacion_grupos
    ADD CONSTRAINT calificacion_grupos_grupo_id_foreign FOREIGN KEY (grupo_id) REFERENCES public.grupos(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.calificacions
    ADD CONSTRAINT calificacions_fase_id_foreign FOREIGN KEY (fase_id) REFERENCES public.fases(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.calificacions
    ADD CONSTRAINT calificacions_olimpista_id_foreign FOREIGN KEY (olimpista_id) REFERENCES public.olimpistas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.colegios
    ADD CONSTRAINT colegios_provincia_id_foreign FOREIGN KEY (provincia_id) REFERENCES public.provincias(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.fases
    ADD CONSTRAINT fases_area_id_foreign FOREIGN KEY (area_id) REFERENCES public.areas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.fases
    ADD CONSTRAINT fases_fase_id_foreign FOREIGN KEY (fase_id) REFERENCES public.fases(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.fases
    ADD CONSTRAINT fases_nivel_id_foreign FOREIGN KEY (nivel_id) REFERENCES public.nivels(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.grupo_areas
    ADD CONSTRAINT grupo_areas_area_id_foreign FOREIGN KEY (area_id) REFERENCES public.areas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.grupo_areas
    ADD CONSTRAINT grupo_areas_grupo_id_foreign FOREIGN KEY (grupo_id) REFERENCES public.grupos(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_colegio_id_foreign FOREIGN KEY (colegio_id) REFERENCES public.colegios(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_tutor_id_foreign FOREIGN KEY (tutor_id) REFERENCES public.tutors(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.log_data
    ADD CONSTRAINT log_data_calificacion_id_foreign FOREIGN KEY (calificacion_id) REFERENCES public.calificacions(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.log_data
    ADD CONSTRAINT log_data_olimpista_id_foreign FOREIGN KEY (olimpista_id) REFERENCES public.olimpistas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.log_data
    ADD CONSTRAINT log_data_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.niveles_areas
    ADD CONSTRAINT niveles_areas_area_id_foreign FOREIGN KEY (area_id) REFERENCES public.areas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.niveles_areas
    ADD CONSTRAINT niveles_areas_nivel_id_foreign FOREIGN KEY (nivel_id) REFERENCES public.nivels(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.niveles_grados
    ADD CONSTRAINT niveles_grados_grado_id_foreign FOREIGN KEY (grado_id) REFERENCES public.grados(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.niveles_grados
    ADD CONSTRAINT niveles_grados_nivel_id_foreign FOREIGN KEY (nivel_id) REFERENCES public.nivels(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.olimpista_areas
    ADD CONSTRAINT olimpista_areas_area_id_foreign FOREIGN KEY (area_id) REFERENCES public.areas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.olimpista_areas
    ADD CONSTRAINT olimpista_areas_olimpista_id_foreign FOREIGN KEY (olimpista_id) REFERENCES public.olimpistas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.olimpista_grupos
    ADD CONSTRAINT olimpista_grupos_grupo_id_foreign FOREIGN KEY (grupo_id) REFERENCES public.grupos(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.olimpista_grupos
    ADD CONSTRAINT olimpista_grupos_olimpista_id_foreign FOREIGN KEY (olimpista_id) REFERENCES public.olimpistas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.olimpistas
    ADD CONSTRAINT olimpistas_colegio_id_foreign FOREIGN KEY (colegio_id) REFERENCES public.colegios(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.olimpistas
    ADD CONSTRAINT olimpistas_grado_id_foreign FOREIGN KEY (grado_id) REFERENCES public.grados(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.olimpistas
    ADD CONSTRAINT olimpistas_tutor_id_foreign FOREIGN KEY (tutor_id) REFERENCES public.tutors(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.provincias
    ADD CONSTRAINT provincias_departamento_id_foreign FOREIGN KEY (departamento_id) REFERENCES public.departamentos(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.rol_menus
    ADD CONSTRAINT rol_menus_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES public.menus(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.rol_menus
    ADD CONSTRAINT rol_menus_rol_id_foreign FOREIGN KEY (rol_id) REFERENCES public.rols(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.tutor_olimpistas
    ADD CONSTRAINT tutor_olimpistas_olimpista_id_foreign FOREIGN KEY (olimpista_id) REFERENCES public.olimpistas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.tutor_olimpistas
    ADD CONSTRAINT tutor_olimpistas_tutor_id_foreign FOREIGN KEY (tutor_id) REFERENCES public.tutors(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.usuario_areas
    ADD CONSTRAINT usuario_areas_area_id_foreign FOREIGN KEY (area_id) REFERENCES public.areas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.usuario_areas
    ADD CONSTRAINT usuario_areas_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.usuario_fases
    ADD CONSTRAINT usuario_fases_fase_id_foreign FOREIGN KEY (fase_id) REFERENCES public.fases(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.usuario_fases
    ADD CONSTRAINT usuario_fases_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.usuario_rols
    ADD CONSTRAINT usuario_rols_rol_id_foreign FOREIGN KEY (rol_id) REFERENCES public.rols(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.usuario_rols
    ADD CONSTRAINT usuario_rols_usuario_id_foreign FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.verificacion_cierres
    ADD CONSTRAINT verificacion_cierres_fase_id_foreign FOREIGN KEY (fase_id) REFERENCES public.fases(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.verificacion_cierres
    ADD CONSTRAINT verificacion_cierres_usuario_encargado_id_foreign FOREIGN KEY (usuario_encargado_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.verificacion_cierres
    ADD CONSTRAINT verificacion_cierres_usuario_evaluador_id_foreign FOREIGN KEY (usuario_evaluador_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;