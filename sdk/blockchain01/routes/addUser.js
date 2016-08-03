exports.addUser = function(req,res){
	var url = req.url;
	var userName = url.split( "?" );  
	res.render('addUser', { name: userName[1]  });
	
};