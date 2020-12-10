import { addPartials, showInfo, getNotifications } from '../util.js';
import { register, login } from '../data.js';

export async function registerPage () {
  await addPartials(this);
  this.partial('./templates/catalog/registerPage.hbs');
}
export async function loginPage () {
  await addPartials(this);

  const context = {
    ...getNotifications(this),
    path: '_login'
  };
  this.partial('./templates/catalog/loginPage.hbs', context);
}
export const logoutUser = (ctx) => {
  localStorage.removeItem('email');
  localStorage.removeItem('auth');
  ctx.app.userData = '';
  showInfo(ctx, 'Successfully logged out!');
  ctx.redirect('/home');
};
// ------------- email, password, rePass must match handlebars template registerPage.hbs (name = "email".... )
export async function postRegister (ctx) {
  const { email, password, rePass } = ctx.params;
  console.log({ rePass, ctx });

  try {
    if (email.length == 0 || password == 0) {
      throw new Error('All field are required!');
    } else if (password !== rePass) {
      throw new Error("Passwords don't match!");
    } else {
      const result = await register(email, password);
      ctx.app.userData = result;
      ctx.redirect('/home');
    }
  } catch (err) {
    console.log(err);
  }
}
// ------------- email, password,  must match handlebars template loginPage (name = "email".... )
export async function postLogin (ctx) {
  console.log({ ctx });
  const { email, password } = ctx.params;
  try {
    if (email.length === 0 || password.length === 0) {
      console.log('Error');
      ctx.app.err = 'All field are required!';
      ctx.redirect('/login');
    } else {
      const result = await login(email, password);
      ctx.app.userData = result;

      showInfo(ctx, 'Login successful.');
      ctx.redirect('/home');
    }
  } catch (err) {
    console.log(err);
  }
}
// function sucessNotification() {
//     setTimeout(function () {

//     }, 3000);
// }
// function errorNotification() {
//     const errBox = document.getElementById("errorBox");
//     errBox.style.display = "block";
//     setTimeout(function () {
//         errBox.style.display = "none";
//     }, 3000);
// }
