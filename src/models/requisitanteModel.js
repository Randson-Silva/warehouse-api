const connection = require('./connection');

const listarRequisitante = async () => {
    const [requisitantes] = await connection.execute('SELECT * FROM requisitante');
    return requisitantes;
};

const consultarRequisitanteId = async (id) => {
    const [requisitante] = await connection.execute('SELECT * FROM requisitante WHERE id = ?', [id]);
    return requisitante[0];
};

const cadastrarRequisitante = async (requisitante) => {
    const { nome, depto, email, senha, permissao } = requisitante;
    const [requisitanteSalvo] = await connection.execute('INSERT INTO requisitante(nome, depto, email, senha, permissao) VALUES(?, ?, ?, ?, ?',
        [nome, depto, email, senha, permissao]);
    const { insertId } = requisitanteSalvo;
    return consultarRequisitanteId(insertId);
};

const atualizarRequisitante = async (id, requisitante) => {
    const { nome, depto, email, senha, permissao } = requisitante;
    const [requisitanteAtualizado] = await connection.execute('UPDATE requisitante SET nome = ?, depto = ?, email = ?, senha = ?, permissao = ? WHERE id = ?',
        [nome, depto, email, senha, permissao, id]);
    return consultarRequisitanteId(id);
};

const excluirRequisitante = async (id) => {
    const requisitanteExcluido = await connection.execute('DELETE FROM requisitante WHERE id = ?', [id]);
    return requisitanteExcluido;
};

module.exports = {
    listarRequisitante,
    consultarRequisitanteId,
    cadastrarRequisitante,
    atualizarRequisitante,
    excluirRequisitante
};