"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.size = function() {
  let sum = 0;
  if (this.left != null) sum += this.left.size();
  if (this.right != null) sum += this.right.size();
  return sum+1;
}

BinarySearchTree.prototype.insert = function(value) {
  let newNode = new BinarySearchTree(value);

  if (value < this.value) {
    if (this.left == null) this.left = newNode;
    else this.left.insert(value);
  } else {
    if (this.right == null) this.right = newNode;
    else this.right.insert(value);
  }
}

BinarySearchTree.prototype.contains = function(value) {
  if (this.value == value) return true;
  
  if (value < this.value) {
    if(this.left == null) return false;
    else return this.left.contains(value);
  } else {
    if(this.right == null) return false;
    else return  this.right.contains(value);
  }
}

let steps = 1;

BinarySearchTree.prototype.depthFirstForEach = function(cb, way = "in-order") {
  if (way === "in-order") {
    if (this.left != null) {
      this.left.depthFirstForEach(cb, way);
      cb(this.value);
    } else {
      cb(this.value);
    }
    if (this.right != null) {
      this.right.depthFirstForEach(cb, way);
    }
  }

  if (way === "pre-order") {
    if (this.left != null) {
      cb(this.value);
      this.left.depthFirstForEach(cb, way);
    } else {
      cb(this.value);
    }
    if (this.right != null) {
      this.right.depthFirstForEach(cb, way);
    }
  }

  if (way === "post-order") {
    if (this.left != null) {
      this.left.depthFirstForEach(cb, way);
      if (this.right != null) {
        this.right.depthFirstForEach(cb, way);
      }
      cb(this.value);
    } else {
      if (this.right != null) {
        this.right.depthFirstForEach(cb, way);
      }
      cb(this.value);
    }
  }
}

BinarySearchTree.prototype.breadthFirstForEach = function(cb) {
  let queue = [];
  queue.push(this);
  while (queue.length != 0) {
    var tempNode = queue.shift();
    cb(tempNode.value);

    /* Enqueue left child */
    if (tempNode.left != null) {
      queue.push(tempNode.left);
    }

    /* Enqueue right child */
    if (tempNode.right != null) {
      queue.push(tempNode.right);
    }
  }
}

let tree = new BinarySearchTree(10);
let testArr = [];
tree.insert(8);
tree.insert(12);
tree.insert(7);
tree.insert(6);
tree.insert(9);
tree.insert(11);
tree.insert(13);
tree.insert(15);

tree.breadthFirstForEach(function(val){ testArr.push(val); })

console.log(testArr);

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
