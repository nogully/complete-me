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

  it('should flag that the word has an end', () => {
    trie.insert('hi');
    expect(trie.root.children.h.wordEnd).to.eq(false);

    expect(trie.root.children.h.children.i.wordEnd).to.eq(true)
  })

  it('should check to see if the word already exists', () => {
    trie.insert('dead');
    trie.insert('dirt');
    trie.insert('done');
    trie.insert('donut');
    expect(trie.insert('donut')).to.eq('Word already inserted!')
  })
})

describe('SUGGEST', () => {
  let trie;

  beforeEach(() => {
    trie = new SearchTree();
  })

  it('should start with an empty trie', () => {
    expect(trie.wordCount).to.eq(0);
  })

  it('should return null if there is nothing inserted', () => {
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

  it('should suggest all words matching the phrase parameter (large sample)', () => {
    trie.populate(dictionary)
    expect(trie.suggest('nath')).to.deep.equal(['nathan', 'nathanael', 'nathaniel', 'nathe', 'nather', 'nathless']);
  });

  it('should return null if you put in numbers', () => {
    trie.populate(dictionary)
    expect(trie.suggest(123)).to.equal(null);
  })

  it('should return null if you put in gibberish', () => {
    trie.populate(dictionary)
    expect(trie.suggest('xoi4oijfds9')).to.equal(null);
  })

  it('should return null if you enter nothing', () => {
    expect(trie.suggest()).to.equal(null);
  })

  it('should return null if your word is not found', () => {
    trie.populate(dictionary)
    expect(trie.suggest('leta')).to.equal(null);
  })
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
    trie.insert('dead');
    trie.insert('dirt');
    trie.insert('done');
    trie.insert('donut');
  })

  it('should be a function', () => {
    expect(trie.select).to.be.a('function');
  })

  it('should increment the rating of a node', () => {
    trie.select('donut');
    let node = trie.findNode('donut');
    expect(node.rating).to.eq(1);
  })

  it('should suggest the selected word first (small sample)', () => {
    expect(trie.suggest('d')).to.deep.eq([ 'dead', 'dirt', 'done', 'donut' ])
    trie.select('donut');
    let node = trie.findNode('donut');
    expect(trie.suggest('d')).to.deep.eq(['donut', 'dead', 'dirt', 'done'])
  })

  it('should suggest the selected word first (large sample)', () => {
    trie.populate(dictionary);
    expect(trie.suggest('nora')).to.deep.eq([ 'norah', 'norard', 'norate', 'noration' ])
    trie.select('noration')
    expect(trie.suggest('nora')).to.deep.eq([ 'noration', 'norah', 'norard', 'norate' ])
  })

})

describe('DELETE', () => {
  let trie;

  beforeEach(() => {
    trie = new SearchTree();
  })

  it('should be a function', () => {
    expect(trie.delete).to.be.a('function');
  })

  it('should not suggest words that have been deleted', () => {
    trie.populate(dictionary);
    expect(trie.suggest('nora')).to.deep.eq([ 'norah', 'norard', 'norate', 'noration' ])
    trie.delete('norah')
    expect(trie.suggest('nora')).to.deep.eq([ 'norard', 'norate', 'noration' ])
  })

})
