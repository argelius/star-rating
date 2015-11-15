describe('StarRatingElement', () => {
  it('exists', () => {
    window.StarRatingElement.should.be.ok;
  });

  describe('#value', () => {
    it('should be the same as the "value" attribute', () => {
      const el = new StarRatingElement();

      el.setAttribute('value', '2.3');
      el.value.should.equal(2.3)

      el.value = 1.1;
      el.getAttribute('value').should.equal('1.1');
    });

    it('returns 0 if the attribute is negative', () => {
      const el = new StarRatingElement();

      el.setAttribute('value', '-10');
      el.value.should.equal(0);
    });

    it('throws an error if set to an invalid value', () => {
      const el = new StarRatingElement();

      () => { el.value = -1 }.should.throw(Error);
    });

    it('correctly sets the stars width', () => {
      const el = new StarRatingElement();

      el.value = 1.2;

      el._stars[0].children[0].style.width.should.equal('100%');
      el._stars[1].children[0].style.width.should.equal('20%');
      el._stars[2].children[0].style.width.should.equal('0px');
    });
  });

  describe('#max', () => {
    it('should have the same value as the "max" attribute', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <star-rating max="10" value="5.5"></star-rating>
      `;

      const el = container.children[0];
      el.max.should.equal(10);
    });

    it('throws and error when changed', () => {
      const el = new StarRatingElement();
      () => { el.max = 20 }.should.throw(Error);
    });
  });
});
