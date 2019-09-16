function appendElements(elements, to) {
    elements.forEach(el => to.appendChild(el));
}

function createElement(tag, classes) {
    const elem = document.createElement(tag);

    if (classes) {
        elem.classList.add(classes);
    }
    return elem;
}

export { appendElements, createElement };
