const {
    ApolloServer,
    gql
} = require('apollo-server');
const posts = require('./data/posts.json');

const typeDefs = gql`
    type Query {
        posts: [Post]
    }

    type Post {
        id: ID!
        caption: String
        like_count: Int
        comments_count: Int
        media_url: String
        permalink: String
    }
`;

const resolvers = {
    Query: {
        posts(parent, args) {
            return posts;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});

server.listen().then(({url}) => {
    console.log(`Server listening on ${url}`);
});
