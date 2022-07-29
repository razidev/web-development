//Sumber Numbers
const calculateSumButtonElement = document.querySelector('#calculator button');

function calculateSum() {
    const userNumberInputElement = document.getElementById('user-number');
    const enteredNumber = userNumberInputElement.value;

    let sumUpToNumber = 0;

    for (let i = 0; i <= enteredNumber; i++) {
        sumUpToNumber += i;
    }

    const outputResultElement = document.getElementById('calculated-sum');
    outputResultElement.textContent = sumUpToNumber;
    outputResultElement.style.display = 'block';
}

calculateSumButtonElement.addEventListener('click', calculateSum);


//Highlight links
const highlightElementButton = document.querySelector('#highlight-links button');

function highlightLink() {
    const anchorElements = document.querySelectorAll('#highlight-links a');
    for (const anchorElement of anchorElements) {
        anchorElement.classList.add('highlight');
    }
}

highlightElementButton.addEventListener('click', highlightLink)

//dummy user data
const myData = {
    firstName: 'Razi',
    lastName: 'Syahputro',
    age: 25
};

const displayUserDataButtonElement = document.querySelector('#user-data button');

function displayUserData() {
    const outputDataElement = document.getElementById('output-user-data');
    outputDataElement.innerHTML = '';
    for (const key in myData) {
        const newUserDataListElement = document.createElement('li');
        const outputText =  key.toUpperCase() + ': ' + myData[key];
        newUserDataListElement.textContent = outputText;
        outputDataElement.append(newUserDataListElement);
    }
}

displayUserDataButtonElement.addEventListener('click', displayUserData);

//statistic / roll the dice
const rollDiceButtonElement = document.querySelector('#statistics button');

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function deriveNumberOfDiceRolls() {
    const targetNumberInputElement = document.getElementById('user-target-number');
    const diceRollsListElement = document.getElementById('dice-rolls');

    const enteredNumber = targetNumberInputElement.value;
    diceRollsListElement.innerHTML = '';

    let hasRolledTargetNumber = false;
    let numberOfRolls = 0;
    while (!hasRolledTargetNumber) {
        const rolledNumber = rollDice();
        numberOfRolls++;
        const newRollsListELement = document.createElement('li');
        const outputText = 'Roll ' + numberOfRolls + ': ' + rolledNumber;
        newRollsListELement.textContent = outputText;
        diceRollsListElement.append(newRollsListELement);

        hasRolledTargetNumber = rolledNumber == enteredNumber;
    }

    const outputRollsTotalElement = document.getElementById('output-total-rolls')
    const outputTargetNumberElement = document.getElementById('output-target-number');

    outputRollsTotalElement.textContent = numberOfRolls;
    outputTargetNumberElement.textContent - enteredNumber;
}

rollDiceButtonElement.addEventListener('click', deriveNumberOfDiceRolls);