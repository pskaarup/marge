import {t} from '../../frameworks/test/index';

declare var browser:any, element:any, by:any;

t.describe('App', function() {

  t.be(function() {
    browser.get('/');
  });

  t.it('should do math correctly - sanity heck', () => {
    t.expect(5 + 2).toEqual(7);
  });

});
