var { graphql, buildSchema } = require('graphql');
var db = require('../db');

var schema = buildSchema(`
  type Query {
  	test: String
  }
`);

var root = {
  test: () => {
    return 'Love';
  },
};

module.exports = {
  schema: schema,
  root: root
};