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
  let storyWordsArr = [];
  let spilttedStory = rawStory.split(/(?=[,.\s])/g);

  spilttedStory.forEach((word) => {
    let wordObj = {};
    let tirmWord = word.trim();
    if (tirmWord == word.match(/\w*\[.*?\]/g)) {
      let splitPOS = tirmWord.split(/(?=[[ ])/);

      wordObj.word = splitPOS[0];
      wordObj.pos = splitPOS[1];

      storyWordsArr.push(wordObj);
    } else {
      wordObj.word = tirmWord;
      storyWordsArr.push(wordObj);
    }
  });
  return storyWordsArr;
}
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
