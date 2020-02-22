/* jshint laxbreak: true */
'use strict';

describe("Loopy", function () {

  var testObj = null;

  beforeEach(function () {
    testObj = {
      "testing": "1234",
      "test": 123,
      "bool": true,
      "another": {
        "one": "1",
        "two": "2"
      },
      "array": [1, 2, 3, 4],
      "obj": {
        "obj": {
          "obj": {
            "hi": "there!"
          }
        }
      },
      "herp": "2007-03-03 12:00:20"
    };
  });

  it("should call str callback when given an object string", function () {
    var testobject = { "test": "test" };
    var loopy = new Loopy.Loopy();

    loopy.str = function (i) {
      expect(i.name).toBe("test");
      expect(i.value).toBe("test");
      expect(i.obj).toBe(testobject);
    };

    var result = loopy.loo(testobject);
  });

  it("should create a string based control when given an object with a string", function () {
    var loopy = new Loopy.Loopy();
    var testobject = {
      "test": "test",
      "obj": {
        "things": "stuff"
      }
    };

    var result = loopy.loo(testobject);

    expect(result[1].getElementsByTagName('textarea')[1].value)
      .toBe(testobject.obj.things);
  });

  it("should create a number control when given an object with a number", function () {
    var loopy = new Loopy.Loopy();
    var testobject = { "test": 1234 };

    var result = loopy.loo(testobject);

    expect(result[1].getElementsByTagName('input')[0].type).toBe("number");
    expect(parseFloat(result[1].getElementsByTagName('input')[0].value)).toBe(testobject.test);
  });

  it("should create a bool control when given an object with a bool", function () {
    var loopy = new Loopy.Loopy();
    var testobject = { "test": true };

    var result = loopy.loo(testobject);

    expect(result[1].getElementsByTagName('input')[0].type).toBe("checkbox");
    expect(result[1].getElementsByTagName('input')[0].checked).toBe(testobject.test);
  });

  it("should create a date control when given a date object", function () {
    var loopy = new Loopy.Loopy();
    var testobject = { "test": "2015-05-10T08:00:00" };

    var result = loopy.loo(testobject);
    expect(result[1].getElementsByTagName('input')[0].type).toBe("datetime-local");
  });

  it("isDate should return true when given a date", function () {
    var strdate = "2015-01-01";
    expect(Loopy.isDate(strdate)).toBe(true);
  });

  /* This works in the browser, but not phantom :-/
  it("isDate should return true when given a valid date time", function() {
var strdate = "2015-01-01 08:00:00";
expect(Loopy.isDate(strdate)).toBe(true);
  }); */

  it("isDate should return true when given a valid date time with a T", function () {
    var strdate = "2015-01-01T08:00:00";
    expect(Loopy.isDate(strdate)).toBe(true);
  });

  it("isDate should return false when given an invalid date time with", function () {
    var strdate = "Game 1";
    expect(Loopy.isDate(strdate)).toBe(false);
  });

  it("isImage should return true when given a valid image URL", function () {
    var strimage = "http://herp.com/blarg.jpg";
    expect(Loopy.isImage(strimage)).toBe(true);
  });

  it("isImage should return true when given a valid image URL with uppercase extension", function () {
    var strimage = "HTTP://herp.com/blarg.JPG";
    expect(Loopy.isImage(strimage)).toBe(true);
  });

  it("isImage should return true when given a valid https image URL", function () {
    var strimage = "https://things.com/image.gif";
    expect(Loopy.isImage(strimage)).toBe(true);
  });

  it("isImage should return false when given a relative image URL", function () {
    var strimage = "/blarg.gif";
    expect(Loopy.isImage(strimage)).toBe(false);
  });

  it("isImage should return false when given a string with url like elements", function () {
    var strimage = "http is a protocol to load a png";
    expect(Loopy.isImage(strimage)).toBe(false);
  });

  it("isPassword should return true when given four *", function () {
    var strfield = "****";
    expect(Loopy.isPassword(strfield)).toBe(true);
  });

  it("isPassword should return true when given more than four *", function () {
    var strfield = "***********";
    expect(Loopy.isPassword(strfield)).toBe(true);
  });

  it("isPassword should return false when given less than four *", function () {
    var strfield = "***";
    expect(Loopy.isPassword(strfield)).toBe(false);
  });

  it("isPassword should return false when given less than four * in a string", function () {
    var strfield = "**markdown bold**";
    expect(Loopy.isPassword(strfield)).toBe(false);
  });
});
