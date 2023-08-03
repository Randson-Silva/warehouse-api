const express = require('express');

const autenticacaoController = require('./autenticação/controllers/autenticacaoController');

const almoxarifeController = require('./controllers/almoxarifeController');
const requisitanteController = require('./controllers/requisitanteController');
const admController = require('./controllers/admController');

const router = express.Router();

//rotas de autenticação
router.post('/api/auth/register', autenticacaoController.register);
router.post('/api/auth/login', autenticacaoController.login);
router.post('/api/auth/refresh', autenticacaoController.refresh);

//rotas do almoxarife
router.get('/api/almoxarife/produtos', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.listarProdutos);
router.get('/api/almoxarife/produtos/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.consultarProdutoId);
router.post('/api/almoxarife/produtos', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.cadastrarProdutos);
router.put('/api/almoxarife/produtos/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.atualizarProdutos);
router.delete('/api/almoxarife/produtos/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.excluirProduto);

router.get('/api/almoxarife/pedidos', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.listarPedidos);
router.get('/api/almoxarife/pedidos/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.consultarPedidoId);
router.post('/api/almoxarife/pedidos', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.cadastrarPedidos);
router.put('/api/almoxarife/pedidos/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.atualizarPedidos);
router.delete('/api/almoxarife/pedidos/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.excluirPedido);

router.get('/api/almoxarife/fornecedores', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.listarFornecedores);
router.get('/api/almoxarife/fornecedores/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.consultarFornecedorId);
router.post('/api/almoxarife/fornecedores', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.cadastrarFornecedor);
router.put('/api/almoxarife/fornecedores/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.atualizarFornecedor);
router.delete('/api/almoxarife/fornecedores/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(2), almoxarifeController.excluirFornecedor);

//rotas do requisitante
router.get('/api/requisitante/requisicoes', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(3), requisitanteController.listarRequisicoes);
router.get('/api/requisitante/requisicoes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(3), requisitanteController.consultarRequisicaoId);
router.post('/api/requisitante/requisicoes', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(3), requisitanteController.cadastrarRequisicao);
router.put('/api/requisitante/requisicoes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(3), requisitanteController.atualizarRequisicao);
router.delete('/api/requisitante/requisicoes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(3), requisitanteController.excluirRequisicao);

//rotas do administrador
router.get('/api/adm/almoxarifes', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.consultarAlmoxarifes);
router.get('/api/adm/almoxarifes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.consultarAlmoxarifeId);
router.post('/api/adm/almoxarifes', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.cadastrarAlmoxarife);
router.put('/api/adm/almoxarifes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.atualizarAlmoxarife);
router.delete('/api/adm/almoxarifes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.excluirAlmoxarife);

router.get('/api/adm/requisitantes', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.listarRequisitante);
router.get('/api/adm/requisitantes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.consultarRequisitanteId);
router.post('/api/adm/requisitantes', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.cadastrarRequisitante);
router.put('/api/adm/requisitantes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.atualizarRequisitante);
router.delete('/api/adm/requisitantes/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.excluirRequisitante);

router.get('/api/adm', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.listarAdms);
router.get('/api/adm/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.consultarAdmId);
router.post('/api/adm', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.cadastrarAdm);
router.put('/api/adm/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.atualizarAdm);
router.delete('/api/adm/:id', autenticacaoController.checkToken, autenticacaoController.verificarPermissao(1), admController.excluirAdm);

module.exports = router;