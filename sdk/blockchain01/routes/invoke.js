//Create a test chain
var path = require('path');
var fs = require('fs');
var util = require('util');
var getUsertfnc = require('./index');

var getUser = getUsertfnc.getUser


var testChaincodeName = "mycc";

var test_user_Member1;
var testChaincodeID;
var deltaAB = "10";


function invoke(){
	 getUser(test_user1.name, function (err, user) {
	    if (err) {
	    	console.log("invoke Failed to get " + test_user1.name + " ---> ", err);
	        // Exit the test script after a failure
	        process.exit(1);
	    } else {
	        test_user_Member1 = user;

	        console.log(" Successfully registered and enrolled " + test_user_Member1.getName());
	        //deploy
	        //Construct the deploy request
	        // Construct the invoke request
	        var invokeRequest = {
	            // Name (hash) required for invoke
	            chaincodeID: testChaincodeName,
	            // Function to trigger
	            fcn: "invoke",
	            // Parameters for the invoke function
	            args: ["d", "k", deltaAB]
	        };

	        // Trigger the invoke transaction
	        var invokeTx = test_user_Member1.invoke(invokeRequest);

	     
	    }
	});
}




exports.invoke = function(req, res){
	res.render('invoke', { title: 'Blockchain IBM' , invoke: invoke()});
  
};