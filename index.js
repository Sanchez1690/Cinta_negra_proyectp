require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const resolvers = require('./src/resolvers');
const AuthDirective = require('./src/resolvers/Directivas/AuthDirective');
const verifyToken = require('./src/utils/verifayToken');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const mongo = mongoose.connection;

mongo.on('error', (error) => console.log(error)).once('open', () => console.log('Connected on database'));

const typeDefs = importSchema(__dirname, '/schema.graphql');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    }
});

// const server = new GraphQLServer({typeDefs, resolvers});
const server = new GraphQLServer({
    schema,
    context: async ({ request }) => verifyToken(request)
});
server.start(() => console.log('Works in port 4000 ;)'));
