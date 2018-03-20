module.exports = `    
    type Book { 
      title: String, 
      author: String 
    }

    type User { 
      _id: ID!,
      username: String!, 
      firstName: String!,
      lastName: String!, 
      log: [Log!]
      apiKeys: [ApiKey!]
    }

    type ApiKey {
        _id: ID!,
        key: String!
        usage: Int!
    }

    type Log {
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
      books: [Book],
      users: [User],
      apiKeys: [ApiKey], 
    }

    type CreateLog_Payload {
        _id: ID!
    }

    type Mutation { 
      createUser(username: String!, password: String!, firstName: String!, lastName: String!): User,
      addKeyToUser(_id: String!): User,
      deleteUser(_id: String!): User,
      createApiKey(userId: String!, key: String!): ApiKey,
      createLog(_id: String!, message: String!, contacts: [String]): CreateLog_Payload, 
    }

`;
