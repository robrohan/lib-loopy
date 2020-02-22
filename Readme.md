# Loopy

Loopy is a library to visually edit JSON objects. It guesses at the data type of the JSON property, and shows a property viewer / editor.  See src/main.js for an example.

I wrote it about 6 years ago (~2014), and never wound up using it. I am putting it up here for posterity. For example the following form:

![Loopy screenshot](loopyexample.jpg)

was rendered by giving it the following object:

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

## Getting Started

I've updated the code to use parcel so getting it working should be pretty straightforward.

## License

MIT
