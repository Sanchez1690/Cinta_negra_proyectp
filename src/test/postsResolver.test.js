/* eslint-disable no-undef */
//const { graphql } = require('graphql');
//const { schema } = require('../../index');
//const { createAuthor } = require('../services/AuthorService');
//const setupTest =  require('./helpers');

/*
const MUTATION_ADD_POST =  `
    mutation addPost($data:PostInput!){
        createNewPost(data:$data){
            _id,
            title,
            author{
                email
            }
        }
    }

`;


describe('Testing Create Post Mutation', () => {
    beforeEach(async () => await setupTest());

    it('Should Create a Post', () => {

        const makeTest =  async() => {
            const author = {
                first_name:'prueba',
                last_name:'prueba',
                email:'prueba@prueba.com',
                password:'prueba'
            };

            const data = {
                title: 'Post de prueba',
                content: 'Contenido de post de prueba'
            };

            const user = await createAuthor(author);
            graphql(schema,MUTATION_ADD_POST,null,{ user }, { data }).then(res => {
                expect(res.data.createNewPost).toHaveProperty('_id');
                expect(res.data.createNewPost.author).toHaveProperty('email',author.email);
            });
           

        };

        makeTest();
    });

    it('Should Not Create a post ', () => {
        const makeTest = async() => {
            const author = {
                first_name:'prueba',
                last_name:'prueba',
                email:'prueba@prueba.com',
                password:'prueba'
            };
    
            const data = {
                content: 'Contenido de post de prueba'
            };
    
            const user = await createAuthor(author);
            graphql(schema,MUTATION_ADD_POST,null,{ user }, { data }).then(res => {
                expect(res).toHaveProperty('errors');
            });
        };
        makeTest();

    });


});
*/