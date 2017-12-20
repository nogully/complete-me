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
    let current = this.root;

    let stringArray = [...string.toLowerCase()]

    stringArray.forEach((letter) => {
      if (!current.children[letter]){
        current.children[letter] = new Node(letter)
      } 
      current = current.children[letter]
    })

    if (!current.wordEnd) {
      this.wordCount++;
    }
    current.wordEnd = true;
  }

  suggest(fragment) {
    let word = fragment.toLowerCase().split('');
    let currentNode = this.root;

    word.forEach(letter => {
      if (currentNode && currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    })

    if (!currentNode) {
      return null;
    } else {
      return this.findSuggestions(currentNode, word.join(''));
    }
  }
  
  findSuggestions(currentNode, word) {
    let childrenLetters = Object.keys(currentNode.children);
    let suggestions = [];

    childrenLetters.forEach( childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newWord = word + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push(newWord);//this is an object
      }
      suggestions.push(...this.findSuggestions(letterNode, newWord));
    });

      return sortSuggestions(suggestions);
  }

  sortSuggestions(suggestions) {

  }

  populate(dictionary){
    dictionary.forEach( word => this.insert(word) );
  }

  select(word) {
    

  }

  delete(word){
    //set wordend to null;
  }
}

