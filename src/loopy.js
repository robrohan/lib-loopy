/* jshint laxbreak: true */

// Struct for a single item in the looped object
class Item {
  constructor (name, value, objz, root, depth) {
    this.name = name;
    this.value = value;
    this.obj = objz;
    this.root = root;
    this.depth = depth;
  }
};

/**
 * This methods renders the given object to the given renderTo
 * html element.  This is the method you are looking for.
 */
export const render = function (obj, renderTo) {
  if (obj === null) {
    throw new Error("Need an object to render");
  }

  var rtn = loo(obj);
  var root = rtn[1];

  renderTo = renderTo || document.getElementsByTagName("body")[0];
  renderTo.appendChild(root);
};

/**
 * This is the main state machine. This works well enough, but
 * I think it can be designed a bit better.
 */
const loo = function (obj, root, depth) {
  depth = depth || 0;
  root = root || objStart(null);

  if (root === undefined) {
    throw new Error("No DOM element");
  }

  for (var z in obj) {
    var item = new Item(z, obj[z], obj, root, depth);

    switch (typeof (obj[z])) {
      case "number":
        num(item);
        break;
      case "boolean":
        bool(item);
        break;
      case "string":
        if (isDate(item.value)) {
          date(item);
        } else if (isImage(item.value)) {
          image(item);
        } else if (isPassword(item.value)) {
          password(item);
        } else {
          str(item);
        }
        break;
      case "object":
        var wrap = null;

        if (obj[z] instanceof Array) {
          wrap = arrStart(item);
        } else {
          wrap = objStart(item);
        }

        var oldroot = item.root;
        item.root = wrap;

        // objects will go deeper, recurse call
        var rtn = loo(obj[z], wrap, ++depth);
        item.root = objEnd(item, oldroot);
        break;
    }
  }

  return [--depth, root];
};

// try to sort out if the string is a date
const isDate = function (str) {
  if (str.charCodeAt(0) < 48 || str.charCodeAt(0) > 57) {
    return false;
  }

  return (new Date(str) !== "Invalid Date" && !isNaN(new Date(str))) ? true : false;
};

// try to sort out if the string is an image URL
const isImage = function (str) {
  if (str.match(/^https?:/ig) && str.match(/\.(png|jpg|gif)$/ig)) {
    return true;
  }

  return false;
};

// try to sort out if the string is a password
const isPassword = function (str) {
  if (str.match(/^[*]{4,}/i)) {
    return true;
  }

  return false;
};

/////////////////////////////////////////////////////////////////////////////////

// creates the object wrapper 
const objStart = function (item) {
  var d = document.createElement("ul");
  var title = (item === null) ? "" : item.name;
  d.setAttribute("class", "object object-" + title);
  d.setAttribute("title", title);
  return d;
};

// creates the array wrapper
const arrStart = function (item) {
  var d = document.createElement("ul");
  var title = (item === null) ? "" : item.name;
  d.setAttribute("class", "array array-" + title);
  d.setAttribute("title", title);
  return d;
};

// ends objs and arrays
const objEnd = function (item, origroot) {
  origroot.appendChild(item.root);
  return origroot;
};

/////////////////////////////////////////////////////////////////////////////////

const createWrapper = function (labelText) {
  var wrapper = document.createElement("li");

  var label = document.createElement("label");
  label.appendChild(document.createTextNode(labelText));

  wrapper.appendChild(label);
  return wrapper;
};

// method to handle string values
const str = function (item) {
  (function (i) {
    var wrapper = createWrapper(i.name);

    var newctrl = document.createElement("textarea");
    newctrl.setAttribute("rows", 1);
    newctrl.setAttribute("cols", 30);
    newctrl.onkeypress = function () {
      i.obj[i.name] = this.value;
    };
    newctrl.onchange = function () {
      i.obj[i.name] = this.value;
    };
    newctrl.appendChild(document.createTextNode(i.value));

    wrapper.appendChild(newctrl);
    i.root.appendChild(wrapper);
  }(item));
};

// method to handle numeric values
const num = function (item) {
  (function (i) {
    var wrapper = createWrapper(i.name);

    var newctrl = document.createElement("input");
    newctrl.setAttribute("value", i.value);
    newctrl.setAttribute("type", "number");
    newctrl.onkeypress = function () {
      i.obj[i.name] = parseFloat(this.value);
    };
    newctrl.onchange = function () {
      i.obj[i.name] = parseFloat(this.value);
    };

    wrapper.appendChild(newctrl);
    i.root.appendChild(wrapper);
  }(item));
};

// method to handle numeric values
const password = function (item) {
  (function (i) {
    var wrapper = createWrapper(i.name);

    var newctrl = document.createElement("input");
    newctrl.setAttribute("value", i.value);
    newctrl.setAttribute("type", "password");
    newctrl.onkeypress = function () {
      i.obj[i.name] = this.value;
    };
    newctrl.onchange = function () {
      i.obj[i.name] = this.value;
    };

    wrapper.appendChild(newctrl);
    i.root.appendChild(wrapper);
  }(item));
};

// method to handle boolean values
const bool = function (item) {
  (function (i) {
    var wrapper = createWrapper(i.name);

    var newctrl = document.createElement("input");
    if (i.value) {
      newctrl.setAttribute("checked", i.value);
    }
    newctrl.setAttribute("type", "checkbox");
    newctrl.onchange = function () {
      i.obj[i.name] = this.checked;
    };

    wrapper.appendChild(newctrl);
    i.root.appendChild(wrapper);
  }(item));
};

// method to handle date values
const date = function (item) {
  (function (i) {
    var wrapper = createWrapper(i.name);

    var newctrl = document.createElement("input");
    newctrl.setAttribute("value", i.value);
    newctrl.setAttribute("type", "datetime-local");
    newctrl.onchange = function () {
      i.obj[i.name] = this.value;
    };

    wrapper.appendChild(newctrl);
    i.root.appendChild(wrapper);
  }(item));
};

// method to handle image values
const image = function (item) {
  (function (i) {
    var wrapper = createWrapper(i.name);

    var newctrl = document.createElement("img");
    newctrl.setAttribute("src", i.value);
    newctrl.setAttribute("class", "imagedrop");

    newctrl.onchange = function () {
      i.obj[i.name] = this.src;
    };

    wrapper.appendChild(newctrl);
    i.root.appendChild(wrapper);
  }(item));
};

export default render;
