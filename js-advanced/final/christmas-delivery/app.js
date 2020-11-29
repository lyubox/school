function solution () {
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

    domElement.appendChild(...children);
    return domElement;
  };

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
      const sendBtn = createDOMElement(
        'button',
        'Send',
        { id: 'sendButton' },
        { click: btnOnClick('send', index) });
      const discardedBtn = createDOMElement(
        'button',
        'Discard',
        { id: 'discardButton' },
        { click: btnOnClick('discarded', index) });

      const li = createDOMElement(
        'li',
        '',
        { class: 'gift' },
        {},
        g, sendBtn, discardedBtn);

      return li;
    });
  };
  const renderLi = x => createDOMElement('li', x, { class: 'gift' });

  const renderList = send => {
    if (send.length === 0) return [];
    return send.map(renderLi);
  };
  const render = state => {
    cleanUp();

    const gifts = renderGifts(state.gifts);
    gifts.forEach(g => listOfGifts.appendChild(g));

    const send = renderList(state.send);
    send.forEach(s => sendGifts.appendChild(s));

    const discarded = renderList(state.discarded);
    discarded.forEach(d => discardedGifts.appendChild(d));
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
