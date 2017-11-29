var db = require('../db');
// Test DB Connection


var testSuite = new Promise((resolve, reject) => {
  db.authenticate().then( function() { 
    resolve(true);
  })
  .catch(function(err){
    reject(err);
  });
});

testSuite.then(function(){
  console.log('OK');
  process.exit(1);
})
.catch(function(err){
  console.log(err);
  process.exit(0);
});