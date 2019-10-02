const { obtenerUsuarios, obtenerUnUsuario } = require('../../services/UsuarioService');

const obtenerAllUsuarios = async () => {
    const usuario = await obtenerUsuarios();
    return usuario;
};

const obtenerSingleUsuario = async (_, params) => {
    const usuario = await obtenerUnUsuario(params.id);
    if (!usuario) throw new Error('Usuario no existe');
    return usuario;
};

const me = async (root, params, { user }) => {
    const usuario = await obtenerUnUsuario(user._id);
    return usuario;
};

module.exports = {
    obtenerAllUsuarios,
    obtenerSingleUsuario,
    me
};
