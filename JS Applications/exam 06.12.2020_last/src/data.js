import { getUserData, getUserId, setUserData, objectToArray } from "./util.js";

const databaseUrl = "https://examdb-dce85.firebaseio.com/";
const apiKey = "AIzaSyBAC_GdI78ylH-etgSA8UQUBAMWsoPHBsQ";

const endpoints = {
    LOGIN:
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    REGISTER: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
    ARTICLES: "articles", // сменям името na rout според задачата   също -> /от 80  надолу  /
    ARTICLES_BY_ID: "articles/", // сменям името na rout според задачата   също -> /от 89  надолу  /
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
export async function register(email, password) {
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
export async function login(email, password) {
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

// -- до тук се преизползва кода ----Ако ползвам --> article <-- може да не се пипа и надолу----

export async function getItems() {
    return await get(databaseUrl + endpoints.ARTICLES);
}
export async function getAll() {
    const records = await get(host(endpoints.ARTICLES));
    //  sort -> records.sort((a,b) => a.localeCompare()b)....
    return objectToArray(records);
}
export async function getById(id) {
    const article = await get(host(endpoints.ARTICLES_BY_ID + id));
    article._id = id;
    return article;
}
export async function createArticle(article) {
    const data = Object.assign({ _ownerId: getUserId() }, article);
    return post(host(endpoints.ARTICLES), data);
}
export async function editArticle(id, article) {
    return patch(host(endpoints.ARTICLES_BY_ID + id), article);
}
export async function deleteById(id) {
    return del(host(endpoints.ARTICLES_BY_ID + id));
}
