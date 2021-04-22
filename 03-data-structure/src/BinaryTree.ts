import {TraverseType} from './traverseType';

export interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

export interface IBinaryTree<T> {
  setTree(value: T): this;
  traverse(traverseType: TraverseType): T[];
  getColumn(columnOrder: number): T[];
}

export class BinaryTree<T> implements IBinaryTree<T> {
  constructor(protected root: TreeNode<T>) {
    this.root = root;
  }

  getColumn(columnOrder: number): T[] {
    const queue: TreeNode<T>[] = [];
    const columnMap: Map<number, T[]> = new Map();
    const map: Map<TreeNode<T>, number> = new Map();

    queue.push(this.root);
    while (queue.length > 0) {
      const tmp: TreeNode<T> = queue[0];
      queue.splice(0, 1);
      if (map.size === 0) {
        map.set(tmp, 0);
        columnMap.set(0, [tmp.value]);
      }
      const column: number = map.get(tmp)!;

      if(tmp.left) {
        queue.push(tmp.left);
        if (columnMap.has(column-1)) {
          columnMap.set(column-1, columnMap.get(column-1)!.concat(tmp.left.value));
        } else {
          columnMap.set(column-1, [tmp.left.value]);
        }
        map.set(tmp.left, column-1);
      }

      if(tmp.right) {
        queue.push(tmp.right);
        if (columnMap.has(column+1)) {
          columnMap.set(column+1, columnMap.get(column+1)!.concat(tmp.right.value));
        } else {
          columnMap.set(column+1, [tmp.right.value]);
        }
        map.set(tmp.right, column+1);
      }
    }
    return columnMap.get(columnOrder)!;
  }

  setTree(value: T): this {
    let currentNode: TreeNode<T> = this.root;

    while (currentNode) {
      if (value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = { value:value };
          break;
        }
        currentNode = currentNode.right;
      } else if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = { value: value };
          break;
        }
        currentNode = currentNode.left;
      } else break; //Do not allow to create a node with the value of already existing node
    }
    return this;
  }

  traverse(traverseType: TraverseType): T[] {
    const queue: TreeNode<T>[] = [];
    const visited: T[] = [];
    let currentNode: TreeNode<T> | undefined;

    switch (traverseType) {
    case TraverseType.breadth:
      queue.push(this.root);
      while (queue.length > 0) {
        const currentNode: TreeNode<T> = queue[0];
        queue.splice(0, 1);
        visited.push(currentNode.value);
        if (currentNode.left) {
          queue.push(currentNode.left);
        }
        if (currentNode.right) {
          queue.push(currentNode.right);
        }
      }
      return visited;

    case TraverseType.inorder:
      currentNode = this.root;
      while (queue.length > 0 || currentNode) {
        if (currentNode) {
          queue.push(currentNode);
          currentNode = currentNode.left;
        } else {
          currentNode = queue[queue.length-1];
          queue.splice(queue.length-1, 1);
          visited.push(currentNode.value);
          currentNode = currentNode.right;
        }
      }
      return visited;

    case TraverseType.postorder:
      queue.push(this.root);
      while (queue.length > 0) {
        const currentNode: TreeNode<T> = queue[queue.length-1];
        queue.splice(queue.length-1, 1);
        visited.push(currentNode.value);
        if (currentNode.left) {
          queue.push(currentNode.left);
        }
        if (currentNode.right) {
          queue.push(currentNode.right);
        }
      }
      return visited.reverse();

    case TraverseType.preorder:
      queue.push(this.root);
      while (queue.length > 0) {
        const currentNode: TreeNode<T> = queue[queue.length-1];
        queue.splice(queue.length-1, 1);
        visited.push(currentNode.value);
        if (currentNode.right) {
          queue.push(currentNode.right);
        }
        if (currentNode.left) {
          queue.push(currentNode.left);
        }
      }
      return visited;
    }
  }
}
