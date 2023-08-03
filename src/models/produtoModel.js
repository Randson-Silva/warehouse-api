const connection = require('./connection');

const listarProdutos = async () => {
    const [produtos] = await connection.execute('SELECT * FROM produtos');
    return produtos;
};

const consultarProdutoId = async (id) => {
    const [produto] = await connection.execute('SELECT * FROM produtos p WHERE p.id = ?', [id]);
    return produto[0];
};

const cadastrarProdutos = async (produto) => {
    const { idFornecedor, nome, descricao, tipo, quantidade, valor, unidade, valorTotal } = produto;
    const [produtoSalvo] = await connection.execute('INSERT INTO produtos(id_fornecedor, nome, descricao, tipo, quantidade, valor, unidade, valor_total) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
        [idFornecedor, nome, descricao, tipo, quantidade, valor, unidade, valorTotal]);
    const { insertId } = produtoSalvo;
    return consultarProdutoId(insertId);
};

const atualizarProdutos = async (id, produto) => {
    const { nome, descricao, tipo, quantidade, valor, unidade, valorTotal } = produto;
    const [produtoAtualizado] = await connection.execute('UPDATE produtos SET nome = ?, descricao = ?, tipo = ?, quantidade = ?, valor = ?, unidade = ?, valor_total = ? WHERE id = ?',
        [nome, descricao, tipo, quantidade, valor, unidade, valorTotal, id]);
    return consultarProdutoId(id);
};

const excluirProduto = async (id) => {
    const produtoExcluido = await connection.execute('DELETE FROM produtos WHERE id = ?', [id]);
    return produtoExcluido;
};

module.exports = {
    listarProdutos,
    consultarProdutoId,
    cadastrarProdutos,
    atualizarProdutos,
    excluirProduto
};