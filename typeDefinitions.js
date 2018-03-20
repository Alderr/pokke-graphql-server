module.exports = `
  type Query { 
      books: [Book] 
    }
    
  type Book { 
      title: String, 
      author: String 
    }
`;
