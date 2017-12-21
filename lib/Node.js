export default class Node {
  constructor (value) {
    this.value = value;
    this.wordEnd = false;
    this.children = {};
    this.rating = 0;
  }
}
