const MESSAGES = {
    lostConnection: `Lost internet connection in: `,
    lostData: `Unfortunately you have lost request data!`,
    reconnected: `Very good! You have reconnected!` ,
};

const TIMEOUTS = {
    timer: 1000,
    reconnect: 3000,
    json: 60000,
};

const SECONDS = {
    toReconnect: 3,
    requestTimeout: 57,
};

const API_URL = `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?key=AIzaSyCFW_3InCvVSaIviSRujiL2C1Mi8dITWS0&url=`;

module.exports = {
    MESSAGES: MESSAGES,
    API_URL: API_URL,
    TIMEOUTS: TIMEOUTS,
    SECONDS: SECONDS,
};