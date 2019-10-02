const { crearUsuario, obtenerUnUsuario, borrarUsuario } = require('../../services/UsuarioService');
const authenticate = require('../../utils/authenticate');

const crearNuevoUsuario = async (_, params) => {
    const usuario = await crearUsuario(params.data);
    return usuario;
};

const modificarUnUsuario = async (_, params) => {
    const usuario = await obtenerUnUsuario(params.id);
    if (!usuario) throw new Error('Usuario no exise');
    Object.keys(params.data).forEach(key => usuario[key] = params.data[key]);
    // Object.keys(params.data).forEach(key = usuario[key] = params.data[key]);
    usuario.save({ new: true });
    return usuario;
};

const borrarUnUsuario = async (_, params) => {
    const usuario = await borrarUsuario(params.id);
    if (!usuario) throw new Error('Usuario no existe');
    return 'Usuario eliminado';
};

const login = async (_, params) => {
    const token = await authenticate(params).catch(e => { throw e; });
    return { token, message: 'Login Successful' };
};

module.exports = {
    crearNuevoUsuario,
    modificarUnUsuario,
    borrarUnUsuario,
    login
};
