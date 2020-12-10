import { addPartials, mapCategories, getUserId, categoryMap, showInfo, getNotifications } from '../util.js';
import {
  getAll,
  createArticle,
  getById,
  editArticle,
  deleteById
} from '../data.js';
export async function homePage () {
  await addPartials(this);
  this.partials.article = await this.load('/templates/catalog/article.hbs');
  this.partials.createPage = await this.load('/templates/catalog/createPage.hbs');
  this.partials.editPage = await this.load('/templates/catalog/detailsPage.hbs');

  const _posts = await getAll(this);

  const context = {
    article: _posts,
    path: '_home',
    user: this.app.userData,
    ...getNotifications(this)
  };

  console.log({ context });
  this.partial('./templates/catalog/homePage.hbs', context);
}
export async function destinationsPage () {
  await addPartials(this);
  this.partials.dashArticle = await this.load(
    '/templates/catalog/dashArticle.hbs'
  );
  // ---> chek if it is the owner of the post <---
  const userId = getUserId();
  const _posts = await getAll(this);
  const context = {
    ...getNotifications(this),
    article: _posts.filter(p => p._ownerId === userId),
    user: this.app.userData
  };
  this.partial('./templates/catalog/dashPage.hbs', context);
}
export async function createPage () {
  await addPartials(this);
  this.partial('./templates/catalog/createPage.hbs');
}
export async function postCreate (ctx) {
  const { destination, city, duration, departureDate, imgUrl } = ctx.params;

  try {
    if (
      destination.length == 0 ||
            city.length == 0 ||
            duration.length === 0 ||
            departureDate.length === 0 ||
            imgUrl.length === 0
    ) {
      throw new Error('All field are required!');
    } else {
      const result = await createArticle({
        destination,
        city,
        duration,
        departureDate,
        imgUrl
      });

      ctx.redirect('/home');
    }
  } catch (err) {
    console.log(err);
  }
}
export async function detailsPage () {
  await addPartials(this);

  const article = await getById(this.params.id);

  const context = {
    user: this.app.userData,
    article,
    canEdit: article._ownerId === getUserId()
  };
    // console.log({ context });
  this.partial('/templates/catalog/detailsPage.hbs', context);
}
export async function editPage () {
  await addPartials(this);

  const article = await getById(this.params.id);

  const context = {
    ...getNotifications(this),
    user: this.app.userData,
    article,
    canEdit: article._ownerId == getUserId()
  };
    // console.log({ context });
  this.partial('/templates/catalog/editPage.hbs', context);
}
export async function postEdit (ctx) {
  console.log({ ctx });
  const { destination, city, duration, departureDate, imgUrl } = ctx.params;
  try {
    if (
      destination.length == 0 ||
            city.length == 0 ||
            duration.length === 0 ||
            departureDate.length === 0 ||
            imgUrl.length === 0
    ) {
      throw new Error('All field are required!');
    } else {
      console.log(ctx.params.id);
      ctx.app.loading = 'Loading...';
      const result = await editArticle(ctx.params.id, {
        destination,
        city,
        duration,
        departureDate,
        imgUrl
      });
      // ctx.app.loading = '';
      showInfo(ctx, 'Edit was successful');

      ctx.redirect('/home');
    }
  } catch (err) {
    alert(err.message);
  }
}
export async function deleteArticle () {
  try {
    const id = this.params.id;
    const result = await deleteById(id);
    this.redirect('/home');
  } catch (err) {
    throw new Error(err);
  }
}
