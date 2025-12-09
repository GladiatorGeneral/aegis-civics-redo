/**
 * MERKLE TREE IMPLEMENTATION
 * For cryptographic verification of legislative data
 */

import { createHash } from 'crypto';

export interface MerkleNode {
  hash: string;
  left?: MerkleNode;
  right?: MerkleNode;
  data?: string;
  isLeaf: boolean;
}

export class MerkleTree {
  private root: MerkleNode | null = null;
  private leaves: MerkleNode[] = [];

  constructor(data?: string[]) {
    if (data && data.length > 0) {
      this.buildTree(data);
    }
  }

  /**
   * Build Merkle tree from data array
   */
  buildTree(data: string[]): void {
    // Create leaf nodes
    this.leaves = data.map(item => ({
      hash: this.hash(item),
      data: item,
      isLeaf: true
    }));

    // Build tree from leaves
    this.root = this.buildLevel(this.leaves);
  }

  /**
   * Recursively build tree levels
   */
  private buildLevel(nodes: MerkleNode[]): MerkleNode | null {
    if (nodes.length === 0) return null;
    if (nodes.length === 1) return nodes[0];

    const nextLevel: MerkleNode[] = [];

    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = nodes[i + 1] || left; // Duplicate if odd number

      const parentHash = this.hash(left.hash + right.hash);
      nextLevel.push({
        hash: parentHash,
        left,
        right: nodes[i + 1] ? right : undefined,
        isLeaf: false
      });
    }

    return this.buildLevel(nextLevel);
  }

  /**
   * Get root hash
   */
  getRoot(): string | null {
    return this.root?.hash || null;
  }

  /**
   * Verify data exists in tree
   */
  verify(data: string): boolean {
    const dataHash = this.hash(data);
    return this.leaves.some(leaf => leaf.hash === dataHash);
  }

  /**
   * Get proof path for data
   */
  getProof(data: string): Array<{ hash: string; position: 'left' | 'right' }> {
    const dataHash = this.hash(data);
    const leafIndex = this.leaves.findIndex(leaf => leaf.hash === dataHash);
    
    if (leafIndex === -1) return [];

    const proof: Array<{ hash: string; position: 'left' | 'right' }> = [];
    let currentLevel = [...this.leaves];
    let index = leafIndex;

    while (currentLevel.length > 1) {
      const isRightChild = index % 2 === 1;
      const siblingIndex = isRightChild ? index - 1 : index + 1;
      
      if (siblingIndex < currentLevel.length) {
        proof.push({
          hash: currentLevel[siblingIndex].hash,
          position: isRightChild ? 'left' : 'right'
        });
      }

      // Move to next level
      const nextLevel: MerkleNode[] = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1] || left;
        nextLevel.push({
          hash: this.hash(left.hash + right.hash),
          isLeaf: false
        });
      }
      currentLevel = nextLevel;
      index = Math.floor(index / 2);
    }

    return proof;
  }

  /**
   * Verify proof
   */
  verifyProof(
    data: string,
    proof: Array<{ hash: string; position: 'left' | 'right' }>,
    rootHash: string
  ): boolean {
    let hash = this.hash(data);

    for (const step of proof) {
      if (step.position === 'left') {
        hash = this.hash(step.hash + hash);
      } else {
        hash = this.hash(hash + step.hash);
      }
    }

    return hash === rootHash;
  }

  /**
   * Add new data to tree (requires rebuild)
   */
  addData(data: string): void {
    const existingData = this.leaves.map(leaf => leaf.data || '');
    existingData.push(data);
    this.buildTree(existingData);
  }

  /**
   * Get all leaf hashes
   */
  getLeafHashes(): string[] {
    return this.leaves.map(leaf => leaf.hash);
  }

  /**
   * Hash function using SHA-256
   */
  private hash(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  /**
   * Get tree statistics
   */
  getStats(): {
    leafCount: number;
    depth: number;
    rootHash: string | null;
  } {
    const depth = Math.ceil(Math.log2(this.leaves.length || 1));
    return {
      leafCount: this.leaves.length,
      depth,
      rootHash: this.getRoot()
    };
  }
}
