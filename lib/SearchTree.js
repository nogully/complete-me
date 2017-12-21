import Node from './Node.js';

export default class SearchTree extends Node {
  constructor() {
    super();
    this.root = new Node(null);
    this.wordCount = 0;
  }

  get count() {
    return this.wordCount;
  }
  
  insert(string) {
    if (this.findNode(string)) {
      return 'Word already inserted!';
    }

    let current = this.root;
    let stringArray = [...string.toLowerCase()];


    stringArray.forEach((letter) => {
      if (!current.children[letter]) {
        current.children[letter] = new Node(letter);
      } 
      current = current.children[letter];
    });

    if (!current.wordEnd) {
      this.wordCount++;
    }
    current.wordEnd = true;
  }

  suggest(fragment) {
    let currentNode = this.root;

    if (typeof fragment === 'string') {
      var word = fragment.toLowerCase().split('');
    } else { 
      return null;
    }

    word.forEach(letter => {
      if (currentNode && currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    });

    if (!currentNode || !currentNode.children) {
      return null;
    } else {
      return this.findSuggestions(currentNode, word.join(''), []);
    }
  }
  
  findSuggestions(currentNode, string, suggestions) {
    let childrenLetters = Object.keys(currentNode.children);

    childrenLetters.forEach( childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newWord = string + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push({word: newWord, rank: letterNode.rating });
      }
      this.findSuggestions(letterNode, newWord, suggestions);  
    });
    return this.sortSuggestions(suggestions);
  }

  sortSuggestions(arrayofObjs) {
    arrayofObjs.sort((a, b) => {
      return b.rank - a.rank;
    });
    return arrayofObjs.map((wordObject) => {
      return wordObject.word;
    });
  }

  populate(dictionary) {
    dictionary.forEach( word => this.insert(word) );
  }

  select(word) {
    let string = word.toLowerCase().split('');
    let currentNode = this.root;

    string.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    currentNode.rating++;
  }

  delete(word) {
    let node = this.findNode(word);
    
    node.wordEnd = false;
  }

  findNode(word) {
    let string = word.toLowerCase().split('');
    let currentNode = this.root;

    string.forEach(letter => {
      if (currentNode && currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    });

    if (!currentNode) {
      return null;
    } else {
      return currentNode;
    }
  }


  
}