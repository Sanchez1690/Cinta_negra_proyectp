require('dotenv').config();
const { GraphQLServer, PubSub } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const resolvers = require('./src/resolvers');
const AuthDirective = require('./src/resolvers/Directivas/AuthDirective');
const verifyToken = require('./src/utils/verifayToken');

//const MONGO_URI = process.env.NODE_ENV == 'test' ? process.env.MONGO_TEST_URL : process.env.MONGO_URL;
//mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const mongo = mongoose.connection;

mongo.on('error', (error) => console.log(error)).once('open', () => console.log('Connected on database'));

const typeDefs = importSchema(__dirname + '/schema.graphql');
//const typeDefs = importSchema(__dirname, '/schema.graphql');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    }
});

const port = process.env.PORT || 4000;

const pubsub = new PubSub();

// const server = new GraphQLServer({typeDefs, resolvers});
const server = new GraphQLServer({
    schema,
    context: async (req) => ({
        ...req,
        pubsub,
        user: req.request ? await verifyToken(req.request): {}
    }) 
});

server.start({port},() => console.log('Works in port 4000 ;)'));

module.exports = {schema};
