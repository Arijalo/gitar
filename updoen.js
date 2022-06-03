/*!
 * jQuery Chord Transposer plugin v1.0
 * http://codegavin.com/projects/transposer
 *
 * Copyright 2010, Jesse Gavin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://codegavin.com/license
 *
 * Date: Sat Jun 26 21:27:00 2010 -0600
 */
(function($) {

  $.fn.transpose = function(options) {
    var opts = $.extend({}, $.fn.transpose.defaults, options);
    
    var currentKey = null;
    
    var keys = [
      { name: 'Ab',  value: 0,   type: 'F' },
      { name: 'A',   value: 1,   type: 'N' },
      { name: 'A#',  value: 2,   type: 'S' },
      { name: 'Bb',  value: 2,   type: 'F' },
      { name: 'B',   value: 3,   type: 'N' },
      { name: 'C',   value: 4,   type: 'N' },
      { name: 'C#',  value: 5,   type: 'S' },
      { name: 'Db',  value: 5,   type: 'F' },
      { name: 'D',   value: 6,   type: 'N' },
      { name: 'D#',  value: 7,   type: 'S' },
      { name: 'Eb',  value: 7,   type: 'F' },
      { name: 'E',   value: 8,   type: 'N' },
      { name: 'F',   value: 9,   type: 'N' },
      { name: 'F#',  value: 10,  type: 'S' },
      { name: 'Gb',  value: 10,  type: 'F' },
      { name: 'G',   value: 11,  type: 'N' },
      { name: 'G#',  value: 0,   type: 'S' }
    ];
  
    var getKeyByName = function (name) {
        if (name.charAt(name.length-1) == "m") {
          name = name.substring(0, name.length-1);
        }
        for (var i = 0; i < keys.length; i++) {
            if (name == keys[i].name) {
                return keys[i];
            }
        }
    };

    var getChordRoot = function (input) {
        if (input.length > 1 && (input.charAt(1) == "b" || input.charAt(1) == "#"))
            return input.substr(0, 2);
        else
            return input.substr(0, 1);
    };

    var getNewKey = function (oldKey, delta, targetKey) {
        var keyValue = getKeyByName(oldKey).value + delta;

        if (keyValue > 11) {
            keyValue -= 12;
        } else if (keyValue < 0) {
            keyValue += 12;
        }
        
        var i=0;
        if (keyValue == 0 || keyValue == 2 || keyValue == 5 || keyValue == 7 || keyValue == 10) {
            // Return the Flat or Sharp Key
            switch(targetKey.name) {
              case "A":
              case "A#":
              case "B":
              case "C":
              case "C#":
              case "D":
              case "D#":
              case "E":
              case "F#":
              case "G":
              case "G#":
                  for (;i<keys.length;i++) {
                    if (keys[i].value == keyValue && keys[i].type == "S") {
                      return keys[i];
                    }
                  }
              default:
                  for (;i<keys.length;i++) {
                    if (keys[i].value == keyValue && keys[i].type == "F") {
                      return keys[i];
                    }
                  }
            }
        }
        else {
            // Return the Natural Key
            for (;i<keys.length;i++) {
              if (keys[i].value == keyValue) {
                return keys[i];
              }
            }
        }
    };

    var getChordType = function (key) {
        switch (key.charAt(key.length - 1)) {
            case "b":
                return "F";
            case "#":
                return "S";
            default:
              return "N";
        }
    };

    var getDelta = function (oldIndex, newIndex) {
        if (oldIndex > newIndex)
            return 0 - (oldIndex - newIndex);
        else if (oldIndex < newIndex)
            return 0 + (newIndex - oldIndex);
        else
            return 0;
    };

    var transposeSong = function (target, key) {
        var newKey = getKeyByName(key);

        if (currentKey.name == newKey.name) {
          return;
        }

        var delta = getDelta(currentKey.value, newKey.value);
        
        $("span.c", target).each(function (i, el) {
            transposeChord(el, delta, newKey);
        });
      