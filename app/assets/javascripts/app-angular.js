var sometext = "Angular Test";

function TestController($scope) {
	$scope.sometext = sometext;
	
	$scope.Pop = function() {
		$scope.sometext = "You CLICKED me!!!!"
	};
}

function UsersController($scope, $http) {
	$http.get('/users.json').success(function(data, status, headers, config) {
		$scope.users = data;
		
		for (var i=0; i < $scope.users.length; i++) {
			LoadMarkers($scope.users[i]);
		}

		//LoadMarkers();
	});
}