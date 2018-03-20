module.exports = `    
    type User { 
      _id: ID!,
      username: String!, 
      firstName: String!,
      lastName: String!, 
      logs: [Logs!]
      apiKeys: [ApiKey!]
    }

    type ApiKey {
        _id: ID!,
        key: String!
        usage: Int!
    }

    type Logs {
        _id: ID!,
        date: String!,
        message: String!,
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
        _id: ID!
    }

    type CreateLog_Payload {
        _id: ID!
    }

    type Mutation { 
      createUser(username: String!, password: String!, firstName: String!, lastName: String!): User,
      addKeyToUser(_id: String!): User,
      deleteUser(_id: String!): User,
      createApiKey(userId: String!, key: String!): CreateApiKey_Payload,
      createLog(_id: String!, message: String!, contacts: [String]): CreateLog_Payload, 
    }

`;
