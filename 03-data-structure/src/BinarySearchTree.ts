import {BinaryTree, IBinaryTree, TreeNode} from './BinaryTree';

export interface IBinarySearchTree extends IBinaryTree<number> {
  has(value: number): boolean;
}

export class BinarySearchTree extends BinaryTree<number> implements IBinarySearchTree {
  constructor(root: TreeNode<number>) {
    super(root);
  }
  
  has(value: number): boolean {
    let currentNode: TreeNode<number> = this.root;

    while (currentNode) {
      if (value === currentNode.value) {
        return true;
      } else if (value > currentNode.value && currentNode.right) {
        currentNode = currentNode.right;
      } else if (currentNode.left) {
        currentNode = currentNode.left;
      } else {
        break;
      }
    }
    return false;
  }
}
