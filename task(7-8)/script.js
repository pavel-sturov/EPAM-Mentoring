// ------------------- My Array, String and other methods -----------------------
Array.prototype.push = function() {
    for (let i = 0; i < arguments.length; i ++) {
        this[this.length] = arguments[i];
    }
    return this;
};

Array.prototype.slice = function(start, end = this.length) {
    let newArr = [];
    for (let i = start; i < end; i ++) {
        newArr.push(this[i]);
    }
    return newArr;
};

String.prototype.search = function (reg) {
    if (this.indexOf(reg) >= 0) {
        return true;
    }
};

function toArray (obj) {
    let temp = [];
    for (let el in obj) {
        temp.push(obj[el]);
    }
    return temp;
}


// ----------------- Necessary methods for work with Lodash -----------------------


function remakeValue(value) {                    // -- Main method for remake value
    if (typeof value === "string") {
        return prop(value);
    }

    if (typeof value === "object") {
        if (Array.isArray(value)) return isTrueArr(...value);

        return isTrueObj(value);
    }
}

function prop(path) {                           // -- Remake String
    return (obj) => obj[path];
}

function isTrueArr(path, srcValue) {           // -- Remake Array
    return (object) => {
        if (object[path] !== srcValue) {
            return false;
        }
        return true;
    };
}

function isTrueObj(source) {                    // -- Remake Object
    return (object) => {
        for (let k in source) {
            if (object[k] !== source[k]) {
                return false;
            }
        }
        return true;
    }
}

// ------------ My Custom Lodash implement --------------------
// ---------------------- Arrays ------------------------------
// ---------------------- Chunk -------------------------------

function chunk (arr, size = 1) {
    let start = 0;
    let end = size;
    let result = [];

    for (let i = 0; i < arr.length/size; i ++) {
        if (end > arr.length) {
            end = arr.length;
        }
        result.push(arr.slice(start, end));
        start += size;
        end += size;
    }
    return result;
}

// ------------------------ Compact -------------------------------

function compact(array) {
    let result = [];
    for (let i = 0; i < array.length; i ++) {
        if (!!array[i] !== false) {
            result.push(array[i]);
        }
    }
    return result;
}


// ------------------------ Drop ---------------------------------


function drop(array, number = 1) {
    return array.slice(number);
}


// ---------------------- dropWhile -------------------------------


function dropWhile(array, value) {
    let temp;
    if (typeof value !== "function") {
        value = remakeValue(value);
    }
    for (let i = 0; i < array.length; i++) {
        if (!value(array[i], i, array)) {
            temp = i;
            break;
        }
    }
    return array.slice(temp);
}


// ------------------------ Take --------------------------------


function take(array, n = 1) {
    if (n > array.length) {
        n = array.length;
    }
    return array.slice(0, n);
}


// ------------------------- Filter ----------------------------------


function filter(collection, value) {
    let result = [];
    if (typeof value !== "function") {
        value = remakeValue(value);
    }
    for (let i = 0; i < collection.length; i++) {
        if (value(collection[i], i, collection)) {
            result.push(collection[i]);
        }
    }

    return result;
}


// ------------------------- Find ----------------------------------


function find(collection, value, fromIndex = 0) {
    if (typeof value !== "function") {
        value = remakeValue(value);
    }

    for (let i = fromIndex; i < collection.length; i++) {
        if (value(collection[i], i, collection)) {
            return collection[i];
        }
    }
    return undefined;
}


// ----------------------- Includes -------------------------------


function includes(collection, value, fromIndex = 0) {

    if (typeof collection === "string") {
        return collection.search(value);
    }

    else {
        let values = toArray(collection).slice(fromIndex);

        for (let i = 0; i < values.length; i ++) {
            if (values[i] === value) {
                return true;
            }
        }
    }
    return false;
}


// -------------------------- Map -----------------------------------


function map(collection, value) {
    let result = [];
    let keys = Object.keys(collection);

    if (typeof value !== "function") {
        value = remakeValue(value);
    }
    for (let i = 0; i < keys.length; i++) {
        result.push(value(collection[keys[i]], keys[i], collection));
    }
    return result;
}


// ------------------------ Zip ---------------------------------


function zip() {
    let arg = [...arguments];
    let result = [];
    let innerArrayIndex = 0;
    let tempArray = [];

    for (let i = 0; i < arg.length; i ++) {
        if (arg[i][innerArrayIndex] !== undefined) {
            tempArray.push(arg[i][innerArrayIndex]);
        }
        if (i === arg.length - 1 && innerArrayIndex < arg[0].length) {
            result.push(tempArray);
            innerArrayIndex ++;
            tempArray = [];
            i = -1;
        }
        if (innerArrayIndex === arg[0].length && i === arg.length - 1) {
            break;
        }
    }
    return result;
}


// ------------------------ Object -------------------------------
// ------------------------- Merge ----------------------------------


function merge(object, ...sources) {
    for (let i = 0; i < sources.length; i++) {

        for (let k in sources[i]) {
            if (k in object) {
                if (typeof object[k] === "object") {
                    merge(object[k], sources[i][k]);
                }
                else object[k] = sources[i][k];
            }
            else object[k] = sources[i][k];
        }
    }
    return object;
}


// ------------------------- Omit -------------------------------


function omit(obj, paths) {
    let result = {};
    for (let i in obj) {
        if (!includes(paths, i)) {
            result[i] = obj[i];
        }
    }
    return result;
}


// ------------------------- omitBy --------------------------------


function omitBy(object, value) {
    let result = {};

    if (typeof value !== "function") {
        value = remakeValue(value)
    }

    for (let i in object) {
        if (!value(object[i], i)) {
            result[i] = object[i];
        }
    }
    return result;
}


// ------------------------ Pick ---------------------------------


function pick(collection, paths) {
    let result = {};
    for (let i in collection) {
        if (includes(paths, i)) {
            result[i] = collection[i];
        }
    }
    return result;
}


// ------------------------- pickBy ----------------------------------


function pickBy(object, value) {
    let result = {};

    if (typeof value !== "function") {
        value = remakeValue(value)
    }

    for (let i in object) {
        if (value(object[i], i)) {
            result[i] = object[i];
        }
    }
    return result;
}


// ---------------------- toPairs ----------------------------------


function toPairs(object) {
    let result = [];

    for (let i in object) {
        if (object[i] !== object.__proto__[i]) {
            result.push([i, object[i]]);
        }
    }
    return result;
}
