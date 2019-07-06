const path = require('path')
const fs = require('fs-extra')
const solc = require('solc')

let contractsDir = 'contracts'
let contractName = 'C2'

let contractFile = function (contractsDir, contractName) {
  return path.resolve(__dirname, contractsDir, contractName + '.sol')
}

let readContract = function (contractPath) {
  return fs.readFileSync(contractPath, 'utf8')
}

let createConfig = function (contractSource) {
  let config = {
    language: 'Solidity',
    sources: {
      C2: {
        content: contractSource
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': [ '*' ]
        }
      }
    }
  }
  return config
}

let compileContract = function (config) {
  let jsonContract = JSON.parse(solc.compile(JSON.stringify(config)))
  return jsonContract
}

let contractSource = readContract(contractFile(contractsDir, contractName))
let config = createConfig(contractSource)
let jsonContract = compileContract(config)

let dumpContract = function (contractName) {
  for (var contract in jsonContract.contracts[contractName]) {
    // console.log(contract + ': ' + jsonContract.contracts[contractName][contract].evm.bytecode.object)
    console.log('C2: %o', jsonContract.contracts[contractName][contract])
  }
}

// dumpContract(contractName)
module.exports = jsonContract.contracts[contractName]
