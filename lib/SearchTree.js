import Node from './Node.js';

export default class SearchTree extends Node {
  constructor() {
    super();
    this.root = new Node(null);
    this.wordCount = 0;
  }
  
  insert(string) {
    let current = this.root;
    this.wordCount++;
    let stringArray = [...string];

    stringArray.forEach((letter) => {
      // if (current.children.)
      let value = letter;
      let child = new Node(value);
      current.children[value] = child;
      current = current.children[value]
    })
    current.wordEnd = true;
  }

  suggest(string) {
    //for a string, checking nodes in order of string array
    //if first letter is present in children, then move on
    //to next group of children 
    //until the end of the string and then
    //return all the possible words that come from that string
    //so travel back up the tree with all of those end nodes
    //and their end nodes

    // if(string.length === 0) { return null }
    // let current = this.root;
    // let stringArray = [...string];

    
    // while (current.children) {
    //   if (object.keys(children).includes(letter)) {

    //   }
    //   current = current.children[value];
    // }

    // while (stringArray.length) {
    //   stringArray.forEach((letter) => {
    //   let value = letter;
    //   current = current.children[value]
    // })
    // }
    
    
    // function fetchAllWords(string) {

    // }

  }

  

}
