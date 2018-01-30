app.controller('SedmickaController', function ($scope) {

	$scope.players = [
		{
			name: 'Veloja',
		},
		{
			name: 'Gile',
		},
		{
			name: 'Marija',
		},
		{
			name: 'Ivca',
		}
	];

	$scope.currentHandScores = { player1: null, player2: null, player3: null, player4: null };
	$scope.totalScores = { player1: 0, player2: 0, player3: 0, player4: 0 };

	$scope.playersScores = [];

	$scope.submitCurrentHand = function () {
		var score = angular.copy($scope.currentHandScores);
		$scope.playersScores.push(score);
		increaseTotalScores();
		resetScores();
	}

	function increaseTotalScores() {
		$scope.totalScores.player1 += $scope.currentHandScores.player1;
		$scope.totalScores.player2 += $scope.currentHandScores.player2;
		$scope.totalScores.player3 += $scope.currentHandScores.player3;
		$scope.totalScores.player4 += $scope.currentHandScores.player4;
	}

	function resetScores() {
		$scope.currentHandScores = { player1: null, player2: null, player3: null, player4: null };
	}
});