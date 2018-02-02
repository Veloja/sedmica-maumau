app.controller('SedmickaController', function ($scope) {

	$scope.players = [];

	$scope.newPlayer = {name: ''};

	$scope.addPlayer = function(player){
		$scope.players.push(player);
		$scope.newPlayer = {name: ''};
		$scope.currentHandScores['player' + $scope.players.length] = 0;
		$scope.totalScores['player' + $scope.players.length] = 0;
	}

	$scope.currentHandScores = {};

	$scope.totalScores = {};
// niz u koji guramo objekat tj rezultate iz trenutne ruke i sluzi da pratimo ko deli
	$scope.playersScores = [];

	$scope.submitCurrentHand = function () {
		var score = angular.copy($scope.currentHandScores);
		$scope.playersScores.push(score);
		increaseTotalScores();
		resetScores();
	}

	function increaseTotalScores() {
		for(var i = 1; i <= $scope.players.length; i++){
			$scope.totalScores['player' + i] += $scope.currentHandScores['player' + i];
		}
	}

	function resetScores() {
		for (player in $scope.currentHandScores){
			$scope.currentHandScores[player] = 0;
		} 
	}
});