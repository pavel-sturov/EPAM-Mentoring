import { getName } from '../utils/localStorage.js';
import { WEB_SOCKET_URL } from "../utils/constants.js";
import { LoginForm } from '../chat-forms/loginForm.js';
import { StatusForm } from "../chat-forms/statusForm.js";
import { MessageAreaForm } from "../chat-forms/messageAreaForm.js";
import { renderPageHeader } from "../utils/pageHeader.js";

function ChatController () {
    renderPageHeader();
    this.userName = getName();
    this.loginForm = new LoginForm(this.logIn.bind(this));
    this.statusForm = new StatusForm(this.closeWS.bind(this), this.openWS.bind(this));
    this.messageArea = new MessageAreaForm(this.sendMessage.bind(this), this.notify.bind(this));

    if (!this.userName) {
        this.loginForm.addToDOM();
    } else {
        this.renderChat();
        this.openWS();
    }

    //INTERVAL TO HIDE/SHOW SCROLL DOWN BUTTON
    setInterval(() => {
        this.messageArea.displayScrollDownBtn();
    }, 200);
}

//TO CLOSE WS CONNECTION
ChatController.prototype.closeWS = function () {
  this.ws.close();
  this.messageArea.onClose();
};


//TO OPEN WS CONNECTION
ChatController.prototype.openWS = function () {
    this.ws = new WebSocket(WEB_SOCKET_URL);

    this.messageArea.onOpen();

    this.ws.onmessage = response => {
        this.messageArea.printMessage(JSON.parse(response.data));
    };
};


//TO RENDER CHAT
ChatController.prototype.renderChat = function () {
    this.statusForm.addToDOM(this.userName);
    this.messageArea.addToDOM(this.userName);
};

//TO SEND MESSAGE WITH WS
ChatController.prototype.sendMessage = function (message) {
    this.ws.send(JSON.stringify({ from: this.userName, message }));
};

//TO LOG IN
ChatController.prototype.logIn = function () {
    this.userName = this.loginForm.saveName();
    if (this.userName) {
        this.openWS();
        this.loginForm.hideLoginForm();
        this.renderChat();
    }
};

//TO SEND NOTIFY
ChatController.prototype.notify = function (msgData) {
    if (window.Notification && Notification.permission !== "denied" && msgData) {
        Notification.requestPermission((status) => {
            if (status === "granted") {
                new Notification(msgData.from, { "body": msgData.message, });
            }
        })
    }
};

export { ChatController };
