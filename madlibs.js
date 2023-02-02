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

const inputEdit = document.querySelectorAll(".madLibsEdit");
const previewDiv = document.querySelector(".madLibsPreview");

let joinStory = getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    displayStory(processedStory);
  });

function displayStory(story) {
  let inputIndex = 0;
  let previewIndex = 0;
  let previewStory = "";
  let editStory = "";
  story.forEach((obj) => {
    if (obj.pos) {
      editStory = `<input type="text" id="input-${inputIndex}" placeholder="Enter ${obj.pos}" title="${obj.pos}">`;
      previewStory += `<span class="preview_el" id="preview-${previewIndex}">${obj.pos} </span>`;
      inputIndex += 1;
      previewIndex += 1;
    } else {
      editStory = `<span>${obj.word} </span>`;
      previewStory += `<span>${obj.word} </span>`;
    }
    inputEdit.forEach((div) => {
      div.innerHTML += editStory;
    });
    previewDiv.innerHTML = previewStory;
  });
  liveUpdate();
}

function liveUpdate() {
  const inputEdit = document.querySelectorAll(".madLibsEdit input");
  let spansTags = document.querySelectorAll(".preview_el");

  inputEdit.forEach((input, i) => {
    input.addEventListener("keyup", (event) => {
      let spanChild = spansTags[i];

      let inputNum = input.id.substring(6); // getting the input id number
      let previewNum = spansTags[i].id.substring(8);// getting the preview id number

      if (event.key === "Backspace") 
      {
        spanChild.style.color = "green";
        spanChild.innerHTML = `Give me ${input.title}`;
      } 
      else {
        if (event.key === "Enter") {
          if (previewNum === inputNum) {
            validateWord(input.value, input.title).then((result) => {
              if (result) {
                spanChild.style.color = "blue";
                spanChild.innerHTML = input.value;
              } else {
                spanChild.style.color = "purple";
                spanChild.innerHTML = `still not ${input.title}`;
                input.value = "";
              }
            });
          }
        }
      }
    });
  });
}
