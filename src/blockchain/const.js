
const Const = {
  GenesisReward: 1000,
  GenesisTimestamp: 1525962288078,
  GenesisRewardWallet: 'Genesis Reward Wallet',
  GenesisAddress: '707d6653b0b81d679313',
  GenesisHash: '0af6077fb5bb48b99a17b7309372efaac21e9a10c26b47454dac19312b7c88ac',
  GenesisTxHash: 'cae87f517fb0d3226258e896048e77b9114fe41fe7ef1f57fe310ed0ca14d478',

  StartBlockReward: 10,
  StartDiff: 2,
  PrivateKeySize: 10,

  DefaultServerPort: 2000,


  Db: {
    DefaultDataDir: './data',
    DefaultPort: 27017,
    Name: 'BlockJS',
    Docs: {
      PendingTransactions: 'PendingTransactions',
      Blockchain: 'Blockchain',
      Wallet: 'Wallet',
      OwnTx: 'OwnTx',
      OrphanBlocks: 'OrphanBlocks',
      IncomingBlocks: 'IncomingBlocks',
    },
  },

  P2P: {
    CONNECTED: 'CONNECTED',
    RECIEVED: 'RECEIVED',
    BLOCK: 'BLOCK',
    VERSION: 'VERSION',
    ACK: 'ACK',
    NACK: 'NACK',
    HASH: 'HASH',
    INVENTORY: 'INVENTORY',
    GETBLOCK: 'GETBLOCK',
  },

  API: {
    Root: '/api',
    IP: '0.0.0.0',
    DefaultPort: 9000,
  },
}

module.exports = Const