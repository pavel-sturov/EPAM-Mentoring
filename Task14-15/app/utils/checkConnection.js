//Method to check connection
function checkConnection(func) {
    require('dns').lookup('google.com',function(err) {
        if (err && err.code === "ENOTFOUND") {
            func(false);
        } else {
            func(true);
        }
    })
}

module.exports = checkConnection;