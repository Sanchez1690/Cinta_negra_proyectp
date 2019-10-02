const { Usuarios } = require('../models');

const crearUsuario = (data) => Usuarios.create(data);
const obtenerUsuarios = () => Usuarios.find({ isActive: true }).populate({
    path: 'publicaciones',
    model: 'publicaciones'
});
const obtenerUnUsuario = (id) => Usuarios.findOne({ _id: id, isActive: true }).populate({
    path: 'publicaciones',
    model: 'publicaciones'
});
const obtenerUsuarioEmail = (email) => Usuarios.findOne({ email, isActive: true });
const modificarUsuario = (id, data) => Usuarios.findByIdAndUpdate(id, { ...data }, { new: true });
const borrarUsuario = (id) => Usuarios.findByIdAndUpdate({ _id: id, isActive: true }, { isActive: false });

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUnUsuario,
    obtenerUsuarioEmail,
    modificarUsuario,
    borrarUsuario
};
