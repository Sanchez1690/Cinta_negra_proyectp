const { crearPublicacion, modificarPublicacion, borrarPublicacion } = require('../../services/PublicacionService');
// const { getOneAuthor} = require('../../services/AuthorServices');
const storage = require('../../utils/storage');

const crearUnaPublicacion = async (_, { data }, { user }) => {
    data.author = user._id;
    
    /* const author =await getOneAuthor(params.data.author);
    author.posts.push(post._id);
    author.save(); */
    if(data.PublicacionPhoto){
        const { createReadStream } = await data.PublicacionPhoto;
        const stream = createReadStream();
        const image = await storage({stream});
        data={...data,PublicacionPhoto:image.url};
    }
    const post = await crearPublicacion(data);
    user.posts.push(post.id);
    user.save();
    return post;
};

const modificarUnaPublicacion = async (_,{id, data }, { user }) => {
    if(data.PublicacionPhoto){
        const { createReadStream } = await data.PublicacionPhoto;
        const stream = createReadStream();
        const image = await storage({stream});
        data={...data,PublicacionPhoto:image.url};
    }
    const post = await modificarPublicacion(id, data, user);
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
