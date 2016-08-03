
/*
 * GET home page.
 */

////////////////////////node js hfc register deploy invoke query ///////

//Create a test chain
var path = require('path');
var fs = require('fs');
var util = require('util');
var hfc = require('/opt/gopath/src/github.com/hyperledger/fabric/sdk/node');
var async = require('async');

var chain = hfc.newChain("testChain");
   
//
//Configure the test chain
//
//Set the directory for the local file-based key value store, point to the
//address of the membership service, and add an associated peer node.
//
//If the "tlsca.cert" file exists then the client-sdk will
//try to connect to the member services using TLS.
//The "tlsca.cert" is supposed to contain the root certificate (in PEM format)
//to be used to authenticate the member services certificate.
//
//Get the WebAppAdmin member

chain.setKeyValStore(hfc.newFileKeyValStore('/tmp/keyValStore'));
if (fs.existsSync("tlsca.cert")) {
 chain.setMemberServicesUrl("grpcs://localhost:50051", fs.readFileSync('tlsca.cert'));
} else {
 chain.setMemberServicesUrl("grpc://localhost:50051");
}
chain.addPeer("grpc://localhost:30303");

//
//Set the chaincode deployment mode to either developent mode (user runs chaincode)
//or network mode (code package built and sent to the peer).
//

var mode =  'dev';//by now just test the dev mode

if (mode === 'dev') {
 chain.setDevMode(true);
} else {
 chain.setDevMode(false);
}

//
//Configure test users
//
//Set the values required to register a user with the certificate authority.
//



var queryRes;
//
//Declare variables to store the test user Member objects returned after
//registration and enrollment as they will be used across multiple tests.
//

var test_user_Member1;

//
//Declare test variables that will be used to store chaincode values used
//across multiple tests.
//

//Path to the local directory containing the chaincode project under $GOPATH
var testChaincodePath = "github.com/chaincode_example02/";

//Chaincode hash that will be filled in by the deployment operation or
//chaincode name that will be referenced in development mode.
var testChaincodeName = "mycc";

//testChaincodeID will store the chaincode ID value after deployment.
var testChaincodeID;

//Initializing values for chaincode parameters

exports.registerfunc=function (name, cb) {
    chain.getUser(name, function (err, user) {
        if (err) return cb(err,null);
        if (user.isEnrolled()) return cb(null,user);
        // User is not enrolled yet, so perform both registration and enrollment
        // The chain registrar is already set inside 'Set chain registrar' test
        var registrationRequest = {
            enrollmentID: name,
            account: "bank_a",
            affiliation: "00001"
        };

        var temp = user.register(registrationRequest,  function(err, secretID){
        	  if (err) cb(err,null)
              cb(null,secretID)
        	
        });
        
    });

}

exports.enrollFunc =function (name, passwd,cb) {
    chain.getUser(name, function (err, user) {
        if (err) return cb(err);
        if (user.isEnrolled()) return cb(null,user);
       
        var registrationRequest = {
            enrollmentID: name,
            account: "bank_a",
            affiliation: "00001"
        };
        	user.enroll(passwd, function(err,enrollment){
        		 if (err) cb(err,null)
                 cb(null,enrollment)
        	});
        
        
    });

}

exports.getUser =function getUser(name, cb) {
    chain.getUser(name, function (err, user) {
        if (err) return cb(err);
        if (user.isEnrolled()) return cb(null,user);
        // User is not enrolled yet, so perform both registration and enrollment
        // The chain registrar is already set inside 'Set chain registrar' test
        var registrationRequest = {
            enrollmentID: name,
            account: "bank_a",
            affiliation: "00001"
        };
        
        
        /*
        user.registerAndEnroll(registrationRequest, function (err) {
            if (err) cb(err, null)
            cb(null, user)
        });
        */
        /*
       var tempSecret = user.register(registrationRequest, function (err, SecretID) {
           //if (err) cb(err, null)
          //  cb(null, user)
            console.log("secretID== "+ SecretID)
        });
        */
        
        var temp = user.register(registrationRequest,  function(err, secretID){
        	  if (err) cb(err, null)
              cb(null, user)
        	//console.log("secret.." + secretID)
        //	user.enroll(secretID, function(err,tempVar){console.log("hehe")})
        });
        
    });

}

/////////////////
//Enroll the WebAppAdmin member. WebAppAdmin member is already registered
//manually by being included inside the membersrvc.yaml file.
//



chain.getMember("WebAppAdmin9", function (err, WebAppAdmin) {
    if (err) {
    	 console.log("Failed to get WebAppAdmin member " + " ---> " + err);
    	  process.exit(1);
    } else {
    	console.log("successfully got webappserver member");
        // Enroll the WebAppAdmin member with the certificate authority using
        // the one time password hard coded inside the membersrvc.yaml.
        pw = "DJY27pEnl16d";
        WebAppAdmin.enroll(pw, function (err, crypto) {
            if (err) {
            	 console.log("Failed to enroll WebAppAdmin member " + " ---> " + err);
                // Exit the test script after a failure
                process.exit(1);
            } else {
            	console.log("Successfully enrolled WebAppAdmin member" /*+ " ---> " + JSON.stringify(crypto)*/);
                // Confirm that the WebAppAdmin token has been created in the key value store
                path = chain.getKeyValStore().dir + "/member." + WebAppAdmin.getName();

                fs.exists(path, function (exists) {
                    if (exists) {
                    	 console.log("Successfully stored client token" /*+ " ---> " + WebAppAdmin.getName()*/);
                    } else {
                        // Exit the test script after a failure
                    	console.log("Failed to store client token for " + WebAppAdmin.getName() + " ---> " + err);
                    	process.exit(1);
                    }
                });
            }
        });
    }
});
//
//Set the WebAppAdmin as the designated chain 'registrar' member who will
//subsequently register/enroll other new members. WebAppAdmin member is already
//registered manually by being included inside the membersrvc.yaml file and
//enrolled in the UT above.
//

chain.getMember("WebAppAdmin9", function (err, WebAppAdmin) {
    if (err) {
    	console.log("Failed to get WebAppAdmin member " + " ---> " + err);
        // Exit the test script after a failure
        process.exit(1);
    } else {
    	console.log("Successfully got WebAppAdmin member");

        // Set the WebAppAdmin as the designated chain registrar
        chain.setRegistrar(WebAppAdmin);

        // Confirm that the chain registrar is now WebAppAdmin
        console.log("chain.getRegistrar().getName()==" +  chain.getRegistrar().getName());
        
       
    }
});










    

exports.index = function(req, res){
	
  res.render('index', { title: 'Blockchain IBM' });
  
};



