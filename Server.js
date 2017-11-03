var express = require('express');
var crypto = require('crypto');
var mongojs = require('mongojs');
var db = mongojs('Hrm' , ['User', 'UserProfile' , 'Project']);
var app = express() ;
var bodyParser = require('body-parser');

// Generating a 16 character random salt.
var genRandomString = function(length) {
	return crypto.randomBytes(Math.ceil(length/2))
	.toString('hex')
	.slice(0,length);	
}
	
/*
 * Hashing the password with a cryptographic hash function 'sha512', and 
 * randomly generated salt.
 */
var sha512 = function(password, salt) {
	var hash = crypto.createHmac('sha512' , salt);
	hash.update(password);
	var value = hash.digest('hex');
	return {
		'salt':salt,
		'passwordHash':value
	}	
}

/* Creating a salted password hash for the user-entered password,
 * using a randomly generated salt and cryptographic hash function 'sha512'.
 */
function saltHashPassword(userpassword){
	var salt = genRandomString(16);
	var passwordData = sha512(userpassword, salt);
	return passwordData ;
}

app.use('/' , express.static(__dirname + '/' ));
app.use(bodyParser());

/* Updating an existing 'User' in the UserProfile collection with modified information from the 
 * 'Update Profile' form . Looking up the UserProfile collection by 'Username' of the modified user.
 */
app.post('/updatePerson', function(request,response){
	        var jsonUpdate  = request.body ;
			db.UserProfile.update({'Username' : jsonUpdate.Username}, {$set:
				{
				 'FirstName' :jsonUpdate.FirstName,
				 'LastName'  :jsonUpdate.LastName,
				 'Address'   : {
					          'Line1' : jsonUpdate.Address.Line1,
					          'Line2' : jsonUpdate.Address.Line2,
					          'City'  : jsonUpdate.Address.City,
					          'State' : jsonUpdate.Address.State
				             },
			     'Email'     : jsonUpdate.Email,
			     'Phone'     : jsonUpdate.Phone,
			     'Role'      : jsonUpdate.Role,
				}	
			} , function(err, result){
				if(result.nModified > 0){
					response.write('Success');
					response.end();
				}
				else {
					response.write('Failed');
					response.end();
				}
			});	
});


/* Inserting a new user into the 'User' collection, with username, password and role information.
 * Upon successful insert, inserting the same 'User' into the UserProfile collection,
 * with some additional information like Name, contact information and role.
 */
app.post('/addPerson' , function(request,response){	
	var jsonInsert = request.body ;
	console.log(jsonInsert);
	jsonInsert.Password = saltHashPassword(jsonInsert.Password);
	var userInsert = {
			'Username' : jsonInsert.Username,
			'Password' : jsonInsert.Password,
			'Role'     : jsonInsert.Role
	}
	db.User.insert(userInsert, function(err,data){
		if(err == null){
					jsonInsert._id = {
							$ref : 'User',
							$id  : data._id 
					   }
					db.UserProfile.insert(jsonInsert, function(err,data){
						if(err == null){
							response.write('Success');
							response.end() ;
						}else {
							response.write('Failed');
							response.end() ;
						}
					});			
		}else {
			response.write('Failed');
			response.end() ;
		}
	});
	
});

/* Retrieving the user's salt and password hash stored in the database.
 * Creating a new password hash for the user-entered password using the same salt (from the database).
 * Comparing the database password hash with the new password hash of the user-entered password,
 * to authenticate a user. If they are equal the user is authenticated.
 */
app.post('/verifyUser' , function(request,response){
	var jsonVerify = request.body ;
	var findUsername = { 'Username' : jsonVerify.Username};
	db.User.find(findUsername , function(err,data){
		if(data.length > 0){
			var dbSalt = data[0].Password.salt ;
			var dbPasswordHash = data[0].Password.passwordHash ;
			var userPasswordData = sha512(jsonVerify.Password, dbSalt);
			var userPasswordHash = userPasswordData.passwordHash ;
			if(userPasswordHash == dbPasswordHash) {
				var role = data[0].Role ;
				db.UserProfile.find(findUsername , function(err,data){
							  var jsonResponse = {
							  '_id'       : data[0]._id ,
							  'Username'  : data[0].Username ,
							  'FirstName' : data[0].FirstName ,
							  'LastName'  : data[0].LastName ,
							  'Address'   : {
								          'Line1' :  data[0].Address.Line1,
								          'Line2' :  data[0].Address.Line2,
								          'City'  :  data[0].Address.City,
								          'State' :  data[0].Address.State
							              },
							  'Email'     : data[0].Email,
							  'Phone'     : data[0].Phone,
	 						  'Role'      : role
							  } ;
							  response.write(JSON.stringify(jsonResponse));
							  response.end();
				})
				
			}
			else {
			    response.write('Failed');
			    response.end();
			}	
		}
		else {
			response.write('Failed');
			response.end() ;
		}
	})
});

/* 
 * Admin View - Excercise 2:
 * Fill in the Success and Failure response.write events. Removing user from table 'User' and
 * 'UserProfile'. Verify if the User was deleted from the database and from the admin view.
 */
app.post('/deleteUser' , function(request,response){
	var jsonUser = request.body ;
	db.User.remove(jsonUser, function(err,data){
		if(err == null){
			db.UserProfile.remove(jsonUser, function(err,data){
			  if(err == null){
			  // Fill in response.write function for Success
			  response.end() ;
			  }
			  else {
				// Fill in response.write function for Failure.
			  response.end();  
			  }
			});
		}
		else {
			// Fill in response.write function for Failure.
			response.end();
		}
	})
});


/* Including PersonId, Project Name and Project Description to 
 * save a new project in the Project Collection.
 */
app.post('/saveProject' , function(request,response){
	var jsonProject = request.body ;
	db.Project.insert(jsonProject, function(err,data){
		if(err == null){
			response.write('Success');
			response.end() ;
		}
		else {
			response.write('Failed');
			response.end();
		}
	})
});


/* Saving project description for an edited project.  
 *  Updating the Project collection with the new description for a given ProjectId. 
 */
app.post('/saveEditedProject' , function(request,response){
	var jsonProject = request.body ;
	console.log(request.body);
	db.Project.update({'_id' : mongojs.ObjectId(jsonProject.ProjectId)}, {$set:
		{
		 'ProjectDescription' :jsonProject.ProjectDescription,
		}	
    }, function(err, result){
    	if(err == null){
			response.write('Success');
			response.end();
		}
		else {
			response.write('Failed');
			response.end();
		}
    });
});



/* 
 * User View - Excercise 1:
 * Fill in the Success and Failure response.write events. 
 */
app.post('/deleteProject' , function(request,response){
	var jsonProject = request.body ;
	db.Project.remove(jsonProject, function(err,data){
		if(err == null){
			// Fill in response.write function for Success
			response.end() ;
		}
		else {
			// Fill in response.write function for Failure.
			response.end();
		}
	})
});



/*
 * Getting all projects assigned for a particular Person.
 * Looking up the Project collection by PersonId.
 */
app.post('/getProjects' , function(request,response){
	var personId = request.body ;
	db.Project.find(personId, function(err,data){
		if(err == null){
			response.write(JSON.stringify(data));
			response.end() ;
		}
		else {
			response.write('Failed');
			response.end();
		}
	})
});


/* Retrieving all available users from the UserProfile collection  */
app.post('/getUsers' , function(request,response){
	db.UserProfile.find({} , function(err,data){
		if(data.length > 0){
			response.write(JSON.stringify(data));
			response.end() ;
		}
		else {
			response.write('Failed');
			response.end();
		}
	})
});


app.listen(5000, function() {
	console.log('Server listening on port 5000') ;
});


