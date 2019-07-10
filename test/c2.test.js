const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const jsonContract = require('../build.js')
const config = require('config')

let contractName = config.get('contract.name')

// console.log('C2' + ': ' + jsonContract.contracts['C2']['C2'].evm.bytecode.object)

let contractAbi = jsonContract.contracts[contractName][contractName].abi
let contractByteCode = jsonContract.contracts[contractName][contractName].evm.bytecode.object

let accounts
let testContract

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // use one of the accounts to deploy the contract
  // let testContract = new web3.eth.Contract(contractAbi)
  testContract = await new web3.eth.Contract(contractAbi)
    .deploy({
      data: contractByteCode
    })
    .send({
      from: accounts[0],
      gas: '1500000',
      gasPrice: '3000000000'
    })
    .on('error', (error) => {
      console.log('Error: ' + error)
    })
    .on('transactionHash', (transactionHash) => {
      console.log('transactionHash: ' + transactionHash)
    })
    .on('receipt', (receipt) => {
      console.log('contractAddress: ' + receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', (confirmationNumber, receipt) => {
      console.log('confirmationNumber: ' + confirmationNumber)
    })
    .then((newContractInstance) => {
      console.log('newContractInstance address: ' + newContractInstance.options.address) // instance with the new contract address
    })
})

describe('C2', () => {
  it('deploys a contract', () => {
    assert.ok(testContract.options.address)
  })
})
