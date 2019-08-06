function createAutoComplete (arg) {
    return function (input) {
        if (!input) {
            return [];
        }

        const result = [];
        const matchStr = `^${input.toLowerCase()}`;

        for (let i = 0; i < arg.length; i ++) {
            if (arg[i].toLowerCase().match(matchStr)){
                result.push(arg[i]);
            }
        }

        return result;
    }
}

module.exports = { createAutoComplete };
