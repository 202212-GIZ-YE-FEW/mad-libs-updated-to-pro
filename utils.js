async function getStories(){
    /**
     * This function is called to get all stories.
     * @returns {array} - An array of stories.
     */
    await fetch("https://madlibs-api-gymhn.ondigitalocean.app/api/stories/")
    .then(response => response.json())
    .then(data => {
        const storiesContainer = document.getElementById("stories");
        document.getElementById("loader-container").style.display = "none";
        let storyHTML = "";
        data.forEach(story => { 
            storyHTML += `
            <div class="col-2" style="margin-bottom: 20px; cursor: pointer;" onclick="getStory(${story.id})">
                <div class="card">
                    <div class="container">
                        <h4><b>${story.title}</b></h4>
                        <h5>${story.get_languages}</h5>
                    </div>
                </div>
            </div>
            `;
        });
        storiesContainer.innerHTML = storyHTML;
    }).catch(error => {
        console.log(error);
    });
}

function keyPressHandler(key, callback) {
    /**
     * This function is called when a key is pressed.
     * @param {string} key - The key that was pressed.
     * @param {function} callback - The function to call when the key is pressed.
     */
    document.addEventListener('keydown', (event) => {
        if (event.key === key) {
            callback(event);
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
