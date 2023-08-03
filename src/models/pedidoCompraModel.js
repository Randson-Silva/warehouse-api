const connection = require('./connection');

const listarPedidos = async () => {
    const [pedidos] = await connection.execute('SELECT * FROM pedidos');
    return pedidos;
};

const consultarPedidoId = async (id) => {
    const [pedido] = await connection.execute('SELECT * FROM pedidos p WHERE p.id = ?', [id]);
    return pedido[0];
};

const cadastrarPedido = async (pedido) => {
    const { idFornecedor, idAlmoxarife, descricao, produto, quantidade } = pedido;
    const data = new Date(Date.now()).toLocaleDateString();
    const [pedidoSalvo] = await connection.execute('INSERT INTO pedidos(id_fornecedor, id_almoxarife, descricao, produto, data, quantidade) VALUES(?, ?, ?, ?, ?, ?)',
        [idFornecedor, idAlmoxarife, descricao, produto, data, quantidade]);
    const { insertId } = pedidoSalvo;
    return consultarPedidoId(insertId);
};

const atualizarPedido = async (id, pedido) => {
    const { idFornecedor, idAlmoxarife, descricao, produto, quantidade } = pedido;
    const data = new Date(Date.now()).toLocaleDateString();
    const [pedidoAtualizado] = await connection.execute('UPDATE pedidos SET id_fornecedor = ?, id_almoxarife = ?, descricao = ?, produto = ?, data = ?, quantidade = ? WHERE id = ?',
        [idFornecedor, idAlmoxarife, descricao, produto, data, quantidade, id]);
    return consultarPedidoId(id);
};

const excluirPedido = async (id) => {
    const pedidoExcluido = await connection.execute('DELETE FROM pedidos WHERE id = ?', [id]);
    return pedidoExcluido;
};

module.exports = {
    listarPedidos,
    consultarPedidoId,
    cadastrarPedido,
    atualizarPedido,
    excluirPedido
};