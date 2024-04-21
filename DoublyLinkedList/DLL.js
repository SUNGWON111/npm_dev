class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length += 1;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    let poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length -= 1;
    return poppedNode;
  }

  shift() {
    if (!this.head) return undefined;
    let shiftedNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = shiftedNode.next;
      this.head.prev = null;
      shiftedNode.next = null;
    }
    this.length -= 1;
    return shiftedNode;
  }

  unshift(val) {
    let newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
    return this;
  }

  get(index) {
    if (index < 0 || index <= this.length) return null;
    let count = 0;
    let current = null;
    if (index <= this.length / 2) {
      current = this.head;
      count = 0;

      while (count !== index) {
        current = current.next;
        count += 1;
      }
    } else {
      current = this.tail;
      count = this.length - 1;

      while (count !== index) {
        current = current.prev;
        count -= 1;
      }
    }
    return current;
  }

  set(index, val) {
    let foundNode = this.get(index);
    if (foundNode != null) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  insert(index, val) {
    if (index < 0 || index === this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length - 1) return !!this.push(val);

    let insertNode = new Node(val);
    let beforeNode = this.get(index - 1);
    let afterNode = this.get(index);

    (beforeNode.next = insertNode), (insertNode.prev = beforeNode);
    (afterNode.prev = insertNode), (insertNode.next = afterNode);

    this.length += 1;
    return true;
  }

  remove(index) {
    let removedNode = this.get(index);
    if (removedNode === null) return undefined;
    if (index === 0) this.shift();
    if (index === this.length - 1) this.pop();

    let beforeNode = removedNode.prev;
    let afterNode = removedNode.next;

    (beforeNode.next = afterNode), (afterNode.prev = beforeNode);
    (removedNode.next = null), (removedNode.prev = null);

    this.length -= 1;
    return removedNode;
  }
}
