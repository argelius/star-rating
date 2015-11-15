'use strict';

const currentScript = document._currentScript || document.currentScript;
const doc = currentScript.ownerDocument;

class StarRating extends HTMLElement {
  createdCallback() {
    const template = doc.querySelector('template') || document.createElement('template');
    const clone = document.importNode(template.content, true);

    this.createShadowRoot();
    this.shadowRoot.appendChild(clone);

    this._createStars().forEach((star) => {
      this.shadowRoot.appendChild(star);
    });

    this._colorStars();
  }

  attributeChangedCallback(name, from, to) {
    if (name === 'value') {
      this._colorStars();
    }
  }

  get value() {
    const v = parseFloat(this.getAttribute('value') || 0);
    if (!(v >= 0)) {
      return 0;
    }
    return v;
  }

  set value(v) {
    if (!(parseFloat(v) >= 0)) {
      throw new Error('Value must be a number larger or equal to 0.');
    }

    this.setAttribute('value', v);
  }

  get max() {
    return parseInt(this.getAttribute('max') || 5);
  }

  set max(v) {
    throw new Error('The maximum value can\'t be changed.');
  }

  get _stars() {
    return Array.from(this.shadowRoot.childNodes)
      .filter((node) => node.nodeName.toLowerCase() === 'span');
  }

  _createStars() {
    const stars = [];

    for (let i = 0; i < this.max; i++) {
      const star = document.createElement('span');
      star.innerHTML = '&#x2605;';
      stars.push(star);

      const innerStar = document.createElement('span');
      innerStar.innerHTML = '&#x2605;';
      star.appendChild(innerStar);
    }

    return stars;
  }

  _colorStars() {
    const value = this.value;
    let p;

    for (var i = 0; i < this.max; i++) {
      const star = this._stars[i];
      const innerStar = star.children[0];

      if (i + 1 <= value) {
        innerStar.style.width = '100%';
      }
      else {
        innerStar.style.width = 0;
      }

      p = value - i;

      if (p > 0 && p < 1) {
        innerStar.style.width = p * 100 + '%';
      }
    }
  }
}


window.StarRatingElement = document.registerElement('star-rating', StarRating);
