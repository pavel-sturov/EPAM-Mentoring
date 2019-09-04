import { appendElements, createElement } from "./utils.js";

function createLayout() {
    const input = createElement('input', 'search');
    const wrapper = createElement('div', 'wrapper');
    const resultWindow = createElement('div', 'resultWindow');
    const header = createElement('h1');
    const header2 = createElement('h2');

    const citiesContainer = [];
    for (let i =0; i < 5; i ++) {
        citiesContainer.push(createElement('div'));
    }

    input.placeholder = 'I\'m looking for...';
    header.innerText = 'Welcome to Citysearch';
    header2.innerText = 'Choose a City';

    document.body.appendChild(header);
    document.body.appendChild(wrapper);

    appendElements([header2, input, resultWindow], wrapper);
    appendElements(citiesContainer, resultWindow);
}


export { createLayout };
