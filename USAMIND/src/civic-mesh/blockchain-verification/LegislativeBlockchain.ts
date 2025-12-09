/**
 * DISTRIBUTED LEGISLATIVE LEDGER
 * Every bill/amendment cryptographically verified
 * Citizen nodes can validate authenticity
 * Immutable history tracking
 */

import { createHash } from 'crypto';
import { MerkleTree } from './MerkleTree';

export interface BillData {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  sponsors: string[];
  cosponsors: string[];
  committee: string;
  introducedDate: Date;
  status: BillStatus;
  amendments: Amendment[];
  votes: VoteRecord[];
}

export type BillStatus = 
  | 'introduced'
  | 'in_committee'
  | 'passed_committee'
  | 'floor_consideration'
  | 'passed_chamber'
  | 'conference'
  | 'to_president'
  | 'signed'
  | 'vetoed'
  | 'law';

export interface Amendment {
  id: string;
  proposer: string;
  text: string;
  status: 'pending' | 'adopted' | 'rejected';
  date: Date;
}

export interface VoteRecord {
  chamber: 'house' | 'senate';
  date: Date;
  yeas: number;
  nays: number;
  present: number;
  notVoting: number;
  result: 'passed' | 'failed';
  rollCall: RollCallVote[];
}

export interface RollCallVote {
  memberId: string;
  vote: 'yea' | 'nay' | 'present' | 'not_voting';
}

export interface LegislativeBlock {
  index: number;
  timestamp: number;
  data: BillData;
  previousHash: string;
  merkleRoot: string;
  hash: string;
  nonce: number;
}

export interface CitizenNode {
  id: string;
  publicKey: string;
  lastVerification: Date;
  trustScore: number;
  verifyBlock: (block: LegislativeBlock) => Promise<boolean>;
}

export class LegislativeBlockchain {
  private chain: LegislativeBlock[] = [];
  private merkleTree: MerkleTree;
  private citizenNodes: CitizenNode[] = [];
  private difficulty: number = 2; // Number of leading zeros required
  private pendingTransactions: BillData[] = [];

  constructor() {
    this.merkleTree = new MerkleTree();
    this.chain = [this.createGenesisBlock()];
  }

  /**
   * Create the genesis block
   */
  private createGenesisBlock(): LegislativeBlock {
    const genesisData: BillData = {
      id: 'GENESIS',
      title: 'Genesis Block - Constitutional Foundation',
      summary: 'The foundational block of the Legislative Blockchain',
      fullText: 'We the People of the United States...',
      sponsors: ['Constitutional Convention'],
      cosponsors: [],
      committee: 'Constitutional Convention',
      introducedDate: new Date('1787-09-17'),
      status: 'law',
      amendments: [],
      votes: []
    };

    const block: LegislativeBlock = {
      index: 0,
      timestamp: new Date('1787-09-17').getTime(),
      data: genesisData,
      previousHash: '0'.repeat(64),
      merkleRoot: this.calculateMerkleRootSync(genesisData),
      hash: '',
      nonce: 0
    };

    block.hash = this.calculateHash(block);
    return block;
  }

  /**
   * Add a bill to the blockchain
   */
  async addBill(bill: BillData): Promise<LegislativeBlock | null> {
    // Create block with legislative data
    const block: LegislativeBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      data: bill,
      previousHash: this.getLatestBlock().hash,
      merkleRoot: await this.calculateMerkleRoot(bill),
      hash: '',
      nonce: 0
    };

    // Mine block with proof-of-stake
    block.hash = await this.mineBlock(block);

    // Verify with citizen nodes
    const verified = await this.verifyWithCitizens(block);

    if (verified) {
      this.chain.push(block);
      await this.broadcastToNetwork(block);
      return block;
    }

    return null;
  }

  /**
   * Get the latest block
   */
  getLatestBlock(): LegislativeBlock {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Calculate Merkle root for bill data
   */
  async calculateMerkleRoot(bill: BillData): Promise<string> {
    const dataElements = [
      bill.id,
      bill.title,
      bill.summary,
      bill.fullText,
      ...bill.sponsors,
      ...bill.cosponsors,
      bill.committee,
      bill.introducedDate.toISOString(),
      bill.status
    ];

    this.merkleTree.buildTree(dataElements);
    return this.merkleTree.getRoot() || '';
  }

  /**
   * Synchronous Merkle root calculation
   */
  private calculateMerkleRootSync(bill: BillData): string {
    const dataElements = [
      bill.id,
      bill.title,
      bill.summary,
      bill.fullText,
      ...bill.sponsors,
      bill.committee,
      bill.status
    ];

    const tree = new MerkleTree(dataElements);
    return tree.getRoot() || '';
  }

  /**
   * Mine a block with proof-of-work
   */
  private async mineBlock(block: LegislativeBlock): Promise<string> {
    const target = '0'.repeat(this.difficulty);
    let nonce = 0;
    let hash = '';

    while (!hash.startsWith(target)) {
      block.nonce = nonce;
      hash = this.calculateHash(block);
      nonce++;

      // Yield to prevent blocking
      if (nonce % 1000 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }

    return hash;
  }

  /**
   * Calculate block hash
   */
  private calculateHash(block: LegislativeBlock): string {
    const data = JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      data: block.data,
      previousHash: block.previousHash,
      merkleRoot: block.merkleRoot,
      nonce: block.nonce
    });

    return createHash('sha256').update(data).digest('hex');
  }

  /**
   * Verify block with citizen nodes
   */
  private async verifyWithCitizens(block: LegislativeBlock): Promise<boolean> {
    if (this.citizenNodes.length === 0) {
      // No nodes registered, accept by default
      return true;
    }

    // Distributed verification by citizen nodes
    const verifications = await Promise.all(
      this.citizenNodes.map(node => node.verifyBlock(block))
    );

    // Require 51% consensus
    const consensus = verifications.filter(v => v).length / this.citizenNodes.length;
    return consensus >= 0.51;
  }

  /**
   * Broadcast block to network
   */
  private async broadcastToNetwork(block: LegislativeBlock): Promise<void> {
    // In production, this would use WebSockets or P2P networking
    console.log(`Block ${block.index} broadcast to network`);
  }

  /**
   * Register a citizen node
   */
  registerCitizenNode(node: CitizenNode): void {
    this.citizenNodes.push(node);
  }

  /**
   * Validate the entire chain
   */
  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Verify current block hash
      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      // Verify chain linkage
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get block by index
   */
  getBlock(index: number): LegislativeBlock | undefined {
    return this.chain[index];
  }

  /**
   * Get block by bill ID
   */
  getBlockByBillId(billId: string): LegislativeBlock | undefined {
    return this.chain.find(block => block.data.id === billId);
  }

  /**
   * Search bills
   */
  searchBills(query: string): BillData[] {
    const lowerQuery = query.toLowerCase();
    return this.chain
      .map(block => block.data)
      .filter(bill =>
        bill.title.toLowerCase().includes(lowerQuery) ||
        bill.summary.toLowerCase().includes(lowerQuery)
      );
  }

  /**
   * Get chain statistics
   */
  getChainStats(): {
    totalBlocks: number;
    totalBills: number;
    citizenNodes: number;
    chainValid: boolean;
    latestBlockTime: Date;
  } {
    return {
      totalBlocks: this.chain.length,
      totalBills: this.chain.length - 1, // Exclude genesis
      citizenNodes: this.citizenNodes.length,
      chainValid: this.isChainValid(),
      latestBlockTime: new Date(this.getLatestBlock().timestamp)
    };
  }

  /**
   * Export chain for backup
   */
  exportChain(): string {
    return JSON.stringify(this.chain, null, 2);
  }

  /**
   * Import chain from backup
   */
  importChain(chainData: string): boolean {
    try {
      const importedChain = JSON.parse(chainData) as LegislativeBlock[];
      
      // Validate imported chain
      const tempChain = this.chain;
      this.chain = importedChain;
      
      if (!this.isChainValid()) {
        this.chain = tempChain;
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  }
}
