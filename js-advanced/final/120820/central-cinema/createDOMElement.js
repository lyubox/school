function createDOMElement (type, text, attributes, events, ...children) {
  const domElement = document.createElement(type);

  if (text !== '') {
    domElement.textContent = text;
  }

  Object.entries(attributes)
    .forEach(([attrKey, attrValue]) => {
      domElement.setAttribute(attrKey, attrValue);
    });

  Object.entries(events)
    .forEach(([eventName, eventHandler]) => {
      domElement.addEventListener(eventName, eventHandler);
    });

  domElement.append(...children);
  return domElement;
}
