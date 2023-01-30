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
  // This line is currently wrong :)
}
// getRawStory().then(parseStory).then((processedStory) => {
//   console.log(processedStory);
// });

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

const inputEdit = document.querySelectorAll(".madLibsEdit  input");
const preview = document.getElementsByClassName(".madLibsPreview ");
const previewDiv = document.querySelector(".madLibsPreview");

let mathcedBrackets = previewDiv.innerHTML.match(/\w*\[.*?\]/g);

let joinStory = getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    gatheringStory(processedStory)
  });


function gatheringStory(ps){
  let fullStory = "";
  let i = 0 // to make id for each box
  ps.forEach((ps) => {
    if (ps.hasOwnProperty("pos")){
    //  console.log(ps);
     let newWord = document.createElement("span");
      newWord.setAttribute("id", `${i}`);
          newWord.style.border = "2px solid black";
          newWord.style.display = "inline-block"; 
          newWord.style.height = "3vh";
          newWord.style.margin = "0 auto"
          newWord.style.padding = "2px"
          // newWord.style.textAlign = "center"
          newWord.style.width = "20vh";
         
     fullStory += newWord.outerHTML+ " ";
     i++
    }
    else {
      fullStory += ps.word + " ";
    }
   
  });
  let storySpan = document.createElement("div");
  storySpan.setAttribute("id","story-span")
 
  storySpan.innerHTML = fullStory;
  previewDiv.append(storySpan);
  
}



inputEdit.forEach((input, i) => {
  inputEdit[i].addEventListener("keyup", () => {
    let spansTag = document.querySelector("#story-span")
     console.log(parseInt(spansTag.children[i].id) === i);
    if (parseInt(spansTag.children[i].id) === i)
      {
        // console.log(inputEdit[i].value);
        spansTag.children[i].innerHTML = inputEdit[i].value
      }
    
  });
});
