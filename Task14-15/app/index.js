const axios = require('axios');
const fs = require('fs');
const checkConnection = require('./utils/checkConnection');
const writeToResult = require('./utils/writeToResult');
const constants = require('./utils/constants');

const urls = fs.readFileSync("urlsList.txt", "utf8").split('\n');

let secondsAfterStart = 1;              //For timer method
let urlsLength = urls.length;           
let errorCounter = 0;
let timer;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//Method to control process
function processController() {
    checkConnection((isConnect) => {

        if (!isConnect) {
            clearInterval(timer);

            let secToLooseData = constants.SECONDS.requestTimeout - secondsAfterStart;
            let toLoose = setInterval(reconnect, constants.TIMEOUTS.reconnect);

            //Method to create reconnection timer. If connection lost.
            function reconnect() {
                checkConnection(isConnected => {
                    if (!isConnected) {
                        secToLooseData -= constants.SECONDS.toReconnect;
                        if (secToLooseData < 0) {
                            console.log(constants.MESSAGES.lostData);
                            return clearInterval(toLoose);
                        }
                        console.log(secToLooseData);
                    }
                    if (isConnected) {
                        console.log(constants.MESSAGES.reconnected);
                        writeToResult(`Reconnected at ${new Date}\n`);
                        return clearInterval(toLoose);
                    }
                })

           }

            console.log(`I really tried... Lost connection. You have ${constants.SECONDS.requestTimeout - secondsAfterStart} seconds to reconnect and get the result.`);
            writeToResult(`${constants.MESSAGES.lostConnection}${new Date()}\n`);
        }

        //To send messages of the end process
        if (urlsLength === 0) {
            if (errorCounter === 0) {
                console.log(`Perfect, just ${secondsAfterStart} second! No errors!`);
            } else {
                console.log(`Not bad, just ${secondsAfterStart} second! ${errorCounter} errors!` );
            }
            clearInterval(timer);
            writeToResult(`End checking at ${new Date}\n`);
        }
    });
    console.log(`${secondsAfterStart} sec.`);
    secondsAfterStart++;
}

//Method to create requests to Google Page Speed API
async function createRequests(url) {
    try {
        let json = await axios({
            method: 'get',
            url: `${constants.API_URL}${url}`,
            timeout: constants.TIMEOUTS.json,
        });
        return {
            url: json.data.id,
            request: json.data.responseCode === 200
                ? `${json.data.ruleGroups.SPEED.score} points`
                : `We have got the problem, error code: ${json.data.responseCode}`
        }
    }
        catch (error) {
            console.log(error.response.data.error);
            errorCounter ++;
            return {
                error: true,
                url: `\n-------\nPlease check the url '${url}', it may be wrong!\n`,
                request: `Error code: ${error.response.data.error.code}\n-------`,
            }
        }
}

//Method to start testing
function startTesting() {
    console.log(`I have ${urls.length} url(s) to check, and i am going now!`);
    writeToResult(`Start checking at ${new Date}`);
    urls.forEach(element => {
        createRequests(element)
            .then((result) => {
                writeToResult(`${result.url} - ${result.request}\n`);
                console.log(`${element} Checked!`);
                urlsLength --;
            });
    });
}

//Check connection in start
checkConnection((isChecked) => {
    if (!isChecked) {       //If we have no connection
        return console.log('Please connect to the Internet!')
    } else {                //If we have connection process will start
        startTesting();
        timer = setInterval(processController, constants.TIMEOUTS.timer);
    }
});



