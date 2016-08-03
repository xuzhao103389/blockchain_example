//Create a test chain
var path = require('path');
var fs = require('fs');
var util = require('util');
var getUsertfnc = require('./index');

var getUser = getUsertfnc.getUser


var testChaincodeName = "mycc";

var test_user_Member1;
var testChaincodeID;
var initA = "100";
var initB = "200";

test_user1 = {
		 name: "WebApp_MH",
		 role: 1, // Client
		 account: "bank_a",
		 affiliation: "00001"
		};

function deploy(){
 getUser(test_user1.name, function (err, user) {
    if (err) {
    	console.log("deploy  Failed to get " + test_user1.name + " ---> ", err);
        // Exit the test script after a failure
        process.exit(1);
    } else {
        test_user_Member1 = user;

        console.log(" Successfully registered and enrolled " + test_user_Member1.getName());
        //deploy
        //Construct the deploy request
        var deployRequest = {
        // Function to trigger
        fcn: "init",
        // Arguments to the initializing function
        args: ["d", initA, "k", initB]
        };

       // if (mode === 'dev') {
         // Name required for deploy in development mode
         deployRequest.chaincodeName = testChaincodeName;
        //} else {
         // Path (under $GOPATH) required for deploy in network mode
       //  deployRequest.chaincodePath = testChaincodePath;
       // }

        //Trigger the deploy transaction
        console.log("test_user_Member1.getname()=="+ test_user_Member1.getName())
        var deployTx = test_user_Member1.deploy(deployRequest);
        console.log("testChaincodeID:" + testChaincodeID);

     
    }
});
}



exports.deploy = function(req, res){
	res.render('deploy', { title: 'Blockchain IBM' , deploy: deploy()});
  
};