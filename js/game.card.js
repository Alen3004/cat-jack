'use strict';
game.getCard = function (rank, suit) {
	var that = {};

	//    ______________________
	//___/       PRIVATE        \___

	// Returns a simple text representation of the card
	function getName() {
		var rankWord = '';
		var suitWord = '';
		if (rank === '2')
			rankWord = 'two';
		if (rank === '3')
			rankWord = 'three';
		if (rank === '4')
			rankWord = 'four';
		if (rank === '5')
			rankWord = 'fice';
		if (rank === '6')
			rankWord = 'six';
		if (rank === '7')
			rankWord = 'seven';
		if (rank === '8')
			rankWord = 'eight';
		if (rank === '9')
			rankWord = 'nine';
		if (rank === '10')
			rankWord = 'ten';
		if (rank === 'A')
			rankWord = 'ace';
		if (rank === 'J')
			rankWord = 'jack';
		if (rank === 'Q')
			rankWord = 'queen';
		if (rank === 'K')
			rankWord = 'king';

		if (suit === 'H')
			suitWord = 'hearts';
		if (suit === 'S')
			suitWord = 'spades';
		if (suit === 'C')
			suitWord = 'clubs';
		if (suit === 'D')
			suitWord = 'diamonds';

		return rankWord + ' of ' + suitWord;
	}

	// Returns the value of the card (in numbers)
	function getValue() {
		var value = Number(rank);

		if (rank === 'A') { // A
			return 11;
		}
		if (isNaN(value)) { // J Q K
			return 10;
		}
		return value; // 2 3 4 5 6 7 8 9 10
	}

	// Returns different special unicode pictogram suit symbols,
	// depending on what suit the card is of.
	function getSuitSymbol() {
		if (suit === 'H') {
			return '\u2665';
		} else if (suit === 'S') {
			return '\u2660';
		} else if (suit === 'C') {
			return '\u2663';
		} else if (suit === 'D') {
			return '\u2666';
		} else {
			// Shows the string (which is throwed) as an  
			// error message if this line is ever reached
			throw 'invalid suit identifier';
		}
	}

	// @returns The top row part of the ASCII-art card picture
	function getPictureTopRow() {
		var row = '|';
		// 'J' looks better if it is indented 1 space into the card
		if (rank === 'J') {
			row += ' ';

		}
		// Tens have two symbols in their rank, and thus require less spaces
		if (rank === '10') {
			row += rank + getSpaces(3);

		} else {
			row += rank + getSpaces(5);
		}

		return row + getSuitSymbol() + '|';
	}

	// @returns The bottom row part of the ASCII-art card picture 
	// (reversed order of the top row)
	function getPictureBottomRow() {
		var row = '|' + getSuitSymbol();
		if (rank === '10') {

			row += getSpaces(3) + rank;

		} else {

			row += getSpaces(5) + rank;
		}
		if (rank === 'J') {
			row += ' ';
		}

		return row + '|';
	}

	function getSpaces(amount) {
		var spaces = '';
		while (amount-- > 0) {
			spaces += ' ';
		}
		return spaces;
	}

	//    ______________________
	//___/        PUBLIC        \___

	that.rank = rank;
	that.suit = suit;
	that.value = (getValue());
	that.name = (getName());
	that.isFrontsideUp = true; // used for representing flipping of the card

	that.frontside = [
		' ______ ',
		getPictureTopRow(rank),
		'|         |',
		'|         |',
		getPictureBottomRow(rank),
		' \uFFE3\uFFE3\uFFE3 ' //code for the special character 'FULLWIDTH MACRON'.
	];

	that.backside = [
		'  .  .  .  ',
		'.         .',
		'.         .',
		'.         .',
		' .  .  . .   ',
		''
	];

	that.toString = function () {
		return that.name;
	};

	// Returns the backside or the upside, depending on how the card is flipped.
	that.getPictureArray = function () {
		if (that.isFrontsideUp) {
			return that.frontside;
		} else {
			return that.backside;
		}
	};

	that.getPictureString = function () {
		var upside;
		if (that.isFrontsideUp) {
			upside = that.frontside;
		} else {
			upside = that.backside;
		}

		var picture = '';
		for (var i = 0; i < upside.length; ++i) {
			picture += upside[i] + '\n';
		}
		return picture;
	};

	that.flip = function () {
		// sets the bool 'isFrontsideUp' to its opposite value
		that.isFrontsideUp = !that.isFrontsideUp;
	};

	return that;
};