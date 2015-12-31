var should = require('chai')
  .should();

// Personal numbers are time dependent so set global time to something fixed
require('timekeeper').travel('2015-12-29T00:00:00');


var valfor = require('../src/valfor.js');
describe('valfor', function () {
  'use strict';

  it('exists', function () {
    valfor.should.be.a('object');
  });

  it('should contains functions', function () {
    var funcs = [
      'cellphonenum',
      'personalidnum',
      'orgidnum',
      'bankcardnum',
      'zipcode',
      'email',
      'text'
    ];
    funcs.forEach(function (func) {
      valfor.should.have.property(func)
        .that.is.a('function');
    });
  });

  it('should have correct "constants"', function () {
    var constants = {
      DEFAULT: 0,
      NUMERICAL_FORMAT: 1,
      INTERNATIONAL_FORMAT: 2,
      NATIONAL_FORMAT: 4,
      NBR_DIGITS_10: 8,
      NBR_DIGITS_12: 16,
      ADD_SEPARATOR: 32,
      SPACE_SEPARATOR: 64,
      DASH_SEPARATOR: 128,
      LOWERCASE: 256,
      UPPERCASE: 512
    };
    for (var key in constants) {
      valfor.should.have.property(key, constants[key]);
    }
  });

  it('should process cellphone numbers', function () {

    valfor.cellphonenum('0702112233')
      .should.equal('0702112233');
    valfor.cellphonenum('+460702112233')
      .should.equal('0702112233');
    valfor.cellphonenum('070-211 22 33')
      .should.equal('0702112233');

    valfor.cellphonenum('0702112233', valfor.INTERNATIONAL_FORMAT)
      .should.equal('+46702112233');
    valfor.cellphonenum('+460702112233', valfor.INTERNATIONAL_FORMAT)
      .should.equal('+46702112233');
    valfor.cellphonenum('070-211 22 33', valfor.INTERNATIONAL_FORMAT)
      .should.equal('+46702112233');

    valfor.cellphonenum('0702112233', valfor.NATIONAL_FORMAT)
      .should.equal('070-211 22 33');
    valfor.cellphonenum('+460702112233', valfor.NATIONAL_FORMAT)
      .should.equal('070-211 22 33');
    valfor.cellphonenum('070-211 22 33', valfor.NATIONAL_FORMAT)
      .should.equal('070-211 22 33');

    valfor.cellphonenum('0710112233')
      .should.equal(false);
    valfor.cellphonenum('07021122')
      .should.equal(false);
    valfor.cellphonenum('0812345678')
      .should.equal(false);
  });

  it('should process personal id numbers', function () {
    valfor.personalidnum('900101-5701', valfor.NBR_DIGITS_12)
      .should.equal('199001015701');
    valfor.personalidnum('900101-5701', valfor.NBR_DIGITS_12 | valfor.ADD_SEPARATOR)
      .should.equal('19900101-5701');
    valfor.personalidnum('900101-5701', valfor.NBR_DIGITS_10)
      .should.equal('9001015701');
    valfor.personalidnum('900101-5701', valfor.NBR_DIGITS_10 | valfor.ADD_SEPARATOR)
      .should.equal('900101-5701');
    valfor.personalidnum('160101+1149', valfor.NBR_DIGITS_12)
      .should.equal('181601011149');
    valfor.personalidnum('100101+1145', valfor.NBR_DIGITS_12)
      .should.equal('191001011145');
    valfor.personalidnum('191001011145', valfor.NBR_DIGITS_12 | valfor.ADD_SEPARATOR)
      .should.equal('19100101+1145');
    valfor.personalidnum('191001011145', valfor.NBR_DIGITS_10 | valfor.ADD_SEPARATOR)
      .should.equal('100101+1145');

    valfor.personalidnum('900101-5705', valfor.NBR_DIGITS_12)
      .should.equal(false);
    valfor.personalidnum('20900101-5701', valfor.NBR_DIGITS_12 | valfor.ADD_SEPARATOR)
      .should.equal(false);
    valfor.personalidnum('901301-5701', valfor.NBR_DIGITS_10)
      .should.equal(false);
    valfor.personalidnum('900132-5701', valfor.NBR_DIGITS_10 | valfor.ADD_SEPARATOR)
      .should.equal(false);
  });

  it('should process organisation numbers', function () {
    valfor.orgidnum('555555-5555')
      .should.equal('5555555555');
    valfor.orgidnum('555555-5555', valfor.ADD_SEPARATOR)
      .should.equal('555555-5555');

    valfor.orgidnum('555555-5555', valfor.NBR_DIGITS_10)
      .should.equal('5555555555');
    valfor.orgidnum('555555-5555', valfor.NBR_DIGITS_10 | valfor.ADD_SEPARATOR)
      .should.equal('555555-5555');

    valfor.orgidnum('555555-5555', valfor.NBR_DIGITS_12)
      .should.equal('165555555555');
    valfor.orgidnum('555555-5555', valfor.NBR_DIGITS_12 | valfor.ADD_SEPARATOR)
      .should.equal('16555555-5555');

    valfor.orgidnum('0710112233')
      .should.equal(false);
    valfor.orgidnum('07021122')
      .should.equal(false);
    valfor.orgidnum('0812345678')
      .should.equal(false);

  });

  it('should process bank card numbers');

  it('shoupd process zip codes', function () {
    valfor.zipcode('54100', valfor.NUMERICAL_FORMAT)
      .should.equal('54100');
    valfor.zipcode('54100', valfor.NATIONAL_FORMAT)
      .should.equal('541 00');
    valfor.zipcode('54100', valfor.INTERNATIONAL_FORMAT)
      .should.equal('SE-541 00');

    valfor.zipcode('00001', valfor.NUMERICAL_FORMAT)
      .should.equal(false);
    valfor.zipcode('49152', valfor.NATIONAL_FORMAT)
      .should.equal(false);
    valfor.zipcode('123', valfor.INTERNATIONAL_FORMAT)
      .should.equal(false);
  });

  it('should process email addresses');

  it('should process text');


});
