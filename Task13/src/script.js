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
        this.requiredNode = null;

        this.searchKey = function(node, key) {
            if (!node) {
                return this.requiredNode;
            } else {
                if (node.key === key) {
                    return this.requiredNode = node;
                }
                node.left && this.searchKey(node.left, key);
                node.right && this.searchKey(node.right, key);
            }
        };

        this.isVerify = function (node) {
            if (node && node.left && node.right) {
                if (node.data > node.left.data) {
                    this.isVerify(node.left);
                } else {
                    return false;
                }
                if (node.data < node.right.data) {
                    this.isVerify(node.right);
                } else {
                    return false;
                }
                return true;
            }
        };
    }

    root() {
        return this._root;
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

    search(key) {
            this.searchKey(this._root, key);
            return this.requiredNode;
    }

    verify() {
        if (!this._root) {
            return true;
        } else {
            return this.isVerify(this._root);
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

module.exports = BinarySearchTree;