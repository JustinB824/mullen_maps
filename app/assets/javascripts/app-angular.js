
function UsersController($scope, $http) {
	$http.get('/users.json').success(function(data, status, headers, config) {
		$scope.users = data;
		
		for (var i=0; i < $scope.users.length; i++) {
			LoadMarkers($scope.users[i]);
		}
		
		$scope.ActiveMarker = function(id) {
			var toUpdate = FindAddress(id).marker;
			toUpdate.setIcon('assets/marker-hi.png');
		}

		$scope.InactiveMarker = function(id) {
			var toUpdate = FindAddress(id).marker;
			toUpdate.setIcon();
		}
	});
}

function FindAddress(id) {
	for (var i = 0; i < storedAddresses.length; i++) {
		if (storedAddresses[i].id == id) {
			return storedAddresses[i];			
		}
	}
	return null;
}