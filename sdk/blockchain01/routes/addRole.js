exports.addRole = function(req,res){
	
		var url = req.url;
		var userName = url.split( "?" );  
		res.render('addRole', { name: userName[1]  });
		
	
};