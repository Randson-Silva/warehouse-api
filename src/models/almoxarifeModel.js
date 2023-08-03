const connection = require('./connection');

const consultarAlmoxarifes = async () => {
    const [almoxarifes] = await connection.execute('SELECT * FROM almoxarifes');
    return almoxarifes;
};

const consultarAlmoxarifeId = async (id) => {
    const [almoxarife] = await connection.execute('SELECT * FROM almoxarifes a WHERE a.id = ?', [id]);
    return almoxarife[0];
};

const cadastrarAlmoxarife = async (almoxarife) => {
    const { nome, senha, email, permissao } = almoxarife;
    const [almoxarifeSalvo] = await connection.execute('INSERT INTO almoxarifes(nome, senha, email, permissao) VALUES(?, ?, ?, ?)',
        [nome, senha, email, permissao]);
    const { insertId } = almoxarifeSalvo;
    return consultarAlmoxarifeId(insertId);
};

const atualizarAlmoxarife = async (id, almoxarife) => {
    const { nome, senha, email, permissao } = almoxarife;
    const [almoxarifeAtualizado] = await connection.execute('UPDATE almoxarifes SET nome = ?, senha = ?, email = ?, permissao = ? WHERE id = ?',
        [nome, senha, email, permissao, id]);
    return consultarAlmoxarifeId(id);
};

const excluirAlmoxarife = async (id) => {
    const almoxarifeExcluido = await connection.execute('DELETE FROM almoxarifes WHERE id = ?', [id]);
    return almoxarifeExcluido;
};

module.exports = {
    consultarAlmoxarifes,
    consultarAlmoxarifeId,
    cadastrarAlmoxarife,
    atualizarAlmoxarife,
    excluirAlmoxarife
};