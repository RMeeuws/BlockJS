/* eslint-disable class-methods-use-this */
const {
  CheckPoW, CreateBlock, ParseBlockFromDb, IsValidBlock,
} = require('../src/blockchain/block')
const { CreateMessage, IsMessageValid } = require('../src/blockchain/message')
const { Cst } = require('../src/Const')

const TestContent = 'Test message'
const TestContent2 = '2th Test message'
const TestFromAddress = 'Azerty123456789'

const NotBlock = {
  PrevHash: 12,
  Height: 1556,
  Nonce: 3,
  Diff: 1,
  Version: 1,
  Timestamp: 1552298828282,
  Messages: null,
  Hash: '01a9ea0b176702a3e8b38deb60ae550f6190064dc46150062cc50cd037665c32',
}

const Init = async () => {
  const TestMsg = await CreateMessage(TestFromAddress, TestContent)
  const TestMsg2 = await CreateMessage(TestFromAddress, TestContent2)

  const ValidBlock = await CreateBlock(123, 456, 22, 1, [TestMsg, TestMsg2], 1552297448266)
  const SavedBlockHash = ValidBlock.Hash
  const SavedMgsHash = ValidBlock.HashMessages
  return {
    TestMsg, TestMsg2, ValidBlock, SavedMgsHash, SavedBlockHash,
  }
}

it('Valid block creation: block with 2 messages', async () => {
  const TestData = await Init()
  const TestBlock = await IsValidBlock(TestData.ValidBlock)
  expect(TestBlock).toBeTruthy()
})

it('Valid block: without messages', async () => {
  const BlockWithoutMsg = await CreateBlock(123, 456, 15, 1, null, 1552298178587)
  expect(await IsValidBlock(BlockWithoutMsg)).toBeTruthy()
})

it('InValid block: not a Block type', async () => {
  expect(await IsValidBlock(NotBlock)).toBeFalsy()
})
it('Invalid block detection: header invalid with string as nonce', async () => {
  const BlockWithoutHeaders = await CreateBlock('ggrr', 2, 'rrr')
  expect(await IsValidBlock(BlockWithoutHeaders)).toBeFalsy()
  expect(BlockWithoutHeaders).toBeNull()
})
it('Invalid block detection: no nonce', async () => {
  const TestData = await Init()
  const { TestMsg, TestMsg2 } = TestData
  const BlockWithoutNonce = await CreateBlock(null, 0, 0, 2, [TestMsg, TestMsg2], Date.now())
  BlockWithoutNonce.Nonce = null
  expect(IsValidBlock(BlockWithoutNonce)).toBeTruthy()
  expect(await IsValidBlock(BlockWithoutNonce)).toBeFalsy()
})
it('Invalid block: invalid message', async () => {
  const TestData = await Init()
  const { TestMsg, TestMsg2 } = TestData
  const InvalidMsg = { Hash: 123 } // invalid: no from address
  expect(await IsMessageValid(InvalidMsg)).toBeFalsy()

  const InvalidBlock = await CreateBlock(null, 0, 0, 2,
    [TestMsg, InvalidMsg, TestMsg2], Date.now())
  expect(await IsValidBlock(InvalidBlock)).toBeFalsy()
})

it('Invalid block detection: changed PrevHash', async () => {
  const TestData = await Init()
  const { SavedBlockHash, ValidBlock } = TestData
  const BlockChangedPrevHash = ValidBlock
  BlockChangedPrevHash.PrevHash = '6587459'
  const ChangedHash = await BlockChangedPrevHash.GetBlockHash()
  expect(ChangedHash).not.toBe(SavedBlockHash)
})

it('Invalid block detection: changed Version', async () => {
  const TestData = await Init()
  const { SavedBlockHash, ValidBlock } = TestData
  const BlockChangedVersion = ValidBlock

  BlockChangedVersion.Version = '1.23.456'
  const ChangedHash = await BlockChangedVersion.GetBlockHash()
  expect(ChangedHash).not.toBe(SavedBlockHash)
})
it('Invalid block detection: changed Nonce', async () => {
  const TestData = await Init()
  const { SavedBlockHash, ValidBlock } = TestData
  const BlockChangedNonce = ValidBlock

  BlockChangedNonce.Nonce = 9876
  const ChangedHash = await BlockChangedNonce.GetBlockHash()
  expect(ChangedHash).not.toBe(SavedBlockHash)
})
it('Invalid block detection: changed diff', async () => {
  const TestData = await Init()
  const { SavedBlockHash, ValidBlock } = TestData
  const BlockChangedDiff = ValidBlock

  BlockChangedDiff.Diff = 456
  const ChangedHash = await BlockChangedDiff.GetBlockHash()
  expect(ChangedHash).not.toBe(SavedBlockHash)
})
it('Invalid block detection: changed timestamp', async () => {
  const TestData = await Init()
  const { SavedBlockHash, ValidBlock } = TestData
  const BlockChangedTimestamp = ValidBlock

  BlockChangedTimestamp.Timestamp = Date.now() + 1
  const ChangedHash = await BlockChangedTimestamp.GetBlockHash()
  expect(ChangedHash).not.toBe(SavedBlockHash)
})

it('Message cannot be changed', async () => {
  const TestData = await Init()
  const {
    SavedMgsHash, SavedBlockHash, ValidBlock, TestMsg,
  } = TestData
  const BlockChangedMsg = ValidBlock

  const changedMsg = { ...TestMsg, Hash: 'ChangedHash' }
  BlockChangedMsg.Messages = [changedMsg]

  const BlockHash = await ValidBlock.GetBlockHash()
  const MessagesHash = await ValidBlock.GetMsgsHash()
  expect(BlockHash).not.toBe(SavedBlockHash)
  expect(MessagesHash).not.toBe(SavedMgsHash)
})

it('Parse from object, without messages (simulation read from db)', async () => {
  // define Hash inside this test as other test mutates it for there run
  const ParsedBlock = await ParseBlockFromDb(NotBlock)
  expect(ParsedBlock).not.toBeNull()
  const Valid = await IsValidBlock(ParsedBlock)
  expect(Valid).toBeTruthy()
})
it('Parse from object, with messages (simulation read from db)', async () => {
  const TestData = await Init()
  const { TestMsg } = TestData
  const FromDb = { ...NotBlock }
  FromDb.Messages = [TestMsg]
  FromDb.Nonce = 3
  FromDb.Timestamp = 1552299236218
  FromDb.Hash = '00f3bbaf9794d1a7c18113002bd80d1d7bd35589f566d58f93b4a88b3cb4a924'
  const ParsedBlock = await ParseBlockFromDb(FromDb)
  expect(ParsedBlock).not.toBeNull()
  expect(await IsValidBlock(ParsedBlock)).toBeTruthy()
})
it('Parse from object, invalid block hash', async () => {
  NotBlock.Hash = 0
  const ParsedBlock = await ParseBlockFromDb(NotBlock)
  expect(ParsedBlock).toBeNull()
  expect(await IsValidBlock(ParsedBlock)).toBeFalsy()
})
it('Parse from object, invalid block: no height', async () => {
  const BlockWithoutHeight = { ...NotBlock }
  BlockWithoutHeight.Height = undefined

  const ParsedBlock = await ParseBlockFromDb(BlockWithoutHeight)
  expect(ParsedBlock).toBeNull()
  expect(await IsValidBlock(ParsedBlock)).toBeFalsy()
})
it('Check previous hash: correct is in the blockchain', async () => {
  const TestData = await Init()
  const { ValidBlock } = TestData

  class DummyBlockChain {
    async GetBlockWithHash() {
      return Promise.resolve(await CreateBlock(null, 0, 0, 2, [], Date.now()))
    }
  }

  const OkBlockChain = new DummyBlockChain()

  const result = await ValidBlock.CheckPrevHash(OkBlockChain)
  expect(result).toBeTruthy()
})
it('Check previous hash: invalid is not in the blockchain', async () => {
  const TestData = await Init()
  const { ValidBlock } = TestData
  class DummyBlockChain {
    GetBlockWithHash() { return Promise.resolve(null) }
  }

  const NOkBlockChain = new DummyBlockChain()

  const result = await ValidBlock.CheckPrevHash(NOkBlockChain)
  expect(result).toBeFalsy()
})
it('Check previous hash: invalid error during search in the blockchain', async () => {
  const TestData = await Init()
  const { ValidBlock } = TestData
  class DummyBlockChain {
    GetBlockWithHash() { return Promise.reject() }
  }

  const NOkBlockChain = new DummyBlockChain()

  const result = await ValidBlock.CheckPrevHash(NOkBlockChain)
  expect(result).toBeFalsy()
})
it('Check previous hash: invalid, not first block without prevHash', async () => {
  const TestData = await Init()
  const { TestMsg } = TestData
  const TestBlock = await CreateBlock(null, 5, 0, 2, [TestMsg], Date.now())
  class DummyBlockChain {
    GetBlockWithHash() { return Promise.reject() }
  }
  const NOkBlockChain = new DummyBlockChain()
  const result = await TestBlock.CheckPrevHash(NOkBlockChain)
  expect(result).toBeFalsy()
})

it('Check previous hash: valid,  first genesis block = no prevHash', async () => {
  const GenesisMsg = await CreateMessage(Cst.GenesisAddress, Cst.GenesisMsg)
  const GenesisBlock = await CreateBlock(null, 0, Cst.GenesisNonce,
    Cst.GenesisDiff, [GenesisMsg], Cst.GenesisTimestamp)

  class DummyBlockChain {
    GetBlockWithHash() { return Promise.resolve() }
  }
  const OkBlockChain = new DummyBlockChain()

  const result = await GenesisBlock.CheckPrevHash(OkBlockChain)
  expect(result).toBeTruthy()
})

it('Save block to db (saves calculated hash)', async () => {
  const TestData = await Init()
  const { ValidBlock } = TestData
  const TestBlock = await IsValidBlock(ValidBlock)
  expect(TestBlock).toBeTruthy()

  class DummyDbSave {
    Add() { return Promise.resolve(true) }
  }
  const dummyDb = new DummyDbSave()
  const result = await ValidBlock.Save(dummyDb)
  expect(result).toBeTruthy()
})

it('Save block to db failed', async () => {
  const TestData = await Init()
  const { ValidBlock } = TestData
  const TestBlock = await IsValidBlock(ValidBlock)
  expect(TestBlock).toBeTruthy()

  class DummyDbSaveFaild {
    Add() { return Promise.reject(new Error('simulation db add failed')) }
  }
  const dummyDb = new DummyDbSaveFaild()
  const result = await ValidBlock.Save(dummyDb)
  expect(result).toBeNull()
})

it('Check valid Pow', async () => {
  const TestData = await Init()
  const { ValidBlock: { Diff, Hash } } = TestData

  const ValidPow = await CheckPoW(Diff, Hash)
  expect(ValidPow).toBeTruthy()
})
