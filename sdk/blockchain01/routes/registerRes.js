var registerFunc = require('./index');
var register = registerFunc.registerfunc

exports.registerRes = function(req, res){
    
	var url = req.url;
	var userName = url.split( "?" );  

	register(userName[1], function(err, passwd){
		 if (err) {
		    	res.send("register  Failed to get " + userName[1] + " ---> ", err);
		        // Exit the test script after a failure
		        process.exit(1);
		    } 
		 else{
			 res.send(" register successfull,   username: " + userName[1] +";  authentication info  :"  + passwd);
		 }
	});
  
};