let paragraphElement = document.querySelector('p');

function changeParagraphText(event) {
    console.log(event)
    paragraphElement.textContent = 'Clicked';
    console.log('paragraph is clicked')
}

paragraphElement.addEventListener('click', changeParagraphText);

let inputElement = document.querySelector('input');

function retreiveUserInput(event) {
    console.log(event)
    // let text = inputElement.value;
    // let text = event.data;   
    let text = event.target.value;
    console.log(text);
}

inputElement.addEventListener('input', retreiveUserInput);