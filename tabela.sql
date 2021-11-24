CREATE TABLE jogos
(
    nome character varying NOT NULL,
    genero character varying NOT NULL,
    imagem character varying NOT NULL,
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    descritivo bigint NOT NULL,
    PRIMARY KEY(id)
)

INSERT INTO jogos (nome, genero, imagem, descritivo) VALUES
	('Beyond Two Souls', 'Ação', 'https://cdn1.epicgames.com/lavender/offer/BEYOND_1-2560x1440-78243e22ac01cc0262fcd84df9af6f18', 'asd')