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
  words.forEach(word => {
    let wordObj = { word: word.trim() }
    if (word.includes("[")) {
      let pos = word.match(/\[([a-z])\]/)[1];
      wordObj.pos = posMap[pos];
    } else if (word.includes(",")) {
      wordObj.word = ",";
    }
    else if (word.includes(".")) {
      wordObj.word = ".";
    }
    result.push(wordObj);
  });
  return result;
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
});

function displayStory(processedStory) {
  let story = "";
  const madLibsEdit = document.querySelector(".madLibsEdit");
  const madLibsPreview = document.querySelector(".madLibsPreview");
  processedStory.forEach((word) => {
    if (word.hasOwnProperty("pos")) {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("placeholder", word.pos);
      madLibsEdit.append(input);
      story += " " + word.word;
    } else {
      story += " " + word.word;
    }
  });
  madLibsPreview.innerHTML = story;
}



function validateInput(input){
        
  if(input <= input.charAt(20))


}


