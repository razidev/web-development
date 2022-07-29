// document.body.children[1].children[0].href = 'https://google.com';

let anchorElement = document.getElementById('external-id');
anchorElement.href = 'https://google.com';

anchorElement = document.querySelector('p a');
anchorElement.href = 'https://razidev.github.io';

//Add an element
//1. Create the new element
let newAnchorElement = document.createElement('a');
newAnchorElement.href = 'https://razidev.github.io/resume';
newAnchorElement.textContent = 'going to my resume';

//2. Get access to the parent element that should hold the new element
let firstParagraph = document.querySelector('p');

//3. insert the new element into the parent element content
firstParagraph.append(newAnchorElement);

//Remove elements
//1. select the element that should be removed
let removeH1Element = document.getElementById('h1-id');

//2. remove it
// removeH1Element.remove();
removeH1Element.parentElement.removeChild(removeH1Element); //for olders browser

//Move element
firstParagraph.parentElement.append(firstParagraph);

//Inner html
firstParagraph.innerHTML = 'this is change the <strong>firstparagraph<strong>.';