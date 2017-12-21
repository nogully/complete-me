import { expect } from 'chai';
import Node from '../lib/Node.js'
import SearchTree from '../lib/SearchTree.js'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('a')
  })

  it('should be a thing', () => {
    expect(node).to.exist;
  })

  it('should default children to empty obj', () => {
    expect(node.children).to.deep.equal({});
  })

  it('should take value and assign it to data prop', () => {
    expect(node.value).to.equal('a')
  })

  it('should not be a word by default', () => {
    expect(node.wordEnd).to.equal(false)
  })

  it('should start out with a rating of 0', () => {
    expect(node.rating).to.equal(0);
  })

});
