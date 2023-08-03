const admModel = require('../models/adminModel');
const fornecedorModel = require('../models/fornecedorModel');
const almoxarifeModel = require('../models/almoxarifeModel');
const requisitanteModel = require('../models/requisicaoModel');

const listarAdms = async (req, res) => {
    const adms = await admModel.listarAdms();
    return res.status(200).json(adms);
};

const consultarAdmId = async (req, res) => {
    const { id } = req.params;
    const adm = await admModel.consultarAdmId(id);
    return res.status(200).json(adm);
};

const cadastrarAdm = async (req, res) => {
    const adm = await admModel.cadastrarAdm(req.body);
    return res.status(201).json(adm);
};

const atualizarAdm = async (req, res) => {
    const { id } = req.params;
    const admAtualizado = await admModel.atualizarAdm(id, req.body);
    return res.status(200).json(admAtualizado);
};

const excluirAdm = async (req, res) => {
    const { id } = req.params;
    await admModel.excluirAdm(id);
    return res.status(204).json();
};

const consultarAlmoxarifes = async (req, res) => {
    const almoxarifes = await almoxarifeModel.consultarAlmoxarifes();
    return res.status(200).json(almoxarifes);
};

const consultarAlmoxarifeId = async (req, res) => {
    const { id } = req.params;
    const almoxarife = await almoxarifeModel.consultarAlmoxarifeId(id);
    return res.status(200).json(almoxarife);
};

const cadastrarAlmoxarife = async (req, res) => {
    const almoxarife = await almoxarifeModel.cadastrarAlmoxarife(req.body);
    return res.status(201).json(almoxarife);
};

const atualizarAlmoxarife = async (req, res) => {
    const { id } = req.params;
    const almoxarife = await almoxarifeModel.atualizarAlmoxarife(id, req.body);
    return res.status(200).json(almoxarife);
};

const excluirAlmoxarife = async (req, res) => {
    const { id } = req.params;
    await almoxarifeModel.excluirAlmoxarife(id);
    return res.status(204).json();
};

const listarRequisitante = async (req, res) => {
    const requisitantes = await requisitanteModel.listarRequisitante();
    return res.status(200).json(requisitantes);
};

const consultarRequisitanteId = async (req, res) => {
    const { id } = req.params;
    const requisitante = await requisitanteModel.consultarRequisitanteId(id);
    return res.status(200).json(requisitante);
};

const cadastrarRequisitante = async (req, res) => {
    const requisitante = await requisitanteModel.cadastrarRequisitante(req.body);
    return res.status(201).json(requisitante);
};

const atualizarRequisitante = async (req, res) => {
    const { id } = req.params;
    const requisitante = await requisitanteModel.atualizarRequisitante(id, req.body);
    return res.status(200).json(requisitante);
};

const excluirRequisitante = async (req, res) => {
    const { id } = req.params;
    await requisitanteModel.excluirRequisitante(id);
    return res.status(204).json();
};

module.exports = {
    listarAdms,
    consultarAdmId,
    cadastrarAdm,
    atualizarAdm,
    excluirAdm,
    consultarAlmoxarifes,
    consultarAlmoxarifeId,
    cadastrarAlmoxarife,
    atualizarAlmoxarife,
    excluirAlmoxarife,
    listarRequisitante,
    consultarRequisitanteId,
    cadastrarRequisitante,
    atualizarRequisitante,
    excluirRequisitante
}