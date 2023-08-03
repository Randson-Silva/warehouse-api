const requisicaoModel = require('../models/requisicaoModel');

const listarRequisicoes = async (req, res) => {
    const requisicoes = await requisicaoModel.listarRequisicoes();
    return res.status(200).json(requisicoes);
};

const consultarRequisicaoId = async (req, res) => {
    const { id } = req.params;
    const requisicao = await requisicaoModel.consultarRequisicaoId(id);
    return res.status(200).json(requisicao);
};

const cadastrarRequisicao = async (req, res) => {
    const requisicao = await requisicaoModel.cadastrarRequisicao(req.body);
    return res.status(200).json(requisicao);
};

const atualizarRequisicao = async (req, res) => {
    const { id } = req.params;
    const requisicao = await requisicaoModel.atualizarRequisicao(id, req.body);
    return res.status(200).json(requisicao);
};

const excluirRequisicao = async (req, res) => {
    const { id } = req.params;
    await requisicaoModel.excluirRequisicao(id);
    return res.status(204).json();
};

module.exports = {
    listarRequisicoes,
    consultarRequisicaoId,
    cadastrarRequisicao,
    atualizarRequisicao,
    excluirRequisicao
};