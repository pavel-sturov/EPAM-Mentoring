let items = [
    {
        tagName: 'div',
        classes: 'wrapper',
        text : '',
    },
    {
        tagName : 'div',
        classes : 'item',
        text : 'MENU',
    },
    {
        tagName: 'div',
        classes: 'item',
        text : 'NEWS',
    },
    {
        tagName: 'div',
        classes: 'item',
        text : 'SETTINGS',
    },
    {
        tagName: 'div',
        classes: 'item',
        text : 'ON DEMAND',
    }];

items.map((el, index) => {
    let elem = document.createElement(el.tagName);
    elem.classList.add(el.classes);
    elem.innerText = el.text;
    if (index === 0) {
        document.body.appendChild(elem);
    }
    if (index > 0) {
        document.querySelector('.wrapper').appendChild(elem);
    }
});

document.querySelector('.item').classList.add('active');


document.onkeydown = move;
let counter = 0;

function move(e) {
    let items = document.querySelectorAll('.item');
    e = window.event;

    if (e.keyCode === 37) {      //left
        items[counter].classList.remove('active');
        if (counter === 0) {
            counter = 3;
        }
        else {
            counter -= 1;
        }
        items[counter].classList.add('active');
    }

    if (e.keyCode === 39) {      //right
        items[counter].classList.remove('active');
        if (counter === 3) {
            counter = 0;
        }
        else {
            counter += 1;
        }
        items[counter].classList.add('active');
    }
}
