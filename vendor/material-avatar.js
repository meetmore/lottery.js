; (function (win, doc) {

  /**
   * Main function to create material avatars
   * @param element - The element(s) to apply the material avatar look to
   */
  function MaterialAvatar(elements, options) {

    if (!elements) {
      throw (new Error('No elements selected/found'));
    }

    var _this = this;

    this.options = {
      colorPalette: [
        '#1abc9c', '#2ecc71', '#3498db',
        '#9b59b6', '#34495e', '#16a085',
        '#27ae60', '#2980b9', '#8e44ad',
        '#2c3e50', '#f1c40f', '#e67e22',
        '#e74c3c', '#95a5a6', '#f39c12',
        '#d35400', '#c0392b', '#bdc3c7',
        '#7f8c8d'
      ],
      fontFamily: 'Arial'
    };

    this.name = 'MaterialAvatar';

    extend(_this.options, options);
    this.elements = elements;

    if (this.elements[0]) {

      //Turn our HTMLCollection into an array so we can iterate through it.
      this.elements = [].slice.call(this.elements);

      this.elements.forEach(function (element) {
        element.avatar = new Avatar(element, _this.options);
      });
    } else {
      this.elements.avatar = new Avatar(elements, _this.options);
    }
  }

  MaterialAvatar.prototype.updateOptions = function (options) {
    var _this = this;

    if (options) {
      this.options = options;
    }

    this.elements.forEach(function (element) {
      element.avatar.options = _this.options;
    });
  };

  function Avatar(element, options) {

    if (!element) {
      throw (new Error('No element selected/found'));
    }

    var _this = this;
    this.element = element;
    this.options = options;
    this.canvas = doc.createElement('canvas');

    //Push our reflows to a new animation frame.
    requestAnimationFrame(function () {
      return _this.init();
    });
  }

  Avatar.prototype.init = function () {
    this.width = parseInt(this.element.offsetWidth, 10);
    this.height = parseInt(this.element.offsetHeight, 10);

    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.width);

    this.initials = this.getInitials();
    this.fontSize = this.getFontSize();

    this.render();
  };

  Avatar.prototype.render = function () {
    this.backgroundColor = this.generateColor(this.initials.charCodeAt(0) - 65);
    this.context = this.canvas.getContext('2d');

    //Create our font styles
    this.context.font = this.fontSize + 'px/0px ' + this.options.fontFamily;
    this.context.textAlign = 'center';

    //Decide what type of shape we should draw for the background
    if (this.options) {
      if (this.options.shape === 'circle') {
        this._drawCircle();
      } else {
        this._drawSquare();
      }
    } else {
      this._drawSquare();
    }

    //Create the color and add our initials
    this.context.fillStyle = this.getTextColor();
    this.context.fillText(
      this.initials,
      this.width / 2,
      (this.height / 2) + ((this.fontSize * 0.68) / 2)
    );

    //Remove the inner text and swap in the canvas elemnt
    this.element.innerHTML = '';

    if (this.element.appendChild) {
      this.element.appendChild(this.canvas);
    }
  };

  //Creates circle background area
  Avatar.prototype._drawCircle = function () {
    var centerX = this.width / 2;
    var centerY = this.height / 2;
    var radius = this.width / 2;

    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.backgroundColor;
    this.context.fill();
  };

  //Creates square background area
  Avatar.prototype._drawSquare = function () {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.width, this.height);
  };

  Avatar.prototype.getInitials = function () {

    if (this.options.initials) {
      return this.options.initials;
    }

    this.name = this.options.name || (this.element.getAttribute && this.element.getAttribute('data-name')) || (this.element.innerHTML && this.element.innerHTML.trim()) || " ";
    var _nameSplit = this.name.split(' ');
    var _initials;

    if (this.element.setAttribute) {
      this.element.setAttribute('data-name', this.name);
    }

    //Get initials from name
    if (_nameSplit.length > 1) {
      _initials = _nameSplit[0].charAt(0).toUpperCase() + _nameSplit[1].charAt(0).toUpperCase();
    } else {
      _initials = _nameSplit[0].charAt(0).toUpperCase();
    }

    return _initials;
  };

  Avatar.prototype.getFontSize = function () {
    if (this.options.fontSize) {
      if (typeof this.options.fontSize === 'function') {
        return this.options.fontSize(this.height, this.initials.length);
      }

      return this.options.fontSize;
    }

    var _fontSize = this.height / ((this.initials.length * 0.5) + 1);

    return _fontSize;
  };

  Avatar.prototype.getTextColor = function () {

    //Override generated text color with a custom one
    if (this.options.textColor) {
      return this.options.textColor;
    }

    var _hexColor = this._hexToRgb(this.backgroundColor);

    //Optional fallback incase our function returns null
    if (!_hexColor) return '#222';

    var _colorValue = (_hexColor.r * 299) + (_hexColor.g * 587) + (_hexColor.b * 114);

    return (Math.round(_colorValue / 1000) > 125) ? '#222' : '#fff';
  };

  Avatar.prototype._hexToRgb = function (hex) {
    var _result;

    if (!hex) {
      return {r: 0, g: 0, b: 0}
    }

    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    _result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (_result) {
      return {
        r: parseInt(_result[1], 16),
        g: parseInt(_result[2], 16),
        b: parseInt(_result[3], 16)
      };
    }

    return null;
  };

  Avatar.prototype.generateColor = function (index) {

    if (this.options.backgroundColor) {
      return this.options.backgroundColor;
    }

    //Uses the randomColor generator - https://github.com/davidmerfield/randomColor
    if (typeof randomColor !== undefined) {
      if (this.options && this.options.randomColor) {
        return randomColor(this.options.randomColor);
      } else if (!this.options) {
        return randomColor();
      }
    }

    return this.options.colorPalette[Math.abs(index) % this.options.colorPalette.length];
  };

  // export
  win.MaterialAvatar = MaterialAvatar;

  if (typeof jQuery !== 'undefined' && typeof jQuery.fn !== 'undefined') {
    jQuery.fn.materialAvatar = function (options) {
      return this.each(function () {
        if (!jQuery.data(this, 'plugin_materialAvatar')) {
          jQuery.data(this, 'plugin_materialAvatar', new MaterialAvatar(this, options));
        }
      });
    };
  }

  function extend(_this, obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        _this[i] = obj[i];
      }
    }
  }

})(window, document);
