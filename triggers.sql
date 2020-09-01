CREATE OR REPLACE FUNCTION verificaCPFUsuario() RETURNS TRIGGER AS
$$
BEGIN
  IF(SELECT 1
  FROM Usuarios
  WHERE cpf LIKE NEW.cpf
  ) THEN
    RAISE EXCEPTION 'CPF para usuario já foi usado!';
  END IF;
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER verificaCPFUsuario BEFORE INSERT ON Usuarios
FOR EACH ROW EXECUTE PROCEDURE verificaCPFUsuario();

CREATE OR REPLACE FUNCTION verificaCPFGerenciador() RETURNS TRIGGER AS
$$
BEGIN
  IF(SELECT 1
  FROM Gerenciadores
  WHERE cpf::text LIKE NEW.cpf::text
  ) THEN
    RAISE EXCEPTION 'CPF para gerenciador já foi usado!';
  END IF;
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER verificaCPFGerenciador BEFORE INSERT ON Gerenciadores
FOR EACH ROW EXECUTE PROCEDURE verificaCPFGerenciador();

CREATE OR REPLACE FUNCTION verificaDataHoraInicioFim() RETURNS TRIGGER AS
$$
BEGIN
  IF(SELECT 1
     FROM Reservas
     WHERE NEW.datahorainicio < CURRENT_TIMESTAMP
     OR NEW.datahorafim < CURRENT_TIMESTAMP
    ) THEN
      RAISE EXCEPTION 'Data hora de inicio ou fim está invalida!';
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER verificaDataHoraInicioFim BEFORE INSERT ON Reservas
FOR EACH ROW EXECUTE PROCEDURE verificaDataHoraInicioFim();

CREATE OR REPLACE FUNCTION verificaConflitoAgendamento() RETURNS TRIGGER AS
$$
BEGIN
  IF(SELECT 1 
     FROM Reservas
     WHERE datahorainicio <= NEW.datahorainicio
     AND datahorafim >= NEW.datahorafim
     AND idquadra = NEW.idquadra
    ) THEN
      RAISE EXCEPTION 'Já existe um agendamento para este horário';
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER verificaConflitoAgendamento BEFORE INSERT ON Reservas
FOR EACH ROW EXECUTE PROCEDURE verificaConflitoAgendamento();
