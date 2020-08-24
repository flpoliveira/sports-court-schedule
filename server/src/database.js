const client = require('./config/db');

console.log("droping triggers");

let query = `
DROP TRIGGER IF EXISTS verificaCPFUsuario ON Usuarios;
DROP TRIGGER IF EXISTS verificaCPFGerenciador ON Gerenciadores;
DROP TRIGGER IF EXISTS verificaConflitoAgendamento ON Reservas;
DROP TRIGGER IF EXISTS verificaDataHoraInicioFim ON Reservas;
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
    }
    console.log("triggers successfully deleted!");
});

console.log("creating tables...");

query = `
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
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
    }
    console.log("tables successfully created!");
});


console.log("cleaning database...");

query = `
TRUNCATE Blocos, Gerenciadores, Usuarios, Quadras, Reservas, Gerenciadores_Reservas RESTART IDENTITY
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
    }
    console.log("tables successfully cleaned!");
});

console.log("inserting data...");

query = `
INSERT INTO Blocos (nome, descricao)
VALUES ('A', 'Bloco A'),
('B', 'Bloco B'),
('C', 'Bloco C');

INSERT INTO Gerenciadores (nomeCompleto, email, senha, cpf, ehAdmin)
VALUES ('Admin', 'admin', 'admin', '12345678901', true),
('Bolsista', 'bolsista', 'bolsista', '12345678902', false);

INSERT INTO Quadras (nome, descricao, idBloco) 
VALUES ('A', 'Quadra do Bloco A', 1),
('B', 'Quadra do Bloco B', 2),
('C', 'Quadra do Bloco C', 3);
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
    }
    console.log("data successfully inserted!");
});

console.log("selecting data...");

query = `
SELECT * FROM Blocos;
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
    }
    for (let row of res.rows) {
        console.log(row);
    }
});

query = `
SELECT * FROM Gerenciadores;
`;


client.query(query, (err, res) => {
    if (err) {
        console.error(err);
    }
    for (let row of res.rows) {
        console.log(row);
    }
    client.end();
});