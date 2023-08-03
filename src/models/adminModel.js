const connection = require('./connection');

const listarAdms = async () => {
    const [admins] = await connection.execute('SELECT * FROM adm');
    return admins;
};

const consultarAdmId = async (id) => {
    const [admin] = await connection.execute('SELECT * FROM adm WHERE id = ?', [id]);
    return admin[0];
};

const cadastrarAdm = async (adm) => {
    const { nome, email, senha } = adm;
    const [admSalvo] = await connection.execute('INSERT INTO adm(nome, email, senha) VALUES(?, ?, ?) WHERE id = ?',
        [nome, email, senha, id]);
    const { insertId } = admSalvo;
    return consultarAdmId(insertId);
};

const atualizarAdm = async (id, adm) => {
    const { nome, email, senha } = adm;
    const [admAtualizado] = await connection.execute('UPDATE adm SET nome = ?, email = ?, senha = ? WHERE id = ?',
        [nome, email, senha, id]);
    return consultarAdmId(id);
};

const excluirAdm = async (id) => {
    const admExcluido = await connection.execute('DELETE FROM adm WHERE id = ?',  [id]);
    return admExcluido;
};

module.exports = {
    listarAdms,
    consultarAdmId,
    cadastrarAdm,
    atualizarAdm,
    excluirAdm
}