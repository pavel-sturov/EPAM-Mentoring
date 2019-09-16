import { SYSTEM_MESSAGES } from "../utils/constants.js";
import { createElement, appendElements } from '../utils/utils.js';
import { clear } from "../utils/localStorage.js";

export class StatusForm {
    constructor(closeWS, openWS) {
        this.closeWS = closeWS;
        this.openWS = openWS;
        this.wrapper = createElement('div', 'status-wrapper');
        this.name = createElement('div', 'name');
        this.status = createElement('div', 'status');
        this.status.innerText = SYSTEM_MESSAGES.ONN;

        // buttons
        this.connectBtn = createElement('button', 'connect-btn');
        this.logoutBtn = createElement('button', 'logout-btn');
        this.disconnectBtn = createElement('button', 'disconnect-btn');

        // buttons event listeners
        this.logoutBtn.addEventListener('click', this.logOut.bind(this));
        this.connectBtn.addEventListener('click', this.connect.bind(this));
        this.disconnectBtn.addEventListener('click', this.disconnect.bind(this));
    }

    addToDOM(userName) {
        this.name.innerText = userName;
        appendElements([this.wrapper], document.querySelector('body'));
        appendElements([this.name, this.status, this.connectBtn, this.logoutBtn, this.disconnectBtn], this.wrapper);
    };

    disconnect() {
        this.closeWS();

        // change status to offline
        this.status.classList.toggle('online', false);
        this.status.classList.add('offline');
        this.status.innerText = SYSTEM_MESSAGES.OFF;

        // show connect button when disconnected
        this.disconnectBtn.style.visibility = 'hidden';
        this.connectBtn.style.visibility = 'visible';
    };

    logOut() {
        // clear local storage data
        clear();
        this.closeWS();
        document.location.reload();
    };

    connect() {
        this.openWS();

        // change status to online
        this.status.innerText = SYSTEM_MESSAGES.ONN;
        this.status.classList.remove('offline');
        this.status.classList.add('online');

        // show disconnect button when connected
        this.connectBtn.style.visibility = 'hidden';
        this.disconnectBtn.style.visibility = 'visible';
    };
}