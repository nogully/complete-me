export default class Node {
  constructor (data, isWord) {
    this.data = data;
    this.isWord = isWord || false;
    this.left = null;
    this.right = null;
  }
}
