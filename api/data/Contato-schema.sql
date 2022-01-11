CREATE TABLE IF NOT EXISTS Contato (
    serial INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    data DateTime NULL,
    codoperadora INT NULL,
    cor varchar(255) DEFAULT 'red'
);