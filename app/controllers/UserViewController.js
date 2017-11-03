/*
 * Excercise 1
 * Complete the $scope.deleteProject()  function as guided.
 * 
 * Excercise 2
 * Change the appearance of the Save and Cancel buttons in the 'Add Project' modal dialog 
 * so that the buttons have rounded corners and change other attributes as guided in app.css,
 * located at projectMatrix\app\app.css .
 * 
 * Excercise 3
 * Save the project description to the database, when the user has edited the project description 
 * inside the accordion. Complete the function $scope.saveEditedProject(). 
 * 
 */

app.controller('UserViewController', function($scope, $http, $uibModal, $route,
		hideUserContainer) {

	$scope.hideSaveIcon = true;
	$scope.hideProjectContainer = true;
	$scope.hideProjDescTextArea = true;
	$scope.Person = JSON.parse(localStorage.getItem("UserProfile"));
	$scope.focusProjectsIcon = true;
	var personId = {
		'PersonId' : $scope.Person._id
	}

	// Flag for opening the project accordions, one at a time.
	$scope.oneAtATime = true;

	/* Getting the list of projects for a particular User , on page load. */
	var userViewOnLoad = function() {
		console.log('viewonLoad');
		$http.post('/getProjects', JSON.stringify(personId))
				.then(
						function(response) {
							$scope.Projects = JSON.parse(JSON
									.stringify(response.data));
							console.log(JSON.stringify(response.data));
						}, function(response) {
							console.log(response.data);
						});
	}

	/* 
	 * Displaying the 'Add Project' modal dialog pop-up .
	 * Sending the 'PersonId' from the UserViewController to the 
	 * modal instance controller, 'projectModalInstanceCtrl' . HTML
	 * template for modal is defined in UserView.html .
	 */
	$scope.addProject = function() {
		$scope.hideProjectContainer = false;
		$uibModal.open({
			animation : $scope.animationsEnabled,
			templateUrl : 'projectDescription.html',
			controller : 'projectModalInstanceCtrl',
			resolve : {
				'PersonId' : $scope.Person._id
			}
		});

	}

	/* 
	 * Displaying the 'Update Profile' modal dialog pop-up .HTML
	 * template for modal is defined in AdminView.html .
	 */
	$scope.updatePerson = function() {
		$scope.hideProjectContainer = false;
		$uibModal.open({
			animation : $scope.animationsEnabled,
			templateUrl : 'newProfile.html',
			controller : 'updateProfileModalInstanceCtrl'
		});
	}

	/* Event listener for the 'hideUserContainer' event 
	   broadcasted from the modal pop-up. */
	$scope.$on('hideUserContainer', function() {
		$scope.hideProjectContainer = true;
	});

	$scope.editProject1 = function(projectName) {
		var newprojectName = projectName.replace(/\s/g, '');
		projectDescriptionId = angular.element(document.querySelector('#'
				+ newprojectName));
		projectDescriptionId.attr('contenteditable', "true");
	}

	/* Called when the user opens the project accordion (for editing), by clicking on the 
	 edit icon on the accordion panel. */
	$scope.editProject = function(projectName) {
		$scope.hidePanelBody = true;
		$scope.hideProjDescTextArea = false;
		$scope.hideSaveIcon = false;
		$scope.hideEditIcon = true;
	}

	/* Called when the user opens the project accordion (for viewing), by clicking on the 
	   project-title area on the accordion panel. */
	$scope.viewProject = function() {
		$scope.hideProjDescTextArea = true;
		$scope.hidePanelBody = false;
		$scope.hideSaveIcon = true;
		$scope.hideEditIcon = false;
		if ($scope.isOpen) {
			$scope.hideEditIcon = true;
		} else {
			$scope.hideEditIcon = false;
		}

	}

	/* Excercise 3 
	 * Complete the below function . Complete the  project variable in JSON format. 
	 */
	$scope.saveEditedProject = function(projectId) {

		/* Retrieve the project description from the accordion.
		 * Retrieve the $scope variable 'desc' from the textarea with id = 'projDescTextArea' ,
		 * and assign it to 'ProjectDescription' below.
		 */

		var project = {
			'ProjectId' : projectId,
			'ProjectDescription' : "" // Fill in here . 
		}
		//Saving the project to the database. 
		$http.post('/saveEditedProject', JSON.stringify(project)).then(
				function(response) {
					console.log(response.data);
					if (response.data != 'Failed') {
						$route.reload();
					}
				}, function(response) {
					console.log(response.data);
				});
	}

	// Generating Id attribute for the Project Description text-area, in the accordion panel-body. 
	$scope.getDescId = function(projectName) {
		// Removing all white spaces within and outside the project Name, that is defined as a project-heading
		// in the accordion panel-header.
		var newDescId = projectName.replace(/\s/g, '');
		return newDescId;
	}

	var accordionProjectList = function() {
		console.log('viewonLoad');
		$http.post('/getProjects', JSON.stringify(personId)).then(
				function(response) {
					return JSON.parse(JSON.stringify(response.data));
				}, function(response) {
					console.log(response.data);
				});
	}

	/* Excercise 1
	 * Complete the below function. Complete the $http.post request to the Server and send the project Name in JSON
	 * format in the request body.
	 * e.g: var ProjectName = {
	 *             'ProjectName' : (input parameter to the function, projectName) 
	 *             }
	 * Complete the post request handler for '/deleteProject' at server.js, as guided.
	 */
	$scope.deleteProject = function(projectName) {
		var ProjectName = {
		// Fill in here
		};

		/*$http.post('/deleteProject'  // "Fill in here, above ProjectName in JSON format" ).then (
				// response after successful request completion.
				function(response) {
					// Getting new list of projects after deleting from the database,
					 //  and refreshing scope 
					$route.reload();
				},
				// response received if there was an error in processing the request.
				function(response) {
					
				}
			);*/

	}

	$scope.$on('$routeChangeSuccess', function(next, current) {
		userViewOnLoad();
	});

});

app.controller('projectModalInstanceCtrl', function($scope, $uibModalInstance,
		PersonId, $http, $route, hideUserContainer) {

	// Saving project information in the database.
	$scope.save = function() {
		var project = {
			'PersonId' : PersonId,
			'ProjectName' : $scope.projectName,
			'ProjectDescription' : $scope.projectDescription
		}
		$http.post('/saveProject', JSON.stringify(project)).then(
				function(response) {
					console.log(response.data);
				}, function(response) {
					console.log(response.data);
				});
		$uibModalInstance.close();
		// Re-loading the view, to reflect the newly added project, in the project list.
		$route.reload();
	}

	$scope.cancel = function() {
		/* Broadcasting the 'hideUserContainer' event defined in 'hideUserContainer' service
		   to hide the background below the pop-up dialog . */
		hideUserContainer();
		$uibModalInstance.close();
	}

});
