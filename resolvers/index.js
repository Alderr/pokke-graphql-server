const apiKeyResolver = require('./apiKeysResolver');
const userResolver = require('./userResolver');

const resolvers = [apiKeyResolver, userResolver];

module.exports = resolvers.reduce((accObj, currObj) => {
  Object.keys(currObj).forEach((key) => {
    // 1st level: query, mutation, subs
    Object.keys(currObj[key]).forEach((nextLvKey) => {
      // 2nd level: each resolver
      accObj[key][nextLvKey] = currObj[key][nextLvKey];
    });
  });

  return accObj;
});
