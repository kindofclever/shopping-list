// selectors
const userInput = document.getElementsByClassName('list__inputfield')[0];
const addButton = document.getElementsByClassName('input__btn--add')[0];
const list = document.getElementsByClassName('list')[0];
let items;

// functions
const userInputLengthValid = () => {
    if (userInput.value.length > 0) {
        return true;
    } 
};

const checkIfItemsInLocalStorage = () => {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
};

const saveItemToLocalStorage = shoppingItem => {
    checkIfItemsInLocalStorage();
    items.push(shoppingItem);
    localStorage.setItem('items', JSON.stringify(items));
};

const removeItemFromLocalStorage = item => {
    checkIfItemsInLocalStorage();
    const itemIndex = item.parentElement.firstChild.innerText;
    items.splice(items.indexOf(itemIndex), 1);
    localStorage.setItem('items', JSON.stringify(items));
};

const createListItem = () => {
    // create wrapper div
    const div = document.createElement('div');
    div.classList.add('list__itemcontainer');
    // list item 
    const listItem = document.createElement('li')
    listItem.appendChild(document.createTextNode(userInput.value));
    listItem.classList.add('list__item');
    div.appendChild(listItem);
    // save to localStorage
    saveItemToLocalStorage(userInput.value);
    //div for buttons
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('list__btndiv');
    // done button
    const doneButton = document.createElement('button');
    doneButton.appendChild(document.createTextNode('Done'));
    doneButton.classList.add('list__btn--done');
    buttonDiv.appendChild(doneButton);
    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.classList.add('list__btn--delete');
    buttonDiv.appendChild(deleteButton);
    // add buttonDiv to div itemcontainer
    div.appendChild(buttonDiv);
    // add to ul
    list.appendChild(div);
    userInput.value = '';
};

const addToListAfterBtnClick = () => {
    if (userInputLengthValid()) {
        createListItem();
    }
};

const markAsDoneOrDelete = event => {
    const item = event.target
    const parent = item.parentElement;

    if (item.classList[0] === 'list__btn--delete') {
        parent.parentElement.remove();
        removeItemFromLocalStorage(parent); 
    }
    if (item.classList[0] === 'list__btn--done') {
        parent.previousSibling.classList.toggle('item--complete')
    }
};

const getItemsFromLocalStorage = () => {
    checkIfItemsInLocalStorage();
    items.forEach(item => {    
    // wrapper div
    const div = document.createElement('div');
    div.classList.add('list__itemcontainer');
    // list item 
    const listItem = document.createElement('li')
    listItem.appendChild(document.createTextNode(item));
    listItem.classList.add('list__item');
    div.appendChild(listItem);
    //div for buttons
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('list__btndiv');
    // done button
    const doneButton = document.createElement('button');
    doneButton.appendChild(document.createTextNode('Done'));
    doneButton.classList.add('list__btn--done');
    buttonDiv.appendChild(doneButton);
    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.classList.add('list__btn--delete');
    buttonDiv.appendChild(deleteButton);
    // add buttonDiv to div itemcontainer
    div.appendChild(buttonDiv);
    // add to ul
    list.appendChild(div);
    });
};  

// event listeners
document.addEventListener('DOMContentLoaded', getItemsFromLocalStorage);
addButton.addEventListener('click', addToListAfterBtnClick);
list.addEventListener('click', markAsDoneOrDelete);
