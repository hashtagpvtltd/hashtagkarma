var { graphql, buildSchema } = require('graphql');
var db = require('../db');

var schema = buildSchema(`
  input ActionInput{
    hashtag: String!
    isGood: Boolean!
    karma: Int!
    date: String!
    id: Int
  }

  type ActionOutput{
    action: Int
    karma: Int
  }

  type Query {
  	test: String
  }

  type Mutation {
    updateAction(input: ActionInput): ActionOutput
  }
`);

var root = {
  test: () => {
    return 'Love';
  },
  updateAction: (data, request) => {
    var sql = '';
    var input = data.input;
    if(input.id === undefined){
      input.id = 'null';
    }
    sql = "select * from updateAction(2, '"+input.hashtag+"', '"+input.isGood+"', "+input.karma+", '"+input.date+"', "+input.id+")";
    console.log(sql);

    return db.query(sql).then(function(result){
      var response = {}
      response.action = result[0][0].actionid;
      response.karma = result[0][0].totalkarma;
      return response;
    })
    .catch(function(error){
      console.log(error);
    });
  }
};

module.exports = {
  schema: schema,
  root: root
};