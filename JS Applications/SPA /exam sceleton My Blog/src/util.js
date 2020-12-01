export function setUserData(user) {
    localStorage.setItem("auth", JSON.stringify(user));
}
export function getUserData() {
    const auth = localStorage.getItem("auth");
    if (auth !== null) {
        return JSON.parse(auth);
    } else {
        return null;
    }
}
export function getUserId() {
    const auth = localStorage.getItem("auth");
    if (auth !== null) {
        return JSON.parse(auth).localId;
    } else {
        return null;
    }
}
export function objectToArray(data) {
    if (data === null) {
        return [];
    } else {
        return Object.entries(data).map(([k, v]) =>
            Object.assign({ id: k }, v)
        );
    }
}
// export async function extendContext(context) {
//     const partials = await Promise.all([
//         context.load("./templates/common/header.hbs"),
//     ]);
//     context.partials = {
//         header: partials[0],
//     };
// }
export async function errorHandler(error) {
    console.log(error);
}
export async function clearUserData(data) {
    localStorage.removeItem("user");
}
export async function addPartials(ctx) {
    const partials = await Promise.all([
        ctx.load("/templates/common/header.hbs"),
    ]);
    ctx.partials = {
        header: partials[0],
    };
}

export function mapItems(data) {
    const result = [];
    for (let item of data) {
        result.push(item);
    }
    return result;
}
