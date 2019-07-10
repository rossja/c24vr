const path = require('path')
const fs = require('fs-extra')
const solc = require('solc')
const config = require('config')

let contractName = config.get('contract.name')
let contractsDir = config.get('contract.dir')

let contractFile = function (contractsDir, contractName) {
  return path.resolve(__dirname, contractsDir, contractName + '.sol')
}

let readContract = function (contractPath) {
  return fs.readFileSync(contractPath, 'utf8')
}

let createConfig = function (contractSource) {
  let contractConfig = {
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
  return contractConfig
}

let compileContract = function (config) {
  let jsonContract = JSON.parse(solc.compile(JSON.stringify(config)))
  return jsonContract
}

let contractSource = readContract(contractFile(contractsDir, contractName))
let contractConfig = createConfig(contractSource)
let jsonContract = compileContract(contractConfig)

let dumpContract = function (contractName) {
  for (var contract in jsonContract.contracts[contractName]) {
    // console.log(contract + ': ' + jsonContract.contracts[contractName][contract].evm.bytecode.object)
    console.log('C2: %o', jsonContract.contracts[contractName][contract])
  }
}

// dumpContract(contractName)
module.exports = jsonContract
// module.exports = jsonContract.contracts[contractName]
// module.exports = jsonContract.contracts['C2']['C2']
