CREATE TABLE IF NOT EXISTS Blocos (
    id SERIAL NOT NULL,
    nome VARCHAR(55) NOT NULL,
    descricao VARCHAR(200),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Gerenciadores (
    id SERIAL NOT NULL,
    nomeCompleto VARCHAR(55) NOT NULL,
    email VARCHAR(55) NOT NULL,
    senha VARCHAR(55) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    ehAdmin BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Usuarios (
    id SERIAL NOT NULL,
    nomeCompleto VARCHAR(55) NOT NULL,
    email VARCHAR(55) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Quadras (
    id SERIAL NOT NULL,
    nome VARCHAR(55) NOT NULL,
    descricao VARCHAR(200),
    idBloco INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (idBloco) REFERENCES Blocos(id)
);

CREATE TABLE IF NOT EXISTS Reservas (
    id SERIAL NOT NULL,
    dataHoraInicio timestamp NOT NULL,
    dataHoraFim timestamp NOT NULL,
    ativo BOOLEAN NOT NULL,
    motivo VARCHAR(200) NOT NULL,
    idUsuario INTEGER,
    idQuadra INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(id),
    FOREIGN KEY (idQuadra) REFERENCES Quadras(id)
);

CREATE TABLE IF NOT EXISTS Gerenciadores_Reservas (
    id SERIAL NOT NULL,
    idGerenciador INTEGER,
    idReserva INTEGER,
    tipo INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY (idGerenciador) REFERENCES Gerenciadores(id),
    FOREIGN KEY (idReserva) REFERENCES Reservas(id)
);