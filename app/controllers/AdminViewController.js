/*
 * Excercise 2 
 * Complete the function $scope.deleteUser() ; 
 * 
 */

app.controller('AdminViewController', function($scope, $http, $uibModal,
		$route, hideUserContainer) {

	$scope.hideUserContainer = true;
	$scope.Person = JSON.parse(localStorage.getItem("UserProfile"));

	// Getting the list of all users from the database, on page load.
	var adminViewOnLoad = function() {
		$http.post('/getUsers').then(
				function(response) {
					if (response.data != "Failed") {
						$scope.Users = response.data;
					}
				}, function(response) {
					console.log(response.data);
				});

	}

	$scope.addUser = function() {
		$scope.hideUserContainer = false;
		$uibModal.open({
			animation : $scope.animationsEnabled,
			templateUrl : 'newProfile.html',
			controller : 'profileModalInstanceCtrl'
		});
	}
	/*
	 * Excercise 2 Complete the below function. Follow example deleteProject()
	 * in UserViewController.js.
	 */
	$scope.deleteUser = function(personId) {

		/*
		 * Add an $http post request with url '/deleteUser' and send the
		 * personId in JSON format in the request body . Upon successful
		 * completion of the request, call the $route.reload() function, to
		 * refresh the scope, inside the success response handler. Complete the
		 * request handler for 'deleteUser' in server.js as guided.
		 */

		var personId = {
		// Fill in here
		}
		$http.post('fill in url for delete user',
				'fill in personId in JSON format').then(
		// success response handler
		function(response) {
			// Reload the route here , to get new list of users.
		},
		// error response handler
		function(response) {

		});
	}

	$scope.updatePerson = function() {
		$scope.hideUserContainer = false;
		$uibModal.open({
			animation : $scope.animationsEnabled,
			templateUrl : 'newProfile.html',
			controller : 'updateProfileModalInstanceCtrl'
		});
	}

	/*
	 * Event listener for the 'hideUserContainer' event, broadcasted from the
	 * modal pop up, in oder to hide the background below the pop-up.
	 */
	$scope.$on('hideUserContainer', function() {
		$scope.hideUserContainer = true;
	});

	adminViewOnLoad();
});

app.controller('profileModalInstanceCtrl', function($scope, $uibModalInstance,
		$http, $route, $uibModal, hideUserContainer) {

	$scope.Title = "New Profile";
	$scope.Person = {
		"Username" : "",
		"Password" : "",
		"FirstName" : "",
		"LastName" : "",
		"Address" : {
			"Line1" : "",
			"Line2" : "",
			"City" : "",
			"State" : ""
		},
		"Email" : "",
		"Phone" : "",
		"Role" : ""

	};

	$scope.save = function() {
		if ($scope.Person.Email == "" || $scope.Person.Email == undefined) {
			$uibModal.open({
				animation : $scope.animationsEnabled,
				templateUrl : 'profileValidation.html',
				controller : 'modalValidationCtrl',
				resolve : {
					validationText : function() {
						return "You must enter a valid e-mail address."
					}
				}
			});
		} else {
			$http.post('/addPerson', JSON.stringify($scope.Person)).then(
					function(response) {
						if (response.data == "Failed") {
							$uibModal.open({
								animation : $scope.animationsEnabled,
								templateUrl : 'profileValidation.html',
								controller : 'modalValidationCtrl',
								resolve : {
									validationText : function() {
										return "Username already exists."
									}
								}
							});
						} else {
							$uibModalInstance.close();
							$route.reload();
						}
					}, function(response) {
						console.log(response.data);
					});
		}
	}

	$scope.cancel = function() {
		hideUserContainer();
		$uibModalInstance.close();
	}

});

app.controller('updateProfileModalInstanceCtrl',
				function($scope, $uibModalInstance, $http, $route, $uibModal,hideUserContainer) {
					$scope.Title = "Update Profile";
					$scope.Person = JSON.parse(localStorage.getItem("UserProfile"));
					$scope.disablePassword = true;
					$scope.disableUsername = true;
					$scope.save = function() {
						if ($scope.Person.Email == "" || $scope.Person.Email == undefined) {
							$uibModal.open({
										animation : $scope.animationsEnabled,
										templateUrl : 'profileValidation.html',
										controller : 'modalValidationCtrl',
										resolve : {
											validationText : function() {
												return "You must enter a valid e-mail address."
											}
										}
									});
						} else {
							$http.post('/updatePerson',JSON.stringify($scope.Person))
									.then(function(response) {
												if (response.data == "Failed") {
													$uibModal.open({
																animation : $scope.animationsEnabled,
																templateUrl : 'profileValidation.html',
																controller : 'modalValidationCtrl',
																resolve : {
																	validationText : function() {
																		return "No changes were made to the profile."
																	}
																}
															});
												} else {
													// In case the person
													// refreshes the page.
													localStorage.setItem("UserProfile",JSON.stringify($scope.Person));
													$uibModalInstance.close();
													$route.reload();
												}
											}, function(response) {
												console.log(response.data);
											});
						}
					}

					$scope.cancel = function() {

						hideUserContainer();
						$uibModalInstance.close();

					}
				})

app.controller('modalValidationCtrl', function($scope, $uibModalInstance,
		validationText) {
	$scope.modalValidationText = validationText;
	$scope.hideModal = function() {
		$uibModalInstance.close();
	}
});