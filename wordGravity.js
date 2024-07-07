// Constants
var NUM_TEXT = 1;
var DELAY = 500;
var TEXT_DELAY = 5;
var DELAY_COUNTER = 1;
var MIN_LENGTH = 1;
var MAX_LENGTH = 3;
var CHAR_A = 65;
var CHAR_Z = 90;
var FONT = "15pt Arial";
var MIN_SPEED = 1;
var MAX_SPEED = 5;
var END_ZONE = 500;

// Variables
var score = 0;
var input = "";

// Lists
var texts = [];
var rotates = [];
var speeds = [];

// Functions
function start() {
    println("Type the letters before they hit the bottom!");
    addText();
    keyDownMethod(keyDown);
    setTimer(reDraw, DELAY);
}

// Generate new random text
function addText() {
    var length = Randomizer.nextInt(MIN_LENGTH, MAX_LENGTH);
    var txt = new Text(randomText(length), FONT);
    var x = Randomizer.nextInt(length, getWidth() - length - 30);
    txt.setPosition(x, 0);
    txt.setColor(Randomizer.nextColor());
    add(txt);
    texts.push(txt);
    rotates.push(Randomizer.nextInt(-1, 1));
    speeds.push(Randomizer.nextInt(MIN_SPEED, MAX_SPEED));
}

// Moves text until it reaches the bottom
function reDraw() {
    DELAY_COUNTER++;
    if (DELAY_COUNTER == TEXT_DELAY) {
        addText();
        DELAY_COUNTER = 1;
    }

    for (var i = 0; i < texts.length; i++) {
        updateText(texts[i], i);
    }

    if (isGameEnd()) {
        println("Game Over!");
        println("Total score = " + score);
        stopTimer(reDraw);
        throw 'Game Over!';
    }
}

// Checks if any word touches the bottom
function isGameEnd() {
    for (var i = 0; i < texts.length; i++) {
        if (texts[i].getY() > END_ZONE) {
            return true;
        }
    }
    return false;
}

// Updates text position and rotation
function updateText(txt, index) {
    var x = Randomizer.nextInt(txt.length, getWidth() - txt.length);
    txt.setPosition(txt.getX(), txt.getY() + (10 * speeds[index]));
    txt.rotate(45 * rotates[index]);
}

// Generates a random text of given length
function randomText(length) {
    var result = "";
    for (var i = 0; i < length; i++) {
        var random_num = Randomizer.nextInt(CHAR_A, CHAR_Z);
        var random_char = String.fromCharCode(random_num);
        result += random_char;
    }
    return result;
}

// Handles key down events
function keyDown(e) {
    if (e.keyCode == Keyboard.ENTER) {
        if (isGameEnd()) {
            throw 'Game Over!';
        }
        println(input);
        var index = wordIntake(input);
        input = "";
        reDraw();

        if (index > -1) {
            texts.splice(index, 1);
        }
    } else if (e.keyCode >= CHAR_A && e.keyCode <= CHAR_Z) {
        input += String.fromCharCode(e.keyCode);
    }
}

// Processes the typed word
function wordIntake(word) {
    for (var i = 0; i < texts.length; i++) {
        if (isGameEnd()) {
            throw 'Game Over!';
        }
        if (texts[i].getLabel() == word) {
            texts[i].setLabel("");
            score++;
            return i;
        }
    }
    return -1;
}
