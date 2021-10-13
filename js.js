var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
recognition.continuous = false;
// recognition.lang = 'en-US';
recognition.lang = 'de';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var hints = document.querySelector('.hints');
let input = document.getElementById('input');

hints.innerHTML = 'Tap/click then say a phrase to convert it to text.';

document.getElementById('saySomething').onclick = function() {
    recognition.start();
    console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object
    var text = event.results[0][0].transcript;
    console.log(text)
    diagnostic.textContent = text
    console.log('Confidence: ' + event.results[0][0].confidence);

    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onnomatch = function() {
    diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

function textToSpeech() {
    var text = input.value;
    console.log(text)
    diagnostic.textContent = text

    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}