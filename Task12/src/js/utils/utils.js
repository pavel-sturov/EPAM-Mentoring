function appendElements (elements, to) {
    elements.forEach(el => to.appendChild(el));
}

function createElement (tag, classes) {
    const elem = document.createElement(tag);

    if (classes) {
        elem.classList.add(classes);
    }
    return elem;
}

function getTime (mlsc) {
    const time = new Date(mlsc);
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    return `${hours} : ${minutes}`;
}

export { appendElements, createElement, getTime };