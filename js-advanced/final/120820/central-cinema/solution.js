function solve () {
  const createDOMElement = (type, text, attributes, events, ...children) => {
    const domElement = document.createElement(type);

    if (text !== '') {
      domElement.textContent = text;
    }

    attributes && Object.entries(attributes)
      .forEach(([attrKey, attrValue]) => {
        domElement.setAttribute(attrKey, attrValue);
      });

    events && Object.entries(events)
      .forEach(([eventName, eventHandler]) => {
        domElement.addEventListener(eventName, eventHandler);
      });

    domElement.append(...children);
    return domElement;
  };
  const state = {
    movies: [],
    archive: []
  };

  const form = document.getElementById('container');
  const [name, hall, price, onScreenBtn] = Array.from(form.children);
  const movieList = document.querySelector('#movies ul');
  const archiveList = document.querySelector('#archive ul');
  const clearBtn = document.querySelector('#archive button');

  movieList.innerHTML = '';
  archiveList.innerHTML = '';

  clearBtn.addEventListener('click', e => {
    state.archive = [];
    render(state);
  });

  // returns boolean
  const validateMovie = (name, hall, price) => {
    return name.length !== 0 &&
      hall.length !== 0 &&
      !isNaN(price) &&
      price > 0;
  };
  // returns boolean
  const validateArchive = sold => {
    return sold !== '' &&
      !isNaN(sold) &&
      sold >= 0;
  };
  const onScreenClick = e => {
    e.preventDefault();

    if (!validateMovie(name.value, hall.value, price.value)) return;

    state.movies.push({
      name: name.value,
      hall: hall.value,
      price: Number(price.value)
    });

    render(state);
  };

  const onArchiveClick = (index, sold) => e => {
    e.preventDefault();

    if (!validateArchive(sold.value)) return;

    const [movieToRemove] = state.movies.splice(index, 1);

    state.archive.push({
      name: movieToRemove.name,
      total: movieToRemove.price * Number(sold.value)
    });

    render(state);
  };
  const onDeleteClick = index => e => {
    e.preventDefault();

    state.archive.splice(index, 1);

    render(state);
  };

  onScreenBtn.addEventListener('click', onScreenClick);

  // returns list of li elements
  const renderMovies = movies => {
    if (movies.length === 0) return [];

    return movies.map((m, index) => {
      const title = createDOMElement('span', m.name);
      const hall = createDOMElement('strong', `Hall: ${m.hall}`);
      const price = createDOMElement('strong', m.price.toFixed(2));
      const sold = createDOMElement('input', '', { placeholder: 'Tickets Sold' });
      const archiveBtn = createDOMElement('button', 'Archive', {}, { click: onArchiveClick(index, sold) });
      //   archiveBtn.addEventListener('click', onArchiveClick(index, sold))

      const div = createDOMElement('div', '', {}, {}, price, sold, archiveBtn);

      const li = createDOMElement('li', '', {}, {}, title, hall, div);

      return li;
    });
  };
  const renderArchives = archive => {
    if (archive.length === 0) return [];

    return archive.map((a, index) => {
      const title = createDOMElement('span', a.name);
      const total = createDOMElement('strong', `Total amount ${a.total.toFixed(2)}`);
      const deleteBtn = createDOMElement('button', 'Delete', {}, { click: onDeleteClick(index) });
      //   deleteBtn.addEventListener('click', onDeleteClick(index))

      const li = createDOMElement('li', '', {}, {}, title, total, deleteBtn);
      return li;
    });
  };

  const render = state => {
    name.value = '';
    hall.value = '';
    price.value = '';

    const movies = renderMovies(state.movies);
    const archives = renderArchives(state.archive);

    movieList.innerHTML = '';
    movies.forEach(li => movieList.append(li));

    archiveList.innerHTML = '';
    archives.forEach(li => archiveList.append(li));
  };
}
