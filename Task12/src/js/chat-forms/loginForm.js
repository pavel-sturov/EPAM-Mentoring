import { createElement, appendElements } from '../utils/utils.js';
import { setName } from '../utils/localStorage.js';
import { SYSTEM_MESSAGES } from '../utils/constants.js';

export class LoginForm {
    constructor(logIn) {
        this.logIn = logIn;
        this.wrapper = createElement('div', 'login-form');
        this.h2 = createElement('h2');
        this.input = createElement('input');
        this.submitNameBtn = createElement('button');
        this.h2.innerText = SYSTEM_MESSAGES.START_CHAT;
        this.input.setAttribute('placeholder', SYSTEM_MESSAGES.NAME_PLACEHOLDER);
        this.submitNameBtn.addEventListener('click', logIn);
    }

    //METHOD ADDS COMPONENTS TO THE DOM
    addToDOM() {
        appendElements([this.wrapper], document.querySelector('body'));
        appendElements([this.h2, this.input, this.submitNameBtn], this.wrapper);
        this.wrapper.scrollTop = this.wrapper.scrollHeight;
    };

    //TO HIDE LOGIN FORM
    hideLoginForm() {
        this.wrapper.style.display = 'none';
        this.submitNameBtn.removeEventListener('click', this.logIn);
    };

    //TO SAVE NAME IN LOCAL STORAGE
    saveName() {
        const userName = this.input.value;

        if (userName.length < 3) return false;

        setName(userName);
        return userName;
    };
}