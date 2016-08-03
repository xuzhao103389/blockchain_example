var path = require('path');
var fs = require('fs');
var util = require('util');
var getUsertfnc = require('./index');

var getUser = getUsertfnc.getUser


var testChaincodeName = "mycc";

var test_user_Member1;
var testChaincodeID;



exports.query = function query(req,res){
	 getUser(test_user1.name, function (err, user) {
		 if (err) 
		   {
		   	   console.log("query : Failed to get " + test_user1.name + " ---> ", err);
		       // Exit the test script after a failure
		       process.exit(1);
		   } 
		   else 
		   {
		       test_user_Member1 = user;

		       console.log(" Successfully registered and enrolled " + test_user_Member1.getName());
		       //deploy
		       //Construct the deploy request
		       // Construct the invoke request
		    // Construct the query request
		       var queryRequest = {
		           // Name (hash) required for query
		           chaincodeID: testChaincodeName,
		           // Function to trigger
		           fcn: "query",
		           // Existing state variable to retrieve
		           args: ["k"]
		       };

		       // Trigger the query transaction

		     var   queryTx = test_user_Member1.query(queryRequest);
		     
		     queryTx.on("submitted",function(queryResults) {
		         console.log("submitted: results=%s",queryResults);
		       });
		     queryTx.on("complete",function(queryResults) {
		   	  //here change the response from .go language into a json format
		   	  JSON.stringify(queryResults);
		   	  global.queryRes = JSON.parse(queryResults.result.toString().split(" "));
		   	  console.log("complete: results:key == ",global.queryRes.Name +"; value == "+ global.queryRes.Amount);
		      res.render('query', { title: 'Blockchain IBM' , value: global.queryRes.Amount});
		     });
		    
		     queryTx.on("error",function(err) {
		         console.log("error: %j",err);
		     }); 
		     
		   }
	});
}



