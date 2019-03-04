
const Cst = {
  GenesisTimestamp: 1525962288078,
  GenesisMsg: 'Genesis Message',
  GenesisAddress: 'SPICE_707d6653b0b81d679313',
  GenesisHashBlock: 'b56b73b6b14995683fc30e18dc86c40d1f371a9cd05f0f3aa056bc3426597597',
  GenesisHashMessages: '4fc18ba6223bb2301064867f903f29b39866f680144f2aff50863e64a12abb90',
  GenesisHashMsg: '256100c3eaa459e608ffd425bab68e08b66a649b8da8c86306caef2da482e58d',
  GenesisMsgId: null,
  GenesisNonce: 0,
  GenesisDiff: 2,

  StartDiff: 4,
  PrivateKeySize: 10,
  AddressPrefix: 'SPICE_',

  Db: {
    DefaultDataDir: './data',
    DefaultPort: 27017,
    DefaultServerIP: '127.0.0.1', // 'host.docker.internal',
    Name: 'BlockJS',
    Docs: {
      PendingMessages: 'PendingMessages',
      Blockchain: 'Blockchain',
      Address: 'Address',
      IncomingBlocks: 'IncomingBlocks',
    },
  },

  P2P: {
    DefaultServerPort: 2000,
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
    IP: '0.0.0.0',
    DefaultPort: 2100,
    Cmd: {
      Address: '/Address',
      AmountPeers: '/AmountPeers',
      BlockAtHeight: '/BlockAtHeight/:height',
      Diff: '/Diff',
      CheckMsgExist: '/CheckMsgExist',
      ConnectPeer: '/ConnectPeer',
      FindMsgID: '/FindMsgID',
      GetBlockWithHash: '/GetBlockWithHash/:hash',
      Height: '/Height',
      Info: '/Info',
      LastHash: '/LastHash',
      LastBlock: '/LastBlock',
      Mine: '/Mine',
      PendingAmount: '/PendingAmount',
      PendingAll: '/PendingAll',
      PeersDetails: '/PeersDetails',
      SendMsg: '/SendMsg',
      Stop: '/Stop',
      Verify: '/Verify',
      Help: '/Help',
    },
  },
}

const CstTxt = {
  BlockchainVersion: 'Blockchain version',
  ApiName: 'BlockJS API',
  InfoTitle: 'BLOCKCHAIN INFO',
  PeerInfoTitle: 'PEER INFO',
  Version: 'Version',
  PeersConnectedTitle: 'Connected peers:',
  Started: 'started',
  Stopped: 'Database connection closed, P2P connections closed',
  P2Pclosed: 'Server stopped, all in/outgoing connections are closed',
  Port: 'port',
  Address: 'Address',
  Block: 'Block',
  Height: 'Height',
  Diff: 'Difficulty',
  LastHash: 'Last hash',
  Pending: 'Pending messages',
  Mining: 'Current mining',
  ListCmds: 'API commands:',
  IncomingBlockInvalid: 'Incoming p2p block is not valid',
  IncomingBlockNotNext: 'Incoming block is not next block in non-sync mode --> ignore block',
  IncomingBlockAllReceived: 'Received all needed blocks, start evaluating them now',
  IncomingBlockAdded: 'added in blockchain',
  IncomingBlockStored: 'Incoming block stored',
  IncomingBlocksEvaluated: 'All stored blocks are evaluated',
  IncomingBlockAlreadyKnow: 'Incoming block already in blockchain, don\'t need to evaluate',
  IncomingBlockPrevNotKnown: '.', // 'Previous block is not in the blockchain, keep block in stored incoming blocks, will need to evaluate again',
  IncomingBlockNewHeight: 'Height of new incoming block will be',
  IncomingBlockProcessResult: 'Incoming block evaluated:',
  IncomingBlockReprocess: 'Still needs evaluation',
  IncomingBlockAllProcessed: 'All blocks are evaluated',
  IncomingHashNeedsSync: 'This node needs syncing ! Wait for incoming inventory message',
  IncomingHashKnown: 'Incoming hash is known, create inventory message for peer',
  MiningFoundBlock: 'Found block with after ',
  MiningAborted: 'Mining was aborted, ignore minted block',
  P2Plistening: 'Listening on port',
  P2PincomingConnection: 'Incoming connection from',
  P2PincomingConnectionPort: 'on port',
  P2Pbroadcast: 'Broadcasting a',
  P2Pmsg: 'p2p message',
  P2PconnectedVersion: 'Connected to a peer on version',
  P2PincomingBlock: 'Incoming block successful evaluated',
  P2PconnectedBestHash: 'Connected peer best hash',
  P2PalreadyConnected: 'Already connected to this peer',

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
  ParseBlockWrongHash: 'The hash of the saved block is not valid',
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
  P2PconnectNoIP: 'No remote IP address provided',
  P2PconnectNoPort: 'No remote port provide',
  CannotFindBlockForHash: 'Cannot find block with hash',
  CannotGetBestHash: 'Cannot find best hash',
  PreviousHashNotInBlockchain: 'Previous hash is found in blockchain',
}

const CstHelp = {
  [Cst.API.Cmd.Address]: 'Get own address',
  [Cst.API.Cmd.AmountPeers]: 'Amount of connected peers',
  [Cst.API.Cmd.BlockAtHeight]: 'Get block at specified height: /BlockAtHeight/:height',
  [Cst.API.Cmd.Diff]: 'Show PoW difficulty',
  [Cst.API.Cmd.CheckMsgExist]: 'Provide content, check if the message exists in the blockchain',
  [Cst.API.Cmd.ConnectPeer]: 'Connect to provided remoteIP (and optional remotePort)',
  [Cst.API.Cmd.FindMsgID]: 'Get message by Id',
  [Cst.API.Cmd.GetBlockWithHash]: 'Get block of specified hash: /GetBlockWithHash/:hash',
  [Cst.API.Cmd.Height]: 'Current height of the blockchain',
  [Cst.API.Cmd.Info]: 'Information of the blockchain',
  [Cst.API.Cmd.LastHash]: 'Last hash of the blockchain',
  [Cst.API.Cmd.LastBlock]: 'Last block',
  [Cst.API.Cmd.Mine]: 'Mine one block',
  [Cst.API.Cmd.PendingAmount]: 'Amount of pending messages to be mined',
  [Cst.API.Cmd.PendingAll]: 'Show all pending messages',
  [Cst.API.Cmd.PeersDetails]: 'Show connected peers',
  [Cst.API.Cmd.SendMsg]: 'Send a message, will be stored in the next block',
  [Cst.API.Cmd.Stop]: 'Stop this node: close database connection and all P2P connections',
  [Cst.API.Cmd.Verify]: 'Verify each block in the blockchain',
  [Cst.API.Cmd.Help]: 'Show this help',
}

module.exports = {
  Cst, CstTxt, CstError, CstHelp,
}
