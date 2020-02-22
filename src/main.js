const loopy = require("./loopy");

const testObj = {
  "testing": "1234",
  "test": 123,
  "bool": true,
  "another": {
    "one": "1",
    "two": "2",
    "three": 3
  },
  "array_of_ints": [1, 2, 3, 4],
  "obj": {
    "name": "blarg",
    "obj": {
      "other_name": "sub blarg",
      "obj": {
        "hi": "there!"
      }
    }
  },
  "img": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  "createdAt": "2007-03-03 12:00:20"
};


window.addEventListener('load', () => {
  loopy.render(testObj, document.querySelector("#loopyplace"))
});

