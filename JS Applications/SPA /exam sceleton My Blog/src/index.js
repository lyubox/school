/*-- Globals Sammy -- */
import {
    homePage,
    createPage,
    detailsPage,
    createPost,
    editPost,
    editPage,
    deleteItem,
} from "./controlers/catalog.js";
import {
    loginPage,
    registerPage,
    postLogin,
    postRegister,
    logoutUser,
} from "./controlers/user.js";

import { getUserData } from "./util.js";
// ------> #root <--- да е същия и в html файла!!
const app = Sammy("#root", function () {
    /*-- Template Engine Setup -- */
    this.use("Handlebars", "hbs");
    const user = getUserData();
    // console.log({ user });
    this.userData = user;

    // Home Routes
    this.get("/", homePage);
    this.get("/home", homePage);
    this.get("/login", loginPage);
    this.get("/register", registerPage);
    this.get("/logout", logoutUser);
    this.get("/create", createPost);
    this.get("/details/:id", detailsPage);
    this.get("/edit/:id", editPost);
    this.get("/delete/:id", deleteItem);

    this.post("/login", (ctx) => {
        postLogin(ctx);
    });
    this.post("/register", (ctx) => {
        postRegister(ctx);
    });
    this.post("/create", (ctx) => {
        createPage(ctx);
    });
    this.post("/edit/:id", (ctx) => {
        editPage(ctx);
    });
});

app.run();
