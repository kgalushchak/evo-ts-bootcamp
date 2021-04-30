import {BinarySearchTree} from './BinarySearchTree';
import {TraverseType} from './traverseType';

describe('Test Binary Search Tree', () => {
  const tree = new BinarySearchTree({value: 15});
  tree.setTree(28);
  tree.setTree(42);
  tree.setTree(11);
  tree.setTree(17);
  tree.setTree(2);
  tree.setTree(13);
  tree.setTree(13); //duplicate

  it('asserts tree has a node with value 2', () => {
    expect(tree.has(2)).toEqual(true);
  });

  it('asserts tree has no node with value 12', () => {
    expect(tree.has(12)).toEqual(false);
  });

  it('asserts that tree traversed using BFS is correct', () => {
    const traversedTreeValues = tree.traverse(TraverseType.breadth);
    const expected = [15, 11, 28, 2, 13, 17, 42];
    expect(traversedTreeValues).toEqual(expected);
  });

  it('asserts that tree traversed using DFS-inorder is correct', () => {
    const traversedTreeValues = tree.traverse(TraverseType.inorder);
    const expected = [2, 11, 13, 15, 17, 28, 42];
    expect(traversedTreeValues).toEqual(expected);
  });

  it('asserts that tree traversed using DFS-postorder is correct', () => {
    const traversedTreeValues = tree.traverse(TraverseType.postorder);
    const expected = [2, 13, 11, 17, 42, 28, 15];
    expect(traversedTreeValues).toEqual(expected);
  });

  it('asserts that tree traversed using DFS-preorder is correct', () => {
    const traversedTreeValues = tree.traverse(TraverseType.preorder);
    const expected = [15, 11, 2, 13, 28, 17, 42];
    expect(traversedTreeValues).toEqual(expected);
  });

  it('asserts column with index 0 contains nodes with values 15, 13, 17', () => {
    expect(tree.getColumn(0)).toEqual([15, 13, 17]);
  });

  it('asserts column with index -1 contains node with value 11', () => {
    expect(tree.getColumn(-1)).toEqual([11]);
  });
});
