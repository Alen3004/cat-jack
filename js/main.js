'use strict';
var playerCards = [];
var computerCards = [];
var cardDeck = [];



function createDeck(numberOfDecks) {
	var newDeck = [];
	for (var x = 0; x < numberOfDecks; x++) {
		newDeck.push('AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC');
		newDeck.push('AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH');
		newDeck.push('AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD');
		newDeck.push('AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS');
	}
	return newDeck;
}

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function startGame() {

	// Ta fyra kortlekar och blanda dem
	cardDeck = createDeck(4);
	shuffle(cardDeck);

	// Huset och spelaren drar två kort
	playerCards.push(cardDeck.pop());
	playerCards.push(cardDeck.pop());
	computerCards.push(cardDeck.pop());
	computerCards.push(cardDeck.pop());

	// Visa ett av husets kort och alla spelarnas kort
	console.log('your cards: ' + playerCards[0] + ', ' + playerCards[1]);
	console.log('computers cards: ' + computerCards[0]);


}


function getValue(cards) {
	console.log(cards);
	var value = 0;
	var numAces = 0;

	for (var x = 0; x < cards.length; x++) {
		if (isNaN(Number(cards[x][0]))) {
			console.log(cards[x][0]);
			if (cards[x][0] === 'A') {
				value += 11;
				++numAces;
			} else {
				value += 10;
			}
		}
		value += Number(cards[x][0]);
	}

	while (value > 21 && numAces !== 0) {
		value -= 10;
		--numAces;
	}

	return value;
}

//________/ Start Game \___________
startGame();
console.log(getValue(playerCards));



// getCard() test
// while(playerTotalValue < 10000) {
// 	var x = getCard();
// 	if(x > 14) {
// 		console.log("x is too big");
// 	}
// 	playerTotalValue += x;
// 	console.log(getCard());