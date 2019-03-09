/* eslint-disable class-methods-use-this */
const Mining = require('../src/blockchain/mining.js')
const Message = require('../src/blockchain/message.js')
const Block = require('../src/blockchain/block.js')

const { Cst, CstError } = require('../src/Const')

const { Db: { Docs: CstDocs } } = Cst

const TestContent = 'Test message'
const TestFromAddress = 'Azerty123456789'

const TestMsg = Message.Create(TestFromAddress, TestContent)

class DummyDb {
  Find(doc) {
    if (doc === CstDocs.PendingMessages) {
      return Promise.resolve([TestMsg])
    }
    return Promise.reject()
  }

  Add() { return Promise.resolve(true) }

  RemoveAllDocs() { return Promise.resolve(true) }
}

class DummyP2P {
  Broadcast() { }
}

class DummyBlockchain {
  constructor(syncNeeded, testDiff = 1) {
    this.Db = new DummyDb()
    this.P2P = new DummyP2P()
    this.syncNeeded = syncNeeded
    this.Mining = false
    this.TestDiff = testDiff
  }

  CheckSyncingNeeded() { return this.syncNeeded }

  GetBestHash() {
    return 123
  }

  GetHeight() {
    return 0
  }

  SetMining(mining) {
    this.Mining = mining
  }

  GetMining() {
    return this.Mining
  }


  GetDiff() {
    return this.TestDiff
  }
}

// disabled test to prevent cpu load as jest runs automatically in Visual Code
it.skip('Mine a block', async () => {
  const TestBlockchain = new DummyBlockchain(false)
  const NewBlock = await Mining.MineBlock(TestBlockchain)
  expect(NewBlock).not.toBeNull()
  expect(Block.IsValid(NewBlock)).toBeTruthy()
})

it('Cannot mine if not sync', async () => {
  const TestBlockchain = new DummyBlockchain(true)
  const result = await Mining.MineBlock(TestBlockchain)
  expect(result).toBe(CstError.MineNotSync)
})

it.skip('Mining aborted = result is null', async () => {
  const TestBlockchain = new DummyBlockchain(false, 10)
  // abort after 50ms
  jest.useFakeTimers()
  setTimeout(() => {
    console.log('ABORT MINING')
    TestBlockchain.SetMining(false)
  }, 5000)
  //  jest.runAllTimers()
  const result = await Mining.MineBlock(TestBlockchain)
  expect(result).toBeNull()
})