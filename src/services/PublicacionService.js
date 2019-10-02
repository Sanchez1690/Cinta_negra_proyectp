const { Publicaciones } = require('../models');

const crearPublicacion = async (data) => {
    const publicacion = await Publicaciones.create(data);
    const populatedPublicacion = await obtenerUnaPublicacion(publicacion._id);
    return populatedPublicacion;
};
const obtenerPublicaciones = () => Publicaciones.find({ isActive: true }).populate({
    path: 'usuarios',
    model: 'usuarios'
});
const obtenerUnaPublicacion = (id) => Publicaciones.findOne({ _id: id, isActive: true }).populate({
    path: 'usuarios',
    model: 'usuarios'
});
const modificarPublicacion = (id, data, usuario) => Publicaciones.findOneAndUpdate({ _id: id, usuario, isActive: true }, { ...data }, { new: true });
const borrarPublicacion = (id, usuario) => Publicaciones.findByIdAndUpdate({ _id: id, usuario, isActive: true }, { isActive: false });

module.exports = {
    crearPublicacion,
    obtenerPublicaciones,
    obtenerUnaPublicacion,
    modificarPublicacion,
    borrarPublicacion
};
