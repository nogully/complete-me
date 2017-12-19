import { expect } from 'chai';
import Node from '../lib/Node'
import SearchTree from '../lib/SearchTree'

describe('SearchTree', () => {
  let trie;

  beforeEach(() => {
    trie = new SearchTree();
  });

  it('should start with zero elements but a word count property', () => {
    expect(trie.wordCount).to.eq(0);
  });

  it('should set its default root to null', () => {
    expect(trie.root.value).to.eq(null);
  });

})

describe('INSERT', () => {
  let trie;

  beforeEach(() => {
    trie = new SearchTree();
  })

  it('should start with an empty trie', () =>{
    expect(trie.wordCount).to.eq(0);
  })

  it('should have a count that returns the number of words in the tree', () => {
    trie.insert('hi');
    expect(trie.wordCount).to.eq(1)

    trie.insert('pizza');
    expect(trie.wordCount).to.eq(2)
  })
    
  it('should insert letters in order as children of previous letters', () => {
    trie.insert('hi');
    expect(Object.keys(trie.root.children)[0]).to.eq('h');
    expect(Object.keys(trie.root.children.h.children)[0]).to.eq('i');
  })

  it('should indicate that the word has an end', () => {
    trie.insert('hi');
    expect(trie.root.children.h.wordEnd).to.eq(false);
    expect(trie.root.children.h.children.i.wordEnd).to.eq(true)
  })

  // it('should check to see if the word already exists', () => {
  // })
})

describe('SUGGEST', () => {
  let trie;

  beforeEach(() => {
    trie = new SearchTree();
  })

  it('should start with an empty trie', () => {
    expect(trie.wordCount).to.eq(0);
  })

  it('should suggest a word based on partial word inserted', () => {
    trie.insert('pizza');
    console.log(JSON.stringify( trie.root, null, '\t'));
    expect(trie.suggest('piz')).to.eq('pizza');
  })

//   completion.suggest("piz")
// => ["pizza"]

// completion.insert("pizzeria")

// completion.suggest("piz")
// => ["pizza", "pizzeria"]

// completion.suggest('a')
// => ["apple"]
})



