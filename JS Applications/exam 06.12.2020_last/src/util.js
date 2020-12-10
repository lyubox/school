export function setUserData (user) {
  localStorage.setItem('auth', JSON.stringify(user));
}

export function getUserData () {
  const auth = localStorage.getItem('auth');
  if (auth !== null) {
    return JSON.parse(auth);
  } else {
    return null;
  }
}

export function getUserId () {
  const auth = localStorage.getItem('auth');
  if (auth !== null) {
    return JSON.parse(auth).localId;
  } else {
    return null;
  }
}

export function objectToArray (data) {
  if (data === null) {
    return [];
  } else {
    return Object.entries(data).map(([k, v]) =>
      Object.assign({ _id: k }, v)
    );
  }
}

export async function errorHandler (error) {
  console.log(error);
}

export async function clearUserData (data) {
  localStorage.removeItem('user');
}

export async function addPartials (ctx) {
  const [header, footer, notification] = await Promise.all([
    ctx.load('/templates/common/header.hbs'),
    ctx.load('/templates/common/footer.hbs'),
    ctx.load('/templates/common/notification.hbs')
  ]);
  ctx.partials = {
    header,
    footer,
    notification
  };
}

// _______polzvam samo ako trqbva__dagi vkaram pod ime v kontexta __ v slu4aq _____< article >_____________________________________

export const categoryMap = {
  posts: []
};
export function mapCategories (data) {
  // return { article: data }
  console.log({ data });
  const result = {
    article: []
  };
  for (const article of data) {
    result.article.push(article);
  }
  return result;
}

export function showInfo (ctx, message) {
  ctx.app.info = message;

  setTimeout(() => {
    const info = document.getElementById('infoBox');
    info.style.display = 'none';
    ctx.app.info = '';
  }, 3000);
}
export const getNotifications = context => ({
  err: context.app.err,
  loading: context.app.loading,
  info: context.app.info
});
