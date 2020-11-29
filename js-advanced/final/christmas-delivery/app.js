function solution () {
  function el (type, content, attributes) {
    const result = document.createElement(type);

    if (attributes !== undefined) {
      Object.assign(result, attributes);
    }

    if (Array.isArray(content)) {
      content.forEach(append);
    } else {
      append(content);
    }

    function append (node) {
      if (typeof node === 'string' || typeof node === 'number') {
        node = document.createTextNode(node);
      }

      result.appendChild(node);
    }
    return result;
  }

  const state = {
    gifts: [],
    send: [],
    discarded: []
  };
  const giftName = document.querySelector('.card input');
  const addGiftBtn = document.querySelector('.card button');
  const containers = document.querySelectorAll('.card');
  const [, sectionListOfGifts, sectionSendGifts, sectionDiscardedGifts] = containers;
  const [, listOfGifts] = sectionListOfGifts.children;
  const [, sendGifts] = sectionSendGifts.children;
  const [, discardedGifts] = sectionDiscardedGifts.children;

  const cleanUp = () => {
    listOfGifts.textContent = '';
    sendGifts.textContent = '';
    discardedGifts.textContent = '';
  };

  cleanUp();

  const btnOnClick = (listName, index) => e => {
    const [gift] = state.gifts.splice(index, 1);

    state[listName].push(gift);

    render(state);
  };

  const renderGifts = gifts => {
    if (gifts.length === 0) return [];

    return gifts.map((g, index) => {
      const sendBtn = el(
        'button',
        'Send',
        { id: 'sendButton' }
      );
      sendBtn.addEventListener('click', btnOnClick('send', index));

      const discardedBtn = el(
        'button',
        'Discard',
        { id: 'discardButton' }
      );
      discardedBtn.addEventListener('click', btnOnClick('discarded', index));

      const li = el(
        'li',
        g,
        { className: 'gift' }
      );
      li.append(sendBtn, discardedBtn);

      return li;
    });
  };
  const renderLi = x => el('li', x, { className: 'gift' });

  const renderList = send => {
    if (send.length === 0) return [];
    return send.map(renderLi);
  };
  const render = state => {
    cleanUp();

    const gifts = renderGifts(state.gifts);
    listOfGifts.append(...gifts);

    const send = renderList(state.send);
    sendGifts.append(...send);

    const discarded = renderList(state.discarded);
    discardedGifts.append(...discarded);
  };
  const addGiftBtnClick = e => {
    e.preventDefault();

    const name = giftName.value;

    if (name === '') return;

    state.gifts.push(name);
    state.gifts.sort((a, b) => a.localeCompare(b));

    render(state);
  };
  addGiftBtn.addEventListener('click', addGiftBtnClick);
}
