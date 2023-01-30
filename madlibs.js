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


/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */


const inputEdit = document.querySelectorAll(".madLibsEdit  input")

// const inputPreview = document.querySelectorAll(".madLibsPreview input")
const preview = document.querySelector(".madLibsPreview p")

  // console.log(preview.innerHTML);
  // let splitStory = preview.innerHTML.split(/(?=[[ ])/)
  // console.log(splitStory);
  let mathcedBrackets = preview.innerHTML.match(/\w*\[.*?\]/g)
  // let mathcedBrackets = preview.innerHTML.match(/\[.*?\]/g)
  //  console.log(mathcedBrackets);

inputEdit.forEach((input, i)=>{
  
  inputEdit[i].addEventListener("keyup",()=>{
    // inputPreColl
    let existEle = document.getElementById(`${i}`)
      if (!existEle){

        let newWord = document.createElement("span")
            newWord.style.border = "2px solid black"
            newWord.style.width = "auto"
            newWord.setAttribute("id",`${i}`)
            newWord.innerHTML += inputEdit[i].value
            // preview.append(newWord)
            console.log(newWord);
            preview.innerHTML = preview.innerHTML.replace(`${mathcedBrackets[i]}`,newWord.outerHTML);
            
      }
      else {
        existEle.innerHTML = inputEdit[i].value
      }

    // let newWord = document.createElement("button")
    // newWord.setAttribute("id",`${i}`)
    
    //  console.log(preview);
    //  console.log(preview.children[0]);
    //  newWord.innerHTML += inputEdit[i].value
      //  console.log(newWord);
      //  console.log(preview);
      let pre = document.querySelector(".madLibsPreview")
       console.log(pre);
  })
  
})
// inputEdit.forEach((e,i)=> {console.log(inputEdit[i])})