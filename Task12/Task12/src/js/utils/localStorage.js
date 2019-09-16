import { LOCAL_STORAGE_KEY } from "./constants.js";

//TO GET NAME FROM LOCAL STORAGE
function getName () {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
}

//TO SET NAME TO LOCAL STORAGE
function setName (value) {
    localStorage.setItem(LOCAL_STORAGE_KEY, value);
}


//TO CLEAR LOCAL STORAGE
function clear () {
    return localStorage.clear();
}

export { getName, setName, clear };