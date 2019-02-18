
const Cst = {
  GenesisTimestamp: 1525962288078,
  GenesisMsg: 'Genesis Message',
  GenesisAddress: 'SPICE_707d6653b0b81d679313',
  GenesisHashBlock: '182c67d43f333b962f88e1c7780c7650fc79f5a8dc23e8826bdbfe5d757f482f',
  GenesisHashMessages: '6864320b5f8c28368ca6c7bb4395406625be41565c90a9fc927abe81ae248456',
  GenesisHashMsg: '256100c3eaa459e608ffd425bab68e08b66a649b8da8c86306caef2da482e58d',

  StartDiff: 2,
  PrivateKeySize: 10,
  DefaultServerPort: 2000,
  AddressPrefix: 'SPICE_',

  Db: {
    DefaultDataDir: './data',
    DefaultPort: 27017,
    Name: 'BlockJS',
    Docs: {
      PendingMessages: 'PendingMessages',
      Blockchain: 'Blockchain',
      Address: 'Address',
      IncomingBlocks: 'IncomingBlocks',
    },
  },

  P2P: {
    CONNECTED: 'CONNECTED',
    RECEIVED: 'RECEIVED',
    BLOCK: 'BLOCK',
    VERSION: 'VERSION',
    ACK: 'ACK',
    NACK: 'NACK',
    HASH: 'HASH',
    INVENTORY: 'INVENTORY',
    GETBLOCK: 'GETBLOCK',
    MESSAGE: 'MESSAGE',
  },

  API: {
    Root: '/api',
    IP: '127.0.0.1', // '0.0.0.0',
    DefaultPort: 2100,
    Cmd: {
      Height: '/Height',
      Address: '/Address',
      Info: '/Info',
      Diff: '/Diff',
      LastHash: '/LastHash',
      PendingAmount: '/PendingAmount',
      PendingAll: '/PendingAll',
      LastBlock: '/LastBlock',
      BlockAtHeight: '/BlockAtHeight/:height',
      GetBlockWithHash: '/GetBlockWithHash/:hash',
      Mine: '/Mine',
      AmountPeers: '/AmountPeers',
      PeersDetails: '/PeersDetails',
      SendMsg: '/SendMsg',
      CheckMsgExist: '/CheckMsgExist',
      ConnectPeer: '/ConnectPeer',
    },
  },
}

const CstTxt = {
  BlockchainVersion: 'Blockchain version',
  ApiName: 'BlockJS API',
  InfoTitle: 'BLOCKCHAIN INFO',
  PeerInfoTitle: 'PEER INFO',
  PeersConnectedTitle: 'Connected peers:',
  Started: 'started',
  Port: 'port',
  Address: 'Address',
  Block: 'Block',
  Height: 'Height',
  Diff: 'Difficulty',
  LastHash: 'Last hash',
  Pending: 'Pending messages',
  IncomingBlockNotNext: 'Incoming block is not next block in non-sync mode --> ignore block',
  IncomingBlockAdded: 'added in blockchain',
  IncomingBlockStored: 'Incoming block stored',
  IncomingBlocksEvaluated: 'All stored blocks are evaluated',
}

const CstError = {
  HeightNotNumber: 'Height is not a number.',
  HashNotString: 'Hash is not a string',
  SendNotMsg: 'SendMsg: argument is not a message',
  SendNoContent: 'SendMsg: Empty message supplied',
  SendNoValid: 'SendMsg: message is not valid',
  MultiBlocks: 'Multiple blocks found',
  SameHeigh: 'with height',
  SameHash: 'with hash',
  ParseBlock: 'Could not parse block',
  NotBlock: 'argument is not a block',
  BlockInvalid: 'Block is not valid',
  BlockHeaderIncomplete: 'Block header incomplete',
  GenesisNotCreated: 'Could not create genesis block',
  GenessisNotAdded: 'cannot create/save genesis block',
  GenessisNotFirst: 'First block is not the genesis block',
  DbNotConnected: 'Cannot connect to the database',
  DbNotSaved: 'ERROR saving to the database: ',
  DbNotUpdate: 'ERROR updating to the database: ',
  DbNotFind: 'ERROR finding in the database: ',
  DbCounting: 'ERROR counting docs in the database',
  DbRemoveAll: 'ERROR removing all documents',
  DbRemoveOne: 'ERROR removing one document with',
  DbToCollection: 'with the collection: ',
  DbData: 'the data',
  DbFilter: 'filter:',
  MsgNoFrom: 'ERROR message is not valid: no from address',
  msgHashInvalid: 'ERROR message hash is not valid for content',
  MineNotSync: 'Cannot mine a block, BlockChain node needs syncing',
}


module.exports = { Cst, CstTxt, CstError }