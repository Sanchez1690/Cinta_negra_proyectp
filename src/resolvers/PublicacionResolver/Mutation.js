const { crearPublicacion, modificarPublicacion, borrarPublicacion } = require('../../services/PublicacionService');
// const { getOneAuthor} = require('../../services/AuthorServices');

const crearUnaPublicacion = async (_, { data }, { user }) => {
    data.author = user._id;
    const post = await crearPublicacion(data);
    /* const author =await getOneAuthor(params.data.author);
    author.posts.push(post._id);
    author.save(); */
    user.posts.push(post.id);
    user.save();
    return post;
};

const modificarUnaPublicacion = async (_, params, { user }) => {
    const post = await modificarPublicacion(params.id, params.data, user);
    if (!post) throw new Error('Post not exist');
    return post;
};

const borrarUnaPublicacion = async (_, params, { user }) => {
    const post = await borrarPublicacion(params.id, user);
    if (!post) throw new Error('Post not exist');
    return post;
};

module.exports = {
    crearUnaPublicacion,
    modificarUnaPublicacion,
    borrarUnaPublicacion
};
