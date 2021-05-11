import VOICE_API_KEY from './apikey.js';

// Custom Scripts

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const apiKey = VOICE_API_KEY;
// Disable / enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to our Voice RSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0.5,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get jokes from joke api
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    //  Text-to-speech
    tellMe(joke);

    // Disable button
    toggleButton();
  } catch (error) {
    console.log('whoops,', error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
