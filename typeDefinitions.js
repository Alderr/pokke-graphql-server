module.exports = `    
    type User { 
        _id: ID!
        username: String!
        firstName: String!
        lastName: String!
        logs: [Logs!]
        apiKeys: [ApiKey!]
    }

    type ApiKey {
        _id: ID!,
        key: String!
        usage: Int!
    }

    type Logs {
        _id: ID!
        date: String!
        message: String!
        contacts: [Contact!]
    }

    type Contact {
        email: String,
        phoneNumber: String,
    }

    type Query { 
        users: [User],
        apiKeys: [ApiKey], 
    }

    type CreateApiKey_Payload {
        _id: ID
    }

    type CreateLog_Payload {
        _id: ID
    }

    input CreateUserInput {
        username: String!
        password: String!
        firstName: String!
        lastName: String!
    }

    input CreateLogInput {
        username: String!
        password: String!
        firstName: String!
        lastName: String!
    }

    type Mutation { 
        createUser(input: CreateUserInput!): User
        deleteUser(_id: String!): User
        addKeyToUser(_id: String!): User
        createLog(_id: String!, message: String!, contacts: [String]): CreateLog_Payload
    }

`;
