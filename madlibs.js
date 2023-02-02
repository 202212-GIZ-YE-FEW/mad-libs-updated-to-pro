/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

function parseStory(rawStory) {
  let words = rawStory.split(/(?=[,.\s])/g);
  let result = [];
  const posMap = {
    n: "noun",
    v: "verb",
    a: "adjective",
    r: "adverb",
  };
  words.forEach((word) => {
    let wordObj = { word: word.trim() };
    if (word.includes("[")) {
      let pos = word.match(/\[([a-z])\]/)[1];
      wordObj.pos = posMap[pos];
    } else if (word.includes(",")) {
      wordObj.word = ",";
    } else if (word.includes(".")) {
      wordObj.word = ".";
    }
    result.push(wordObj);
  });
  return result;
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getStories();

const inputEdit = document.querySelectorAll(".madLibsEdit");
const previewDiv = document.querySelector(".madLibsPreview");

const getStory = (index) => {
  inputEdit.forEach((div) => {
    div.innerHTML = "";
  });
  previewDiv.innerHTML = "";
  getRawStory(index)
    .then(parseStory)
    .then((processedStory) => {
      displayStory(processedStory);
    });
};

function displayStory(story) {
  let inputIndex = 0;
  let previewIndex = 0;
  let editHTML = "";
  story.forEach((obj) => {
    let placeholderLength = `Enter ${obj.pos}`.length // added this to get placeholder length to make input "size" suitable
    if (obj.pos) {
      editHTML = `<input type="text" id="input-${inputIndex}" size = ${placeholderLength} placeholder="Enter ${obj.pos}" title="${obj.pos}" data-pos="${obj.pos}">`;
      previewDiv.innerHTML += `<span class="preview-el" id="preview-${previewIndex}">${obj.pos} </span>`;
      inputIndex += 1;
      previewIndex += 1;
    } else {
      editHTML = `<span>${obj.word} </span>`;
      previewDiv.innerHTML += `<span>${obj.word} </span>`;
    }
    inputEdit.forEach((div) => {
      div.innerHTML += editHTML;
    });
  });
  liveUpdate();
}

function liveUpdate() {
  const inputEdit = document.querySelectorAll(".madLibsEdit input");
  let spansTags = document.querySelectorAll(".preview-el");
  inputEdit.forEach((input) => {

    input.addEventListener("input", (e) => {
      let id = e.target.id;
      id = id.substring(6);
      if (e.target.value) {
        if (validateInput(input))
          document.querySelector(`#preview-${id}`).innerHTML = `${e.target.value} `;
        else
          document.querySelector(`#preview-${id}`).innerHTML = `${e.target.dataset.pos} `;
      }
    });
  });
  inputEdit.forEach((input, i) => {
    input.addEventListener("keyup", (event) => {
      let spanChild = spansTags[i];
      let inputNum = input.id.substring(6); // getting the input id number
      let previewNum = spansTags[i].id.substring(8); // getting the preview id number
      if (event.key === "Backspace") {
        input.style.color = "black";
        spanChild.style.color = "green";
        spanChild.innerHTML = `Give me ${input.title}`;
      } else {
        if (event.key === "Enter") {
          if (previewNum === inputNum) {
            if (validateInput(input)) {
              validateWord(input.value, input.title).then((result) => {
                if (result) {
                  spanChild.style.color = "blue";
                  spanChild.innerHTML = input.value;
                  inputEdit[i + 1].focus();
                } else {
                  spanChild.style.color = "purple";
                  spanChild.innerHTML = `still not ${input.title}`;
                  input.value = "";
                }
              });
            } else {
              alert("Word is lengthier than 20 letter");
              input.value = "";
              input.style.color = "black";
            }
          }
        }
      }
    });
  });
}

function validateInput(input) {
  if (input.value.length <= 20) {
    input.style.background = "green";
    return true;
  } else {
    input.style.background = "red";
    return false;
  }
}
