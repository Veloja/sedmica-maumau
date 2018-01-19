app.controller('SedmickaController', function ($scope) {

	$scope.players = [
		{
			id: 1,
			totalScore: 0,
			name: 'Veloja',
			points: [],
		},
		{
			id: 2,
			totalScore: 0,
			name: 'Proda',
			points: [],
		},
		{
			id: 3,
			totalScore: 0,
			name: 'Gile',
			points: [],
		}
	];

	$scope.trackRounds = 0;
	$scope.gameOver = false;
	$scope.input = null;

	$scope.score = function (input, player) {
		for (var i = 0; i < $scope.players.length; i++) {
			if (player === $scope.players[i]) {
				$scope.players[i].points.push(input);
				console.log(player);
				totalScoreForPlayer(input, player);
			}
		}
		$scope.input = '';
	}
// ovo za sada radi
	function totalScoreForPlayer(input, player) {
		var totalScore = input;
		for(var i = 0; i < $scope.players.length; i++){
			if(player === $scope.players[i]){
				$scope.players[i].totalScore += totalScore;
			}
		}
	}

});