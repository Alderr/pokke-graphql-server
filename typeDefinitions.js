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
      logs: [Log!]
      apiKeys: [ApiKey!]
    }

    type ApiKey {
        _id: ID!,
        key: String!
        user: User!
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

    type Mutation { 
      createUser(username: String!, password: String!, firstName: String!, lastName: String!): User,
      deleteUser(_id: String!): User,
      createApiKey(userId: String!, key: String!): ApiKey,
      createLog(message: String!, email: String, phoneNumber: String): Log, 
    }

`;
