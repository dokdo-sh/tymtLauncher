export interface BlockchainNetwork {
    network_identifier: {
      blockchain: string;
      network: string;
    };
    current_block_identifier: {
      index: number;
      hash: string;
    };
    current_block_timestamp: number;
    genesis_block_identifier: {
      index: number;
      hash: string;
    };
    genesis_timestamp: number;
  }
  
  export interface Block {
    block_identifier: {
      index: number;
      hash: string;
    };
    parent_block_identifier: {
      index: number;
      hash: string;
    };
    timestamp: number;
    transactions: Transaction[];
  }
  
  export interface Transaction {
    transaction_identifier: {
      hash: string;
    };
    operations: Operation[];
  }
  
  export interface Operation {
    type: string;
    // Additional properties may be included depending on the operation type
  }
  
  