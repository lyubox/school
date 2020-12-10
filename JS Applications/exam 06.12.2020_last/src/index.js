/*
---------> sample  test from browser !!!  <---------  */
// import * as api from "./data.js"
// window.api = api

/* -- Globals Sammy -- */
import { homePage, createPage, detailsPage, postCreate, editPage, deleteArticle, postEdit, destinationsPage } from './controlers/catalog.js';
import { loginPage, registerPage, postLogin, postRegister, logoutUser } from './controlers/user.js';
import { deleteById } from './data.js';

import { getUserData } from './util.js';
// ------> #root <--- да е същия и в html файла!!
const app = Sammy('#root', function (context) {
  /* -- Template Engine Setup -- */
  this.use('Handlebars', 'hbs');
  const user = getUserData();
  this.userData = user;

  // Home Routes
  this.get('/clear/:path', function () {
    console.log(this.params.path);
    this.app.err = '';
    this.redirect(this.params.path.replaceAll('_', '/'));
  });
  this.get('/', homePage);
  this.get('/home', homePage);
  this.get('/destinations', destinationsPage);

  this.get('/details/:id', detailsPage);
  this.get('/create', createPage);
  this.get('/edit/:id', editPage);

  this.get('/delete/:id', deleteArticle);
  this.get('/logout', logoutUser);

  this.get('/login', loginPage);
  this.get('/register', registerPage);

  this.post('/create', (ctx) => {
    postCreate(ctx);
  });

  this.post('/edit/:id', (ctx) => {
    postEdit(ctx);
  });

  this.post('/login', (ctx) => {
    postLogin(ctx);
  });
  this.post('/register', (ctx) => {
    postRegister(ctx);
  });
});

app.run();
