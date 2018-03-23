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
        logs: [ApiKey_Log!]
    }

    type ApiKey_Log {
        _id: ID!
        date: String!
        subject: String!
        message: String!
        contact: String!
        status: String!
        valid: Boolean!
    }

    type Logs {
        _id: ID!
        date: String!
        subject: String!
        message: String!
        apiKey: String!
        contact: String!
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
        _id: String!
        message: String!
        subject: String!
        apiKey: String!
        contact: String!
    }

    input CreateApiKey_LogInput {
        _id: String!
        message: String!
        subject: String!
        contact: String!
    }
 
    type Mutation { 
        createUser(input: CreateUserInput!): User
        deleteUser(input: String): User
        addApiKey(input: String): ApiKey_Payload
        deleteApiKey(apiKeyId: String!): ApiKey_Payload
        createLog(input: CreateLogInput!): CreateLog_Payload

        incrementUsage (_id: String!): ApiKey
        resetUsage (_id: String!): ApiKey
        addLogToApiKey (input: CreateApiKey_LogInput!): ApiKey

        signIn(input: SignInInput!): Auth_Payload
    }

`;
