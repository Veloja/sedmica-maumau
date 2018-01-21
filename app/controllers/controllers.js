app.controller('SedmickaController', function ($scope) {

	$scope.players = [
		{
			id: 1,
			totalScore: 0,
			selected: false,
			name: 'Veloja',
			points: [],
			hands: 0,
		},
		{
			id: 2,
			totalScore: 0,
			selected: false,
			name: 'Proda',
			points: [],
			hands: 0,
		},
		{
			id: 3,
			totalScore: 0,
			selected: false,
			name: 'Gile',
			points: [],
			hands: 0,
		}
	];

	$scope.trackHands = 0;
	$scope.trackRounds = 0;
	$scope.players[$scope.trackRounds].selected = true;
	$scope.trackPlayer = 0;
	$scope.gameOver = false;
	$scope.input = null;

	$scope.submit = function (input, player) {
		for (var i = 0; i < $scope.players.length; i++) {
			if (player === $scope.players[i]) {
				$scope.players[i].points.push(input);
				$scope.players[i].hands++;
				totalScoreForPlayer(input, player);
			} 
		}
	}


		// radi za nest ng-repeat
		function totalScoreForPlayer(input, player) {
			var totalScore = input;
			for (var i = 0; i < $scope.players.length; i++) {
				if (player === $scope.players[i]) {
					$scope.players[i].totalScore += totalScore;
				}
			}
		}

	});