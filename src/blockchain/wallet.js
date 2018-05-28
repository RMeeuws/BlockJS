const Cst = require('./const')
const crypto = require('crypto')
const PrivateKeySize = require('./const').PrivateKeySize // eslint-disable-line
const Debug = require('debug')('blockjs:wallet')

const CstDocs = Cst.Db.Docs

const FindInBlockchain = (TXhash, db) =>
  new Promise((resolve, reject) => {
    const filter = { 'Block.Transactions.Hash': TXhash }
    db.FindOne(Cst.Db.Docs.Blockchain, filter)
      .catch(err => reject(err))
      .then((foundLink) => {
        const TX = foundLink.Block.Transactions.find(tx => tx.Hash === TXhash)
        return resolve(TX)
      })
  })

// this.balance should be up-to-date

// document 'OwnTransactionHashes" should be up-to-date
//  --> update when sending TX
// TODO:  update when receiving block


class Wallet {
  static Load(db) {
    return new Promise((resolve, reject) => {
      db.Find(CstDocs.Wallet, {})
        .catch(err => reject(err))
        .then((walletDb) => {
          if (walletDb.length > 1) {
            return reject(new Error('More the 1 wallet in database, cannot load'))
          }

          if (walletDb.length === 1) {
            Debug('Wallet loaded from db')
            const wallet = this.ParseFromDb(walletDb[0])
            return resolve(wallet)
          }

          if (walletDb.length === 0) {
            Debug('No wallet in database, create one now')
            const newWallet = new Wallet('New Wallet', null, 0)
            db.Add(CstDocs.Wallet, newWallet)
              .catch(err => reject(err))
              .then(() => resolve(newWallet))
          }
        })
    })
  }
  constructor(name, address, balance) {
    this.Name = name
    this.Address = address || crypto.randomBytes(PrivateKeySize).toString('hex')
    this.Balance = balance
  }

  static CheckIsWallet(check) {
    return check instanceof Wallet
  }

  static ParseFromDb(walletDb) {
    return new Wallet(
      walletDb.Name,
      walletDb.Address,
      walletDb.Balance,
    )
  }

  ChangeName(newName, db) {
    this.Name = newName
    const filter = { Address: this.Address }
    const update = { Name: newName }
    db.Update(CstDocs.Wallet, filter, update)
  }

  static SaveOwnTX(txhash, db) {
    return db.Add(CstDocs.OwnTx, { txhash })
  }

  DeltaBalanceFromTX(tx) {
    if (tx.FromAddress === this.Address) return -tx.Amount
    else if (tx.ToAddress === this.Address) return tx.Amount
    return 0
  }

  // calculate the balance based on own transactions
  // send = debit, receive = credit
  UpdateBalanceFromTxs(myTX, db) {
    myTX.forEach((tx) => {
      this.Balance += this.DeltaBalanceFromTX(tx)
    })
    // save calculated balance to Db
    const filter = { Address: this.Address }
    const update = { Balance: this.Balance }
    return db.Update(CstDocs.Wallet, filter, update)
  }

  //  calculate balance from all saved transactions
  // Warning: could be costly
  CalcBalance(db) {
    this.Balance = 0
    const myTX = []

    return new Promise((resolve, reject) => {
      const promisesFindTXs = []
      // get all TX hashes of own transactions from db
      db.Find(CstDocs.OwnTx, {})
        .then((TxHashs) => {
          // make promise(s) to get each TX based on the tx hash
          TxHashs.forEach((ownTXhashDoc) => {
            const { txhash } = ownTXhashDoc
            const findPromise =
              // create array of promises to each find the TX in the blockchain with the TX has
              FindInBlockchain(txhash, db)
                .catch(err => reject(err))
                .then((ownTX) => {
                  myTX.push(ownTX)
                  // return Wallet.SaveOwnTX(ownTX.Hash, db)
                })

            promisesFindTXs.push(findPromise)
          })
          // get all relative transactions from db
          return Promise.all(promisesFindTXs)
        })
        .then(() => this.UpdateBalanceFromTxs(myTX, db))
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }

  // check if there's a relevant transaction for this wallet
  // --> update balance and save tx in db
  IncommingBlock(block, db) {
    return new Promise((resolve, reject) => {
      const incommingTXs = this.FindIncommingTX(block)
      incommingTXs.forEach((tx) => {
        Wallet.SaveOwnTX(tx)
          .then(() => this.UpdateBalanceFromTxs(tx, db))
          .then(() => resolve('Balance updated'))
          .catch(err => reject(err))
      })
    })
  }

  FindIncommingTX(block) {
    const incommingTXs = []
    block.Transactions.forEach((tx) => {
      if (tx.ToAddress === this.Address) { incommingTXs.push(tx) }
    })
    return incommingTXs
  }
}
module.exports = Wallet