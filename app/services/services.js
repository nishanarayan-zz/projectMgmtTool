app.service('hideUserContainer', function($rootScope){
	var hideUserContainer = function() {
		$rootScope.$broadcast('hideUserContainer') ;
	}		
	return hideUserContainer ;	
		
});