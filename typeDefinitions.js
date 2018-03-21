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
        _id: ID!
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
    
    type Payload {
        _id: ID
    }

    type CreateLog_Payload {
        _id: ID
        logs: [Logs]    
    }

    type Auth_Payload {
        authToken: String!   
    }

    type ApiKey_Payload {
        _id: ID 
    }

    input SignInInput {
        username: String!
        password: String!
    }

    input CreateUserInput {
        username: String!
        password: String!
        firstName: String!
        lastName: String!
    }

    input CreateLogInput {
        message: String!
        contacts: [String!]!
    }
 
    type Mutation { 
        createUser(input: CreateUserInput!): User
        deleteUser(input: String): User
        addApiKey(input: String): ApiKey_Payload
        deleteApiKey(apiKeyId: String!): ApiKey_Payload
        createLog(input: CreateLogInput!): CreateLog_Payload

        incrementUsage (_id: String!): ApiKey
        resetUsage (_id: String!): ApiKey

        signIn(input: SignInInput!): Auth_Payload
    }

`;
