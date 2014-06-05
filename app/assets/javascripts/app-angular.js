
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

		$scope.ZoomMarker = function(id) {
			var toUpdate = FindAddress(id).marker;
			var coords = toUpdate.position;
			ZoomWithWindow(toUpdate, 17);
		}
	});
}
