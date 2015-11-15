'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var currentScript = document._currentScript || document.currentScript;
var doc = currentScript.ownerDocument;

var StarRating = (function (_HTMLElement) {
  _inherits(StarRating, _HTMLElement);

  function StarRating() {
    _classCallCheck(this, StarRating);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StarRating).apply(this, arguments));
  }

  _createClass(StarRating, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this2 = this;

      var template = doc.querySelector('template');
      var clone = document.importNode(template.content, true);

      this.createShadowRoot();
      this.shadowRoot.appendChild(clone);

      this._createStars().forEach(function (star) {
        _this2.shadowRoot.appendChild(star);
      });

      this._colorStars();
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, from, to) {
      if (name === 'max') {
        throw new Error('The maximum value can\'t be changed.');
      } else if (name === 'value') {
        this._colorStars();
      }
    }
  }, {
    key: '_createStars',
    value: function _createStars() {
      var stars = [];

      for (var i = 0; i < this.max; i++) {
        var star = document.createElement('span');
        star.innerHTML = '&#x2605;';
        stars.push(star);

        var innerStar = document.createElement('span');
        innerStar.innerHTML = '&#x2605;';
        star.appendChild(innerStar);
      }

      return stars;
    }
  }, {
    key: '_colorStars',
    value: function _colorStars() {
      var value = this.value;
      var p = undefined;

      for (var i = 0; i < this.max; i++) {
        var star = this._stars[i];
        var innerStar = star.children[0];

        if (i + 1 <= value) {
          innerStar.style.width = '100%';
        } else {
          innerStar.style.width = 0;
        }

        p = value - i;

        if (p > 0 && p < 1) {
          innerStar.style.width = p * 100 + '%';
        }
      }
    }
  }, {
    key: 'value',
    get: function get() {
      var v = parseFloat(this.getAttribute('value') || 0);
      if (!(v >= 0)) {
        return 0;
      }
      return v;
    },
    set: function set(v) {
      if (!(parseFloat(v) >= 0)) {
        throw new Error('Value must be a number larger or equal to 0.');
      }

      this.setAttribute('value', v);
    }
  }, {
    key: 'max',
    get: function get() {
      return parseInt(this.getAttribute('max') || 5);
    },
    set: function set(v) {
      throw new Error('The maximum value can\'t be changed.');
    }
  }, {
    key: '_stars',
    get: function get() {
      return Array.from(this.shadowRoot.childNodes).filter(function (node) {
        return node.nodeName.toLowerCase() === 'span';
      });
    }
  }]);

  return StarRating;
})(HTMLElement);

window.StarRatingElement = document.registerElement('star-rating', StarRating);
//# sourceMappingURL=star-rating.js.map
