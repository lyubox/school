function e (type, content, attributes) {
  const result = document.createElement(type);

  if (attributes) {
    for (const attr of Object.keys(attributes)) {
      result[attr] = attributes[attr];
    }
  }

  result.append = append.bind(result);

  result.appendTo = (parent) => {
    parent.append(result);
    return result;
  };

  if (content !== undefined && content !== null) {
    result.append(content);
  }

  return result;
}

function append (child) {
  if (typeof (child) === 'string' || typeof (child) === 'number') {
    if (child.toString().trim()[0] === '<') {
      this.innerHtml = child;
    } else {
      child = document.createTextNode(child);
      this.appendChild(child);
    }
  } else if (Array.isArray(child)) {
    for (const node of child) {
      this.append(node);
    }
  } else {
    this.appendChild(child);
  }

  return this;
}
