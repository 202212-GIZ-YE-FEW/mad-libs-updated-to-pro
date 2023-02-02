/**
 * DO NOT TOUCH ANY OF THE CODE BELOW HERE.
 * 
 * Or you will be very sad.
 */
const getRawStory = (index) => {
  console.log(index);
  return new Promise((resolve, reject) => {
    const url = `https://madlibs-api-gymhn.ondigitalocean.app/api/stories/${index}/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.text);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
