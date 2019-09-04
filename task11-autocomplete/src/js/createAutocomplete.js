function createAutoComplete (arg) {
    return function (input) {
        const MAX_RESULTS_SIZE = 5;
        if (!input) {
            return [];
        }

        const resultWindow = [];
        const matchStr = `^${input.toLowerCase()}`;

        for (let i = 0; i < arg.length; i ++) {
            if (resultWindow.length === MAX_RESULTS_SIZE) {
                break;
            }
            if (arg[i].toLowerCase().match(matchStr)){
                resultWindow.push(arg[i]);
            }
        }

        return resultWindow;
    }
}

export { createAutoComplete };
