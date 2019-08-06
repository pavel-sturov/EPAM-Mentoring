function createAutoComplete (arg) {
    return function (a) {
        if (a === "" || !a ) {
            return [];
        }
        else {
            let result = [];
            for (let i = 0; i < arg.length; i ++) {
                if (arg[i].toLowerCase().match("^"+a.toLowerCase())){ //or temp[i].indexOf(a) >= 0;
                    result.push(arg[i]);
                }
            }
            return result;
        }
    }
}

module.exports = { createAutoComplete };
