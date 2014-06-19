
function UsersController($scope, $http) {
	$scope.loadData = function() {
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
	};
	
	$scope.loadData();
}

function AddUserController($scope, $http) {
	
	$scope.addUser = function() {
		alert($scope.user.address_coords);
		$http.post('/users.json', $scope.user).success(function() {
			alert('done');
		});
	}
}