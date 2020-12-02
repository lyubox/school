import { getUserData, getUserId, setUserData, objectToArray } from "./util.js";

const databaseUrl = "https://examdb-dce85.firebaseio.com/";
const apiKey = "AIzaSyBAC_GdI78ylH-etgSA8UQUBAMWsoPHBsQ";

const endpoints = {
    LOGIN:
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    REGISTER: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
    ITEMS: "items", // сменям името na rout според задачата   също -> /от 80  надолу  /
    ITEMS_BY_ID: "items/", // сменям името na rout според задачата   също -> /от 89  надолу  /
};
function host(url) {
    let result = databaseUrl + url + ".json";
    const auth = getUserData();
    if (auth !== null) {
        result += `?auth=${auth.idToken}`;
    }
    return result;
}
const request = async (url, method, body) => {
    const options = {
        method,
    };

    if (body) {
        Object.assign(options, {
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    const response = await fetch(url, options);

    const data = await response.json();
    if (data && data.hasOwnProperty("error")) {
        const message = data.error.message;
        throw new Error(message);
    }
    return data;
};

// ----- ползвам ---> email, password,   <--- за handlebars темплейтите
export async function registerUser(email, password) {
    const response = await post(endpoints.REGISTER + apiKey, {
        email,
        password,
        returnSecureToken: true,
    });
    localStorage.setItem("email", email);

    setUserData(response);

    return response;
}
// ----- ползвам ---> email и password  <--- за handlebars темплейтите
export async function loginUser(email, password) {
    const response = await post(endpoints.LOGIN + apiKey, {
        email,
        password,
        returnSecureToken: true,
    });
    localStorage.setItem("email", email);

    setUserData(response);

    return response;
}

async function get(url) {
    return request(url, "GET");
}
async function post(url, body) {
    return request(url, "POST", body);
}
async function del(url) {
    return request(url, "DELETE");
}
async function patch(url, body) {
    return request(url, "PATCH", body);
}

// -- до тук се преизползва кода ----Ако ползвам --> item <-- може да не се пипа и надолу----

export async function getItems() {
    return await get(databaseUrl + endpoints.ITEMS);
}
export async function getAll() {
    const records = await get(host(endpoints.ITEMS));
    return objectToArray(records);
}
export async function getById(id) {
    const record = await get(host(endpoints.ITEMS_BY_ID + id));
    record._id = id;
    return record;
}
export async function createItem(item) {
    const data = Object.assign({ _ownerId: getUserId() }, item);
    return post(host(endpoints.ITEMS), data);
}
export async function editItem(id, item) {
    return patch(host(endpoints.ITEMS_BY_ID + id), item);
}
export async function deleteById(id) {
    return del(host(endpoints.ITEMS_BY_ID + id));
}
