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
        logs: [Logs]    
    }

    input CreateUserInput {
        username: String!
        password: String!
        firstName: String!
        lastName: String!
    }

    input CreateLogInput {
        id: String!
        message: String!
        contacts: [String!]!
    }

    type Mutation { 
        createUser(input: CreateUserInput!): User
        deleteUser(_id: String!): User
        addApiKey(_id: String!): User
        deleteApiKey(_id: String!, apiKeyId): User
        createLog(input: CreateLogInput!): CreateLog_Payload
    }

`;
