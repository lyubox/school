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
            Object.assign({ _id: k }, v)
        );
    }
}

export async function errorHandler(error) {
    console.log(error);
}

export async function clearUserData(data) {
    localStorage.removeItem("user");
}

export async function addPartials(ctx) {
    const [header, footer] = await Promise.all([
        ctx.load("/templates/common/header.hbs"),
        ctx.load("/templates/common/footer.hbs"),
    ]);
    ctx.partials = {
        header,
        footer,
    };
}

// _______polzvam samo ako trqbva__dagi vkaram pod ime v kontexta __ v slu4aq _____< article >_____________________________________

export const categoryMap = {
    posts: [],
};
export function mapCategories(data) {
    const result = {
        article: [],
    };
    for (let article of data) {
        result.article.push(article);
    }
    return result;
}
