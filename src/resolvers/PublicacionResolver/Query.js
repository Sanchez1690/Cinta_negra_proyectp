const { obtenerPublicaciones, obtenerUnaPublicacion } = require('../../services/PublicacionService');

const obtenerAllPublicaciones = async () => {
    const posts = await obtenerPublicaciones();
    return posts;
};

const obtenerSinlgePublicacion = async (_, params) => {
    const post = await obtenerUnaPublicacion(params.id);
    if (!post) throw new Error('Post not exist');
    return post;
};

module.exports = {
    obtenerAllPublicaciones,
    obtenerSinlgePublicacion
};
