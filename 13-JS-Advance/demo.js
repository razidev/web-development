const productNameElement =   document.getElementById('product-name');
const remainingCharsElement = document.getElementById('remaining-chars');

// console.dir(productNameElement.length);
const maxAllowedChars = productNameElement.maxLength;

function updateRemainingChars(event) {
    const enteredText = event.target.value;
    const enteredTextLength = enteredText.length;

    const remainingChars = maxAllowedChars - enteredTextLength;

    remainingCharsElement.textContent = remainingChars;

    if (remainingChars === 0) {
        remainingCharsElement.classList.add('error');
        productNameElement.classList.add('error');
    } else if (remainingChars <= 10) {
        remainingCharsElement.classList.remove('error');
        productNameElement.classList.remove('error');
        remainingCharsElement.classList.add('warning');
        productNameElement.classList.add('warning');
    } else  {
        remainingCharsElement.classList.remove('warning');
        productNameElement.classList.remove('warning');
    }
}

productNameElement.addEventListener('input', updateRemainingChars);