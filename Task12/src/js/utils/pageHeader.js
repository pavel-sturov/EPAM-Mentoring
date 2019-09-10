import { createElement, appendElements } from './utils.js';
import { SYSTEM_MESSAGES } from './constants.js';

//HEADER OF THE PAGE
function renderPageHeader () {
    const header = createElement('h1');
    header.innerText = SYSTEM_MESSAGES.GREETING;
    appendElements([header], document.querySelector('body'));
}

export { renderPageHeader };