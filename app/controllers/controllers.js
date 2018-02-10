app.controller('SedmickaController', function ($scope) {
	$scope.players = [];
	$scope.newPlayer = { name: '' };

	$scope.addPlayer = function (player) {
		if (checkForms(player.name)) {
			return;
		}

		$scope.players.push(player);
		$scope.newPlayer = { name: '' };
		$scope.currentHandScores['player' + $scope.players.length] = null;
		$scope.totalScores['player' + $scope.players.length] = null;
		$scope.correct['player' + $scope.players.length] = null;
		aritmetickaSredina();
		if ($scope.playersScores) {
			$scope.showTable = true;
		} else {
			$scope.showTable = false;
		}
	}
	// hide table when there aren't players
	$scope.showTable = false;
	// scores form each round
	$scope.currentHandScores = {};
	// keep track of total scores
	$scope.totalScores = {};
	// object for correcting bug
	$scope.correct = {};
	// arr in which we push obj => curr hand scores; track which player's turn to split and to follow statistics
	$scope.playersScores = [];

	$scope.submitCurrentHand = function (index) {
		var score = angular.copy($scope.currentHandScores);
		$scope.playersScores.push(score);
		calculateTotalScores();
		mostWins();
		resetScores();
	}
	// set score that when reached, game over
	$scope.addEndScore = 1000;
	$scope.setEndScore = function (input) {
		$scope.addEndScore = input;
	}

	$scope.deletePlayer = function (deleted) {
		// nalazimo na kom je indexu u players nizu player koga hocemo da brisemo
		// to mi treba jer index od toga i plus jedan mi nalazi playera u playersScores nizu
		var where = $scope.players.indexOf(deleted) + 1;
		for (var j = 0; j < $scope.playersScores.length; j++) {
			for (var property in $scope.playersScores[j]) {
				// delete all properties from deleted player
				delete $scope.playersScores[j]['player' + where];
			}
		}
		// delete name, currentHS & totalScores
		$scope.players.splice($scope.players.indexOf(deleted), 1);
		delete $scope.totalScores['player' + where];
		delete $scope.currentHandScores['player' + where];
	}

	function calculateTotalScores() {
		//reset to 0
		for (var prop in $scope.totalScores) {
			$scope.totalScores[prop] = 0;
		}

		$scope.playersScores.forEach(function (playerScore, index) {
			for (var prop in playerScore) {
				$scope.totalScores[prop] += playerScore[prop];
			}
		});
		for(var prop in $scope.correct){
			$scope.totalScores[prop] += $scope.correct[prop];
		}
		mostWins();
		returnOnNumber();
		checkIfGameOver();
	}

	function checkIfGameOver() {
		for (var i = 1; i <= $scope.players.length; i++) {
			if ($scope.totalScores['player' + i] >= $scope.addEndScore) {
				alert('END GAME');
			}
		}
	}
	// Editing scores if someoen made mistake
	$scope.editMode = [];
	$scope.edit = function (index) {
		// score is changed object from playersScores
		$scope.editMode[index] = true;
		$scope.inputScore = score;
	}
	$scope.inputScore = {};
	$scope.save = function (index) {
		var idxRow = $scope.playersScores.indexOf($scope.inputScore);
		$scope.playersScores[idxRow] = $scope.inputScore;
		calculateTotalScores();
		$scope.editMode[index] = false;
	}
	// Statistics for most wins
	// track players with most wins
	function mostWins() {
		var temporary = {};
		$scope.players.forEach(function (player, index) {
			temporary['player' + (index + 1)] = 0;
		});

		for (var i = 0; i < $scope.playersScores.length; i++) {
			for (var prop in $scope.playersScores[i]) {
				var toStrMinus = $scope.playersScores[i][prop].toString();
				var minus = '-';
				if (toStrMinus[0] === minus) {
					var numStr = Number(toStrMinus);
					temporary[prop] += 1;
				}
			}
		}
		// temporary => arr{name:'', wins:''}
		var sortable = [];
		for (var property in temporary) {
			sortable.push({ name: property, wins: temporary[property] });
		}
		//sort array;
		sortable.sort(function (a, b) {
			return a.wins - b.wins;
		});
		//player with most wins on $scope
		$scope.mostWins = sortable[sortable.length - 1];
		var best = $scope.mostWins.name.split('');
		var bestIdx = best[best.length - 1];
		// player with most wins have a name
		$scope.bestPl = $scope.players[bestIdx - 1].name;
		sortThem();
	}
	// Statistics for first and last player
	function sortThem() {
		//first place
		var sortableFirst = [];
		for (var total in $scope.totalScores) {
			sortableFirst.push({ name: total, wins: $scope.totalScores[total] });
		}
		//sort array;
		sortableFirst.sort(function (a, b) {
			return a.wins - b.wins;
		});
		//first Ranked player on $scope and have a name player1,2,3
		$scope.firstPlayer = sortableFirst[0];
		var first = $scope.firstPlayer.name.split('');
		var firstIdx = first[first.length - 1];
		// first player should have a real name
		$scope.firstPl = $scope.players[firstIdx - 1].name;
		// Loser
		$scope.loser = sortableFirst[sortableFirst.length - 1];
		var worst = $scope.loser.name.split('');
		var worstIdx = worst[worst.length - 1];
		// last player have a name
		$scope.worstPl = $scope.players[worstIdx - 1].name;
	}

	function aritmetickaSredina() {
		if ($scope.playersScores.length > 0) {
			var total = 0;
			for (var i = 1; i <= $scope.players.length; i++) {
				total += $scope.totalScores['player' + i];
			}
			var aritmetickaSredina = total / ($scope.players.length - 1);
			$scope.totalScores['player' + $scope.players.length] = Math.round(aritmetickaSredina);
			setToDNPplayerFromAritmetickaSredina();
		}
	}
	// set all undefined to have a property and some value to fix bootstrap cells
	function setToDNPplayerFromAritmetickaSredina() {
		for (var j = 0; j < $scope.playersScores.length; j++) {
			if ($scope.playersScores[j]['player' + $scope.players.length] === undefined) {
				$scope.playersScores[j]['player' + $scope.players.length] = 'DNP';
				undefined = $scope.playersScores[j]['player' + $scope.players.length];
			}
		}
	}
	// check if 111 or 222.... then return back on 1 or 2...
	function returnOnNumber() {
		for (var i = 1; i <= $scope.players.length; i++) {
			if ($scope.totalScores['player' + i] > 100) {
				var numStr = $scope.totalScores['player' + i].toString();
				if (numStr[0] === numStr[1] && numStr[1] === numStr[2]) {
					var problem = Number(numStr);
					numStr = Number(numStr[0]);
					$scope.totalScores['player' + i] = numStr;
					// $scope.playersScores[$scope.playersScores.length - 1]['player' + i] -= (problem - numStr);
					$scope.correct['player' + i] -= (problem - numStr);
					alert('BRAVOOOO VRACAS SE NA ' + numStr + '!!!');
				} 
			}
		}
	}

	function resetScores() {
		for (player in $scope.currentHandScores) {
			$scope.currentHandScores[player] = null;
		}
	}

	function checkForms(name) {
		if (!name) {
			return true;
		} else {
			return false;
		}
	}

});