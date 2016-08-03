var enrollFunc = require('./index');
var enroll = enrollFunc.enrollFunc


exports.loginRes = function(req, res){
  //res.send(req.body.user + req.body.pswd);
	enroll(req.body.user,req.body.pswd,function (err, enrollment){
		 if (err) {
		    	res.send("enroll  Failed to get " + req.body.user );
		        // Exit the test script after a failure
		      
		 }
		 else
			 {
			    
		     	 res.render('loginRes', { name: req.body.user });
			 }
	});
};