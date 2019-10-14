const { crearPublicacion, modificarPublicacion, borrarPublicacion } = require('../../services/PublicacionService');
// const { getOneAuthor} = require('../../services/AuthorServices');
const storage = require('../../utils/storage');

const crearUnaPublicacion = async (_, { data }, { user,pubsub }) => {
    data.usuario = user._id;
    
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
    user.publicaciones.push(post.id);
    user.save();
    pubsub.publish('post',{
        post:{
            mutation:'CREATED',
            data:post
        }
    });
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

const borrarUnaPublicacion = async (_, params, { user,pubsub }) => {
    const post = await borrarPublicacion(params.id, user);
    if (!post) throw new Error('Post not exist');
    pubsub.publish('post',{
        post:{
            mutation:'DELETED',
            data:post
        }
    });
    return post;
};

module.exports = {
    crearUnaPublicacion,
    modificarUnaPublicacion,
    borrarUnaPublicacion
};
