class Node {
    constructor (data, key, left = null, right = null) {
        this.data = data;
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor() {
        this._root = null;
    }

    root() {
        return this._root;
        //`Root: ${this._root.data}, Root Left: ${this._root.left.data}, Root Right: ${this._root.right.data}.`;
    }

    insert(data, key) {
        const node = new Node(data, key);

        if (!this._root) {
            this._root = node;
        } else {
            let currentNode = this._root;
            while (currentNode) {
                if (currentNode.data > data) {
                    if (currentNode.left) {
                        currentNode = currentNode.left;
                    } else {
                        currentNode.left = node;
                        break;
                    }
                } else {
                    if (currentNode.right) {
                        currentNode = currentNode.right;
                    } else {
                        currentNode.right = node;
                        break;
                    }
                }
            }
        }
        return this;
    }

    delete(key) {
        let valueOfRemoveElement = this.search(key).data;
        function deleteNode (node, key) {
            if (key === node.key) {
                if (!node.left && !node.right) {
                    return null;
                }
                if (!node.left) {
                    return node.right;
                }
                if (!node.right) {
                    return node.left;
                }
                if (node.left && node.right){
                    let tempNode = node.right;
                    while (tempNode.left) {
                        tempNode = tempNode.left;
                    }
                    node.data = tempNode.data;
                    node.key = tempNode.key;
                    node.right = deleteNode(node);
                    return node;
                }
            } else if (valueOfRemoveElement < node.data) {
                node.left = deleteNode(node.left, key);
                return node;
            } else {
                node.right = deleteNode(node.right, key);
                return node;
            }
        }
        this._root = deleteNode(this._root, key);
        return this;
    }

    contains(value) {
        let currentNode = this._root;
        if (currentNode.data === value) {
            return true;
        }
        else {
            while (currentNode) {
                if (value > currentNode.data && currentNode.right) {
                    currentNode = currentNode.right;
                }
                if (value < currentNode.data && currentNode.left) {
                    currentNode = currentNode.left;
                }
                if (value === currentNode.data) {
                    return true;
                }
                if (value > currentNode.data && !currentNode.right || value < currentNode.data && !currentNode.left) {
                    return false;
                }
            }
        }
    }

    search(key) {
        if (!this._root) {
            return null;
        } else {
            let result = null;
                function searchKey(node, key) {
                        if (node.key === key) {
                            result = node;
                        }
                        node.left && searchKey(node.left, key);
                        node.right && searchKey(node.right, key);
                }
                searchKey(this._root, key);
            return result;
        }

    }

    verify() {
        let result = true;

        if (!this._root) {
            return result;
        } else {
            function isVerify(node) {
                if (node && node.left && node.right) {
                    if (node.data > node.left.data) {
                        isVerify(node.left);
                    } else {
                        result = false;
                    }
                    if (node.data < node.right.data) {
                        isVerify(node.right);
                    } else {
                        result = false;
                    }
                }
            }
            isVerify(this._root);
            return result;
        }
    }

    clear() {
        return this._root = null;
    }
    traverse(value) {
        if (!this._root) {
            return null;
        }
        else {
            let result = [];
            if (value) {
                function preOrder(node) {
                    result.push(node.data);
                    node.left && preOrder(node.left);
                    node.right && preOrder(node.right);
                }
                preOrder(this._root);
                return result;
            }
            if (!value) {
                function postOrder(node) {
                    node.left && postOrder(node.left);
                    node.right && postOrder(node.right);
                    result.push(node.data);
                }
                postOrder(this._root);
                return result;
            }
        }
    }

    findMinValue() {
        if (!this._root) {
            return null;
        }
        else {
            let node = this._root;
            while (node.left) {
                node = node.left;
            }
            return node.data;
        }
    }

    findMaxValue() {
        if (!this._root) {
            return null;
        }
        else {
            let node = this._root;
            while (node.right) {
                node = node.right;
            }
            return node.data;
        }
    }
}

let BST = new BinarySearchTree();
BST.insert(40, 'forty').insert(50, 'fifty').insert(30, 'thirty').insert(20, 'twenty');
// BST._root.left.data = 100;
// BST.delete('fifty').delete('thirty');
console.log(JSON.stringify(BST));


module.exports = BinarySearchTree;