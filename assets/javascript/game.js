
var wordBank = ["christmas", "santa", "gift", "family", "ornament"];

var wins = 0;

var lettersGuessed = "";

var restartGame = false;

var currentWord;

var guessesRemaining;

var msg = "";

// calls the function to initialize the first game when the page is loaded
NewGame();

//Initializes a new game
function NewGame() {

	restartGame = false;

	// Choose the word to be guessed
	currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];

	console.log(currentWord);

	// Set the number of guesses remaining
	guessesRemaining = currentWord.length + 7;

	// Clear the letters guessed
	lettersGuessed = "";	

	//resets message to nothing
	msg = "";

	updateGame();
}


// When the user presses the key it records the keypress and then sets it to currentletterguessed
document.onkeyup = function(event) {
	
	if (restartGame) {
	NewGame();
	return;
	}

	var currentLetterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	// If the key pressed is not a letter, tell them and don't add to letters chosen
	if (!(currentLetterGuessed.match(/[a-z]/i))) { 
	msg = "<p>Please only select letters</p>";
	} 
	// else, if the letter has already been chosen, tell them and don't add to letters chosen
	else if (lettersGuessed.indexOf(currentLetterGuessed) > -1) {
	msg = "<p>Please choose a letter you have not already guessed.</p>";
	}
	// otherwise, the letter is a valid guess
	else {
	// Check if the letter is in the word. Remove a life if incorrect.
	if (currentWord.indexOf(currentLetterGuessed) < 0) {
	msg = "<p class='red'>Incorrect! Guess again!</p>";	
	guessesRemaining--;
	}
	else {
	msg = "<p class='green'>Correct! Good guess!</p>";	
	}
	
	lettersGuessed = lettersGuessed + currentLetterGuessed;
	}

	updateGame();
	
}


function updateGame() {

	var hangmanWord = getHangmanWord(lettersGuessed);	

	//supplies the text that will be replaced in the html file
	var html = 
	"<h1>Hangman: Holiday Theme</h1>" +
	"<p>Press any letter to begin!</p>" +
	"<p class='normal'>Letters guessed: " + lettersGuessed + "</p>" +
	"<p>" + hangmanWord + "</p>" +
	"<p>Guesses remaining: " + guessesRemaining + "</p>" +
	msg;

	// Check if the player won
	if (hangmanWord.indexOf("_") < 0) {
	wins++;
	html = 
	"<p>" + hangmanWord + "</p>" + 
	"<p>You win! Press any key to start a new game.</p>" +
	"<p>Wins: " + wins;
	restartGame = true;
	} 
	// Check if the player lost
	else if (guessesRemaining < 1) {
	html = 
	"<p>Letters guessed: " + lettersGuessed + "</p>" +
	"<p>The word was: " + currentWord + "</p>" +
	"<p>You ran out of guesses! Press any key to start a new game.</p>";
	restartGame = true;
	}
	// Otherwise, keep going
	else {
	html = html + "<p class='normal'>Select a new letter to continue.</p>";
	}

	// Placing the html into the game ID
	document.querySelector("#game").innerHTML = html;
}


function getHangmanWord(lettersGuessed) {
	
	var hangmanWord = "";

	// Iterate over all the letters in the current word
	for (i = 0; i < currentWord.length; i++) {
		var currentWordLetter = currentWord[i];

		// If the current word letter is in the string of letters guessed
		if (lettersGuessed.indexOf(currentWordLetter) > -1 ) {
		hangmanWord = hangmanWord + currentWordLetter;
		}
		// else the letter hasn't been guessed so add a dash
		else {
		hangmanWord = hangmanWord + "_ ";
		}
	}
	
	return hangmanWord;
}
