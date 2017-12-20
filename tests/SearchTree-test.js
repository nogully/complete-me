import { expect } from 'chai';
import Node from '../lib/Node'
import SearchTree from '../lib/SearchTree'
import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


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

  it('should return null if there is no word', () => {
    expect(trie.wordCount).to.eq(0);
    expect(trie.suggest('piz')).to.eq(null);
  })

  it('should take in a string and return an array', () => {
    trie.insert('pizza');
    expect(trie.suggest('piz')).to.be.array;
  });

  it('should suggest all words matching the phrase parameter (small sample)', () => {
    trie.insert('dead');
    trie.insert('dirt');
    trie.insert('done');
    trie.insert('donut');

    expect(trie.suggest('d')).to.deep.equal(['dead', 'dirt', 'done', 'donut']);
    expect(trie.suggest('do')).to.deep.equal(['done', 'donut']);
  });

})

describe('POPULATE', () => {
  let trie;

  beforeEach(() => {
    trie = new SearchTree();
    trie.populate(dictionary);
  })

  it('should should add 234371 words', () => {
    expect(trie.count).to.eq(234371);
  })
})

describe('SELECT', () => {
  let trie;

  beforeEach(() => {
    trie = new SearchTree();
    trie.populate(dictionary);
  })

  it('should be a function', () => {
    expect(trie.select).to.be.a('function');
  })
})


