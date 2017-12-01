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

  type Action{
    isGood: Boolean!
    hashtag: String!
    karma: Int!
    id: Int
  }

  type Query {
    actions(date: String!): [Action]
    karma: Int
  }

  type Mutation {
    updateAction(input: ActionInput): ActionOutput
  }
`);

// temporary
const ACTOR = 6;

var root = {
  karma: (data, request) => {
    let sql = "select total from getKarma("+ACTOR+")";
    return db.query(sql).then( result => {
      return result[0][0].total
    })
    .catch( error => {
      console.log(error);
    })
  },
  actions: (data, request) => {
    let sql = "select * from actionView where actor = "+ACTOR+" and \"recordedForDate\" = '"+data.date+"'";
    return db.query(sql).then(function(result){
      return result[0];
    })
    .catch(function(error){
      console.log(error);
    });
  },
  updateAction: (data, request) => {
    var sql = '';
    var input = data.input;
    if(input.id === undefined){
      input.id = 'null';
    }
    sql = "select * from updateAction("+ACTOR+", '"+input.hashtag+"', '"+input.isGood+"', "+input.karma+", '"+input.date+"', "+input.id+")";
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