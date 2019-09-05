const items = [
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

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.appendChild(wrapper);

items.forEach((el) => {
    let elem = document.createElement(el.tagName);
    elem.classList.add(el.classes);
    elem.innerText = el.text;
    wrapper.appendChild(elem);
});

const elements = document.querySelectorAll('.item');
elements[0].classList.add('active');

document.onkeydown = move;
let counter = 0;

function move(e) {
    e = window.event;

    if (e.keyCode === 37) {      //left
        elements[counter].classList.remove('active');
        if (counter === 0) {
            counter = 3;
        }
        else {
            counter -= 1;
        }
        elements[counter].classList.add('active');
    }

    if (e.keyCode === 39) {      //right
        elements[counter].classList.remove('active');
        if (counter === 3) {
            counter = 0;
        }
        else {
            counter += 1;
        }
        elements[counter].classList.add('active');
    }
}
