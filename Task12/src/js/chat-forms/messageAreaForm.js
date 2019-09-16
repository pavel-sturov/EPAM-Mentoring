import { createElement, appendElements, getTime } from '../utils/utils.js';
import { SYSTEM_MESSAGES } from '../utils/constants.js';

export class MessageAreaForm {
    constructor(sendMessageToWS, notify) {
        this.sendMessageToWS = sendMessageToWS;
        this.notify = notify;

        this.messages = [];     //ARRAY OF MESSAGES
        this.wrapper = createElement('div', 'message-history');     //WINDOW WITH MESSAGE HISTORY
        this.sendItemsWrapper = createElement('div', 'send-items');
        this.status = createElement('div', 'no-messages');
        this.messageInput = createElement('textarea', 'message');
        this.send = createElement('button', 'send');
        this.bottomBtn = createElement('button', 'bottom-btn');
        this.messageCounter = createElement('div', 'msg-counter');
        this.status.innerText = SYSTEM_MESSAGES.NO_MESSAGES;
        this.messageInput.setAttribute('placeholder', SYSTEM_MESSAGES.ENTER_MESSAGE);
        this.send.addEventListener('click', this.sendMessage.bind(this));
        this.bottomBtn.addEventListener('click', this.toScrollDown.bind(this));
    }

//METHOD ADDS COMPONENTS TO THE DOM
    addToDOM(userName) {
        this.userName = userName;
        appendElements([this.wrapper, this.sendItemsWrapper,], document.querySelector('body'));
        appendElements([ this.status], this.wrapper);
        appendElements([this.messageInput, this.send, this.bottomBtn, this.messageCounter], this.sendItemsWrapper);
    };

//TO DISPLAY SCROLL DOWN BUTTON
    displayScrollDownBtn() {
        if ((this.wrapper.scrollTop + 850) < this.wrapper.scrollHeight) {
            this.bottomBtn.style.visibility = 'visible';
            this.bottomBtn.style.opacity = '1';

        }
        else {
            this.bottomBtn.style.opacity = '0';
            this.bottomBtn.style.visibility = 'hidden';
        }
    };

//TO SCROLL DOWN
    toScrollDown() {
        this.wrapper.scrollTop = this.wrapper.scrollHeight;
    };

//TO SEND MESSAGES
    sendMessage() {
        this.sendMessageToWS(this.messageInput.value);
        this.messageInput.value = '';
    };

//TO PRINT MESSAGES AT THE PAGE
    printMessage(data) {
        data = data.sort((a, b) => a.time - b.time);

        data.forEach((msgData) => {
            const { from , message, time } = msgData;
            const currentMsgClass = this.userName === from ? 'my-message' : 'incoming-message';
            const currentMessage = createElement('div', currentMsgClass);
            const text = createElement('div', 'text-message');
            const currentTime = createElement('div', 'time');
            const author = createElement('div', 'author-name');

            author.innerText = from;
            currentTime.innerText = getTime(time);
            text.innerText = message;

            appendElements([currentMessage], this.wrapper);
            appendElements([author, text, currentTime], currentMessage);
            this.messages.push(msgData);
            if (document.hidden) {
                this.notify(msgData);
            }
        });
        this.wrapper.scrollTop = this.wrapper.scrollHeight;
    };

//TO HIDDEN INPUT AND BUTTON OF SEND MESSAGES
    onClose() {
    this.send.style.visibility = 'hidden';
    this.messageInput.style.visibility = 'hidden';
};

//TO DISPLAY INPUT AND BUTTON OF SEND MESSAGES
    onOpen() {
    this.send.style.visibility = 'visible';
    this.messageInput.style.visibility = 'visible';
};
}