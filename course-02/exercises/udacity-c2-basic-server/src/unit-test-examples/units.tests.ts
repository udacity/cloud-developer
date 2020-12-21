import { add, divide, concat } from './units';

import { expect } from 'chai';
import 'mocha';

describe('add function', () => {

  it('should add two and two', () => {
    const result = add(2,2);
    expect(result).to.equal(4);
  });

  it('should add -2 and two', () => {
    const result = add(-2,2);
    expect(result).to.equal(0);
  });

});

describe('divide', () => {

  it('should divide 6 by 3', () => {
    const result = divide(6,3);
    expect(result).to.equal(2);
  });

  it('should divide 5 and 2', () => {
    const result = divide(5,2);
    expect(result).to.equal(2.5);
  });

  it('should throw an error if div by zero', () => {
    expect(()=>{ divide(5,0) }).to.throw('div by 0')
  });

});

// @TODO try creating a new describe block for the "concat" method
// it should contain an it block for each it statement in the units.ts @TODO.
// don't forget to import the method ;)
describe('concat', () => {

  it('should concat strings "a" and "b"', () => {
    const result = concat("a", "b");
    expect(result).to.equal("ab");
  });

  it('should throw an error if first string empty', () => {
    expect(()=>{ concat("","a") }).to.throw('empty string');
  });

  it('should throw an error if second string empty', () => {
    expect(()=>{ concat("a", "") }).to.throw('empty string');
  });

  it('should throw an error is both strings empty', () => {
    expect(()=>{ concat("", "")}).to.throw('empty string');
  });

});