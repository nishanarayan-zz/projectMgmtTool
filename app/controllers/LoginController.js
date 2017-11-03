app.controller('LoginController', function($scope, $http, $location) {

	$scope.hideLoginError = true;
	$scope.username = "";
	$scope.password = "";

	$scope.Projects = [ 'Project1', 'Project2', 'Project3', 'Project4' ];

	/* Only for the administrator, to add another Administrator */
	$scope.addProfile = function() {
		var profile = {
			'Username' : $scope.username,
			'Password' : $scope.password,
			'Role' : 'Admin'
		}

		$http.post('/addProfile', JSON.stringify(profile)).then(
				function(response) {

					console.log(response.data);
				}, function(response) {
					console.log(response.data);
				});
	}

	$scope.logIn = function() {
		var profile = {
			'Username' : $scope.username,
			'Password' : $scope.password
		}

		$http.post('/verifyUser', JSON.stringify(profile)).then(
				function(response) {
					if (response.data != 'Failed') {

						if (response.data.Role == 'User') {
							localStorage.setItem("UserProfile", JSON
									.stringify(response.data));
							$location.path('/user');
						} else {
							localStorage.setItem("UserProfile", JSON
									.stringify(response.data));
							$location.path('/admin');
						}
					} else {
						$scope.hideLoginError = false;
					}
				}, function(response) {
					console.log(response.data);
				});
	}

});
