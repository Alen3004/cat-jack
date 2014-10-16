'use strict';
game.m.state = {

	playerScore: 0,
	dealerScore: 0,
	dealerCards: [],
	playerCards: [],
	focusMessage: '',
	resultMessage: '',

	update: function (focusMessage, gameOver) {

		// Storing variables for shorter reference below
		var state = game.m.state;
		var playerHand = game.m.player.getHand();
		var dealerHand = game.m.dealer.getHand();

		state.playerCards = playerHand.getCards();
		state.dealerCards = dealerHand.getCards();
		state.playerScore = playerHand.getTotalValue();
		state.dealerScore = dealerHand.getTotalValue();
		state.focusMessage = focusMessage;
		state.gameOver = gameOver;
	},

	//returns 0 for tie, negative for loss, and positive for win
	getWinState: function () {

		// Storing variables for shorter reference below
		var playerScore = game.m.state.playerScore;
		var dealerScore = game.m.state.dealerScore;

		if (playerScore > 21 && dealerScore > 21) {
			return 0;
		}
		if (playerScore > 21) {
			return -1;
		}
		if (dealerScore > 21) {
			return 1;
		}
		return playerScore - dealerScore;
	},

	getCopy: function () {
		var gs = game.m.state;

		var copy = {
			playerCards: [],
			dealerCards: [],
			playerScore: gs.playerScore,
			dealerScore: gs.dealerScore,
			focusMessage: gs.focusMessage,
			gameOver: gs.gameOver
		};
		for (var i = 0; i < gs.playerCards.length; ++i) {
			copy.playerCards.push(gs.playerCards[i]);
		}

		for (var j = 0; j < gs.dealerCards.length; ++j) {
			copy.dealerCards.push(gs.dealerCards[j]);
		}
		return copy;
	}
};