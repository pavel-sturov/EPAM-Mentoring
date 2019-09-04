import { appendElements, createElement } from "./utils.js";

function createLayout() {
    const input = createElement('input', 'search');
    const wrapper = createElement('div', 'wrapper');
    const resultWindow = createElement('div', 'resultWindow');
    const header = createElement('h1');
    const header2 = createElement('h2');
    const img = createElement('img');
    const body = document.querySelector('body');
    const welcomeText = 'Welcome to Citysearch';
    const chooseText = 'Choose a City';
    const inputText = 'I\'m looking for...';
    const MAX_RESULTS_SIZE = 5;

    const citiesContainer = [];

    for (let i =0; i < MAX_RESULTS_SIZE; i ++) {
        citiesContainer.push(createElement('div'));
    }

    img.setAttribute('src', '../src/img/logo.png');
    input.placeholder = inputText;
    header.innerText = welcomeText;
    header2.innerText = chooseText;

    appendElements([header, wrapper, img], body);
    appendElements([header2, input, resultWindow], wrapper);
    appendElements(citiesContainer, resultWindow);
}


export { createLayout };
