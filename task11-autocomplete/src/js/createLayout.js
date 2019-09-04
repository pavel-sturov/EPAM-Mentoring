import { appendElements, createElement } from "./utils.js";

function createLayout() {
    const input = createElement('input', 'search');
    const wrapper = createElement('div', 'wrapper');
    const resultWindow = createElement('div', 'resultWindow');
    const header = createElement('h1');
    const header2 = createElement('h2');
    const img = document.createElement('img');
    const body = document.querySelector('body');

    const citiesContainer = [];
    for (let i =0; i < 5; i ++) {
        citiesContainer.push(createElement('div'));
    }

    img.setAttribute('src', '../src/img/logo.png');
    input.placeholder = 'I\'m looking for...';
    header.innerText = 'Welcome to Citysearch';
    header2.innerText = 'Choose a City';

    appendElements([header, wrapper, img], body);
    appendElements([header2, input, resultWindow], wrapper);
    appendElements(citiesContainer, resultWindow);
}


export { createLayout };
