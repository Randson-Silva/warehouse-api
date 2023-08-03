const produtoModel = require('../models/produtoModel');
const pedidoModel = require('../models/pedidoCompraModel');
const fornecedorModel = require('../models/fornecedorModel');

const listarProdutos = async (req, res) => {
    const produtos = await produtoModel.listarProdutos();
    return res.status(200).json(produtos);
};

const consultarProdutoId = async (req, res) => {
    const { id } = req.params;
    const produto = await produtoModel.consultarProdutoId(id);
    return res.status(200).json(produto);
};

const cadastrarProdutos = async (req, res) => {
    const produto = await produtoModel.cadastrarProdutos(req.body);
    return res.status(201).json(produto);
};

const atualizarProdutos = async (req, res) => {
    const { id } = req.params;
    const produto = await produtoModel.atualizarProdutos(id, req.body);
    return res.status(200).json(produto);
};

const excluirProduto = async (req, res) => {
    const { id } = req.params;
    await produtoModel.excluirProduto(id);
    return res.status(204).json();
};

const listarPedidos = async (req, res) => {
    const pedidos = await pedidoModel.listarPedidos();
    return res.status(200).json(pedidos);
};

const consultarPedidoId = async (req, res) => {
    const { id } = req.params;
    const pedido = await pedidoModel.consultarPedidoId(id);
    return res.status(200).json(pedido);
};

const cadastrarPedidos = async (req, res) => {
    const pedido = await pedidoModel.cadastrarPedido(req.body);
    return res.status(201).json(pedido);
};

const atualizarPedidos = async (req, res) => {
    const { id } = req.params;
    const pedido = await pedidoModel.atualizarPedido(id, req.body);
    return res.status(200).json(pedido);
};

const excluirPedido = async (req, res) => {
    const { id } = req.params;
    await pedidoModel.excluirPedido(id);
    return res.status(204).json();
};


const listarFornecedores = async (req, res) => {
    const fornecedores = await fornecedorModel.listarFornecedores();
    return res.status(200).json(fornecedores);
};

const consultarFornecedorId = async (req, res) => {
    const { id } = req.params;
    const fornecedor = await fornecedorModel.consultarFornecedorId(id);
    return res.status(200).json(fornecedor);
};

const cadastrarFornecedor = async (req, res) => {
    const fornecedor = await fornecedorModel.cadastrarFornecedor(req.body);
    return res.status(201).json(fornecedor);
};

const atualizarFornecedor = async (req, res) => {
    const { id } = req.params;
    const fornecedor = await fornecedorModel.atualizarFornecedor(id, req.body);
    return res.status(200).json(fornecedor);
};

const excluirFornecedor = async (req, res) => {
    const { id } = req.params;
    await fornecedorModel.excluirFornecedor(id);
    return res.status(204).json();
};

module.exports = {
    listarProdutos,
    consultarProdutoId,
    cadastrarProdutos,
    atualizarProdutos,
    excluirProduto,
    listarPedidos,
    consultarPedidoId,
    cadastrarPedidos,
    atualizarPedidos,
    excluirPedido,
    listarFornecedores,
    consultarFornecedorId,
    cadastrarFornecedor,
    atualizarFornecedor,
    excluirFornecedor
}