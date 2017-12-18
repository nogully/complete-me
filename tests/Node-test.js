import { expect } from 'chai';
import Node from '../scripts/Node'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('a')
  })

  it('should be a thing', () => {
    expect(node).to.exist
  })

  it('should default next to null', () => {
    expect(node.left).to.equal(null);
    expect(node.right).to.equal(null);
  })

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('a')
  })

  it('should not be a word by default', () => {
    expect(node.isWord).to.equal(false)
  })

})
