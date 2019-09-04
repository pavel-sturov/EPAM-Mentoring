import { createAutoComplete } from "./createAutocomplete.js";

function search() {
    const input = document.querySelector('.search');
    let autocomplete;

    const resultCities = document.querySelectorAll('.resultWindow div');

    function inputHandler (e) {
        const value = e.target.value;
        const cities = autocomplete(value);
        resultCities.forEach((el, index) => {
            el.innerText = cities[index] || '';
        })
    }

    fetch("../cities/cities.json")
        .then(response => response.json())
        .then(cities => autocomplete = createAutoComplete(cities))
        .then(() => input.addEventListener('input', inputHandler))
}

export { search };
