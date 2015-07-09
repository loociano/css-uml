/**
 * CSS-UML
 * 
 * Luciano Rubio <luciano@loociano.com> July 2015
 * 
 */
(function() {

  "use strict";

  var screen = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  var properties = {
    _title: "title",
    _extends: "extends",
    _type: "type"
  };

  var classes = {
    _class: "class",
    _abstract: "abstract"
  };

  function Rectangle(domElt) {
    this.domElt = domElt;
    this.name = domElt.dataset.name;
    this.refs = {
      _extends: null
        // Stores reference to parent Rectangle
    };
    this.level = 0;
  }

  Rectangle.prototype.hasParent = function() {
    return this.refs._extends !== null;
  };

  var classArray = document.getElementsByClassName(classes._class);
  var rectangles = [];

  // Retrieve all Rectangles
  for (var i = 0; i < classArray.length; i++) {
    rectangles.push(new Rectangle(classArray[i]));
  }

  function findRectangle(name) {
    for (var index in rectangles) {
      if (rectangles[index].name === name) {
        return r;
      }
    }
  }

  // Compute graph
  for (var index in rectangles) {
    var r = rectangles[index];
    // Find parents
    if (r.domElt.dataset.hasOwnProperty(properties._extends)) {
      var parent = findRectangle(r.domElt.dataset.extends);
      if (parent !== undefined) {
        r.refs._extends = parent;
      }
    }
  }

  function calculateNbLevels() {
    var levels = 0;
    var max = 0;

    for (var index in rectangles) {
      var r = rectangles[index];
      var self = r; // save reference
      while (true) {
        var parent = r.refs._extends;
        if (parent !== null) {
          r = parent;
          levels++;
        } else {
          if (levels > max) {
            max = levels;
            levels = 0;
          }
          r = self;
          break;
        }
      }
    }
    return max;
  }

})();