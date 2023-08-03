const connection = require('./connection');

const listarRequisicoes = async () => {
    const [requisicoes] = await connection.execute('SELECT * FROM requisicao');
    return requisicoes;
};

const consultarRequisicaoId = async (id) => {
    const [requisicao] = await connection.execute('SELECT * FROM requisicao r WHERE r.id = ?', [id]);
    return requisicao[0];
};

const cadastrarRequisicao = async (requisicao) => {
    const { idRequisitante, descricao, nomeProduto } = requisicao;
    const data = new Date(Date.now()).toLocaleDateString();
    const [requisicaoSalva] = await connection.execute('INSERT INTO requisicao(id_requisitante, descricao, data, nome_produto) VALUES(?, ?, ?, ?)',
        [idRequisitante, descricao, data, nomeProduto]);
    const { insertId } = requisicaoSalva;
    return consultarRequisicaoId(insertId);
};

const atualizarRequisicao = async (id, requisicao) => {
    const { idRequisitante, descricao, nomeProduto } = requisicao;
    const data = new Date(Date.now()).toLocaleDateString();
    const [requisicaoAtualizada] = await connection.execute('UPDATE requisicao SET id_requisitante = ?, descricao = ?, data = ?, nome_produto = ? WHERE id = ?',
        [idRequisitante, descricao, data, nomeProduto, id]);
    return consultarRequisicaoId(id);
};

const excluirRequisicao = async (id) => {
    const requisicaoExcluida = await connection.execute('DELETE FROM requisicao WHERE id = ?', [id]);
    return requisicaoExcluida;
};

module.exports = {
    listarRequisicoes,
    consultarRequisicaoId,
    cadastrarRequisicao,
    atualizarRequisicao,
    excluirRequisicao
};