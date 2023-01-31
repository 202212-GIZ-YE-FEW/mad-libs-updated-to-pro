function keyPressHandler(key, callback) {
    /**
     * This function is called when a key is pressed.
     * @param {string} key - The key that was pressed.
     * @param {function} callback - The function to call when the key is pressed.
     */
    document.addEventListener('keydown', (event) => {
        if (event.key === key) {
            callback();
        }
    });
}

async function validateWord(word, pos) {
    /**
     * This function is called to validate a word and part of speech.
     * @param {string} word - The word to validate.
     * @param {string} pos - The part of speech to validate.
     * @returns {boolean} - True if the word is valid, false otherwise.
     */
    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
    const headers = {
        'X-RapidAPI-Key': '5e530fb10cmshfa070cd42f13dd2p10630fjsne86c644c0e2f',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
    };

    const response = await fetch(url, { headers });
    const data = await response.json();
    return validatePos(pos, data);
}

function validatePos(pos, data) {
    /**
     * This function is called to validate a part of speech.
     * @param {string} pos - The part of speech to validate.
     * @param {object} data - The data to validate.
     * @returns {boolean} - True if the part of speech is valid, false otherwise.
     */
    if (data.results[1].partOfSpeech.includes(pos)) {
        return true;
    }
    return false;
}
