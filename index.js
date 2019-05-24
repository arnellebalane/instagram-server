const {
    ApolloServer,
    gql
} = require('apollo-server');
const posts = require('./data/posts.json');
const users = require('./data/users.json');

const typeDefs = gql`
    type Query {
        posts: [Post]
        post(id: ID!): Post
        users: [User]
        user(id: ID!): User
    }

    type Post {
        id: ID!
        caption: String
        like_count: Int
        comments_count: Int
        media_url: String
        permalink: String
    }

    type User {
        id: ID!
        name: String
        handle: String
    }
`;

const resolvers = {
    Query: {
        posts(parent, args) {
            return posts;
        },
        post(parent, args) {
            return posts.find(post => post.id === args.id);
        },
        users(parent, args) {
            return users;
        },
        user(parent, args) {
            return users.find(user => user.id === args.id);
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
