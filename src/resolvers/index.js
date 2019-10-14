const { Query: QueryUsuario, Mutation: MutationUsusario } = require('./UsuarioResolver');
const { Query: QueryPublicacion, Mutation: MutationPublicacion } = require('./PublicacionResolver');
const { publicacion } =require('./Subscriptions');
const { URLResolver, EmailAddressResolver } = require('graphql-scalars');

module.exports = {
    EmailAddress: EmailAddressResolver,
    URL: URLResolver,
    Query: {
        ...QueryUsuario, // split object,
        ...QueryPublicacion
    },
    Mutation: {
        ...MutationUsusario,
        ...MutationPublicacion
    },
    Subscription:{
        publicacion
    }
};
