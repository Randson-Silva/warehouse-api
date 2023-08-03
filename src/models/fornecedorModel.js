const connection = require('./connection');

const listarFornecedores = async () => {
    const [fornecedores] = await connection.execute('SELECT * FROM fornecedores');
    return fornecedores;
};

const consultarFornecedorId = async (id) => {
    const [fornecedor] = await connection.execute('SELECT * FROM fornecedores WHERE id = ?', [id]);
    return fornecedor[0];
};

const cadastrarFornecedor = async (fornecedor) => {
    const { cpfCnpj, fone, endereco, razaoSocial, email, cep, representante, banco, agencia, conta, cidade, nome } = fornecedor;
    const [fornecedorSalvo] = await connection.execute('INSERT INTO fornecedores(cpf_cnpj, fone, endereco, razao_social, email, cep, representante, banco, agencia, conta, cidade, nome) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cpfCnpj, fone, endereco, razaoSocial, email, cep, representante, banco, agencia, conta, cidade, nome]);
    const { insertId } = fornecedorSalvo;
    return consultarFornecedorId(insertId);
};

const atualizarFornecedor = async (id, fornecedor) => {
    const { cpfCnpj, fone, endereco, razaoSocial, email, cep, representante, banco, agencia, conta, cidade, nome } = fornecedor;
    const [fornecedorAtualizado] = await connection.execute('UPDATE fornecedores SET cpf_cnpj = ?, fone = ?, endereco = ?, razao_social = ?, email = ?, cep = ?, representante = ?, banco = ?, agencia = ?, conta = ?, cidade = ?, nome = ? WHERE id = ?',
        [cpfCnpj, fone, endereco, razaoSocial, email, cep, representante, banco, agencia, conta, cidade, nome, id]);
    return consultarFornecedorId(id);
};

const excluirFornecedor = async (id) => {
    const fornecedorExcluido = await connection.execute('DELETE FROM fornecedores WHERE id = ?', [id]);
    return fornecedorExcluido;
};

module.exports = {
    listarFornecedores,
    consultarFornecedorId,
    cadastrarFornecedor,
    atualizarFornecedor,
    excluirFornecedor
}