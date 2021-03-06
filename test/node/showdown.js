require('source-map-support').install();
require('chai').should();
var expect = require('chai').expect,
    showdown = require('../../dist/showdown.js');

describe('showdown.options', function () {
  'use strict';

  describe('setOption() and getOption()', function () {
    it('should set option foo=bar', function () {
      showdown.setOption('foo', 'bar');
      showdown.getOption('foo').should.equal('bar');
      showdown.resetOptions();
      expect(showdown.getOption('foo')).to.be.undefined();
    });
  });
});

describe('showdown.extension()', function () {
  'use strict';

  var extObjMock = {
        type: 'lang',
        filter: function () {}
      },
      extObjFunc = function () {
        return extObjMock;
      };

  describe('should register', function () {
    it('an extension object', function () {
      showdown.extension('foo', extObjMock);
      showdown.extension('foo').should.eql([extObjMock]);
      showdown.resetExtensions();
    });

    it('an extension function', function () {
      showdown.extension('foo', extObjFunc);
      showdown.extension('foo').should.eql([extObjMock]);
      showdown.resetExtensions();
    });
  });

  describe('should refuse to register', function () {
    it('a generic object', function () {
      var fn = function () {
        showdown.extension('foo', {});
      };
      expect(fn).to.throw();
    });

    it('an extension with invalid type', function () {
      var fn = function () {
        showdown.extension('foo', {
          type: 'foo'
        });
      };
      expect(fn).to.throw(/type .+? is not recognized\. Valid values: "lang" or "output"/);
    });

    it('an extension without regex or filter', function () {
      var fn = function () {
        showdown.extension('foo', {
          type: 'lang'
        });
      };
      expect(fn).to.throw(/extensions must define either a "regex" property or a "filter" method/);
    });
  });
});

describe('showdown.getAllExtensions()', function () {
  'use strict';
  var extObjMock = {
        type: 'lang',
        filter: function () {}
      };

  it('should return all extensions', function () {
    showdown.extension('bar', extObjMock);
    showdown.getAllExtensions().should.eql({bar: [extObjMock]});
  });
});
