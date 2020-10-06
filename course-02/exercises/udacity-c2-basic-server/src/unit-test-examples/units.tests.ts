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
  it('should concat a and b to ab', () => {
    const result = concat("a", "b");
    expect(result).to.equal("ab");
  });
  
  it('should fail if first parameter a is null', () => {
    expect(() => { concat(null, "Test") }).to.throw('Invalid Argument');
  });
  
  it('should fail if first parameter is undefined', () => {
    let a:string;
    let b:string = "b";
    expect( () => { concat(a,b)}).to.throw('Invalid Argument');
  });

  it('should fail if first parameter is empty string', () => {
    let a:string = "";
    let b:string = "b";
    expect( () => { concat(a,b)}).to.throw('Invalid Argument');
  });

  it('should fail if second parameter b is null', () => {
    expect(() => { concat("test", null) }).to.throw('Invalid Argument');
  });
  
  it('should fail if second parameter is undefined', () => {
    let a:string = "a";
    let b:string;
    expect( () => { concat(a,b)}).to.throw('Invalid Argument');
  });

  it('should fail if second parameter is empty string', () => {
    let a:string = "a";
    let b:string = "";
    expect( () => { concat(a,b)}).to.throw('Invalid Argument');
  });

});