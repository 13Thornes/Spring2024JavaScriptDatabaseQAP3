CREATE TABLE IF NOT EXISTS public.games
(
    game_id integer NOT NULL DEFAULT nextval('games_game_id_seq'::regclass),
    game_name character varying(32) COLLATE pg_catalog."default" NOT NULL,
    developer character varying(32) COLLATE pg_catalog."default" NOT NULL,
    release_date date,
    genre character varying(32) COLLATE pg_catalog."default",
    CONSTRAINT games_pkey PRIMARY KEY (game_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.games
    OWNER to postgres;