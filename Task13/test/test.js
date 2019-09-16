const assert = require('assert');
const BinarySearchTree = require('../src/script');
let elements = [40, 50, 30, 10, 60];

describe("BST.root()", function() {
    it("Should return root of BST (null).", function() {
        const BST = new BinarySearchTree();

        assert(BST.root() === null);
    });
});

describe("BST.insert(data, key)", function() {
    it("Insert (50, 'fifty'), (70, 'seventy'), (40, 'forty') by BST rules, and check the value and the key.", function() {
        //------------50-----------
        //----------/---\----------
        //--------40-----70--------
        //-------------------------
        const BST = new BinarySearchTree();
        BST.insert(50, 'fifty');
        BST.insert(70, 'seventy');
        BST.insert(40, 'forty');

        assert(BST.root().data === 50);
        assert(BST.root().left.data === 40);
        assert(BST.root().right.data === 70);
        assert(BST.root().key === 'fifty');
        assert(BST.root().left.key === 'forty');
        assert(BST.root().right.key === 'seventy');
    });

    it("Method should be chainable.", function() {
        const BST = new BinarySearchTree();
        BST.insert(50, 'fifty').insert(70, 'seventy').insert(40, 'forty');

        assert(BST.root().data === 50);
        assert(BST.root().left.data === 40);
        assert(BST.root().right.data === 70);
        assert(BST.root().key === 'fifty');
        assert(BST.root().left.key === 'forty');
        assert(BST.root().right.key === 'seventy');
    });
});

describe("BST.delete(key)", function() {
    it("Delete 'element30' should return [40, 10, 50, 60].", function() {
        //------------40-----------
        //----------/---\----------
        //--------30-----50--------
        //------/---------\--------
        //----10----------60-------
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));
        BST.delete('element30');

        assert(BST.traverse(true).join('') === [40, 10, 50, 60].join(''));
    });

    it("Delete 'element10' should return [40, 30, 50, 60].", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));
        BST.delete('element10');

        assert(BST.traverse(true).join('') === [40, 30, 50, 60].join(''));
    });

    it("Method should be chainable.", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));
        BST.delete('element10').delete('element30');

        assert(BST.traverse(true).join('') === [40, 50, 60].join(''));
    });
});

describe("BST.search(key)", function() {
    it("BST.search('element10').data should return 10.", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));

        assert(BST.search('element10').data === 10);
    });

    it("BST.search('element10').key should return 'element10'.", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));

        assert(BST.search('element10').key === 'element10');
    });
});

describe("BST.contains(value)", function() {
    it("If the value is in BST, method should return true.", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));

        assert(BST.contains(10) === true);
        assert(BST.contains(30) === true);
    });

    it("If the value is not in BST, method should return false.", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));

        assert(BST.contains(100) === false);
        assert(BST.contains(300) === false);
    });
});

describe("BST.traverse(order)", function() {
    it("If order is true, method should return [40, 30, 10, 50, 60].", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));

        assert(BST.traverse(true).join('') === [40, 30, 10, 50, 60].join(''));
    });

    it("If order is false, method should return [10, 30, 60, 50, 40].", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));

        assert(BST.traverse(false).join('') === [10, 30, 60, 50, 40].join(''));
    });
});

describe("BST.verify()", function() {
    it("Should return true", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));

        assert(BST.verify() === true);
    });

    it("If we do BST._root.left.data = 100, method should return false.", function() {
        const BST = new BinarySearchTree();
        elements.forEach(el => BST.insert(el, 'element' + el));
        BST._root.left.data = 100;

        assert(BST.verify() === false);
    });
});

