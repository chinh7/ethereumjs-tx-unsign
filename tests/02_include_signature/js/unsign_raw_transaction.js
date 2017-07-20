#!/usr/bin/env node

// ----------------------------------------------------------------------
/*

test case:
==========
  * decode the raw transaction created in:
        https://github.com/warren-bank/ethereumjs-tx-sign/blob/master/tests/01_compare_output/js/compare_output.js
        https://github.com/warren-bank/ethereumjs-tx-sign/blob/master/tests/01_compare_output/run.log

input:
======
const txData = {
  nonce:    clean_input(1),
  gasPrice: clean_input(30000000000),
  gasLimit: clean_input('0x100000'),
  to:       clean_input('0x0000000000000000000000000000000000000000'),
  value:    clean_input(0),
  data:     clean_input('6060604052341561000c57fe5b60405160a0806102d2833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080519060200190919050505b84600060006101000a81548160ff02191690831515021790555083600060016101000a81548160ff021916908360ff1602179055508260018190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600381600019169055505b50505050505b6101e7806100eb6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806337af7327146100675780634aa2762e146100b9578063bc109174146100e7578063d2a174e51461010d578063fab261f414610137575bfe5b341561006f57fe5b610077610163565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100c157fe5b6100c9610189565b60405180826000191660001916815260200191505060405180910390f35b34156100ef57fe5b6100f761018f565b6040518082815260200191505060405180910390f35b341561011557fe5b61011d610195565b604051808215151515815260200191505060405180910390f35b341561013f57fe5b6101476101a8565b604051808260ff1660ff16815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b60015481565b600060009054906101000a900460ff1681565b600060019054906101000a900460ff16815600a165627a7a72305820ff945b9d7a6ff1e878bec54db295bb00226acfa2fb89419a3f9798c76963b1650029')
}

output:
=======
'0xf90339018506fc23ac008310000094000000000000000000000000000000000000000080b902d26060604052341561000c57fe5b60405160a0806102d2833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080519060200190919050505b84600060006101000a81548160ff02191690831515021790555083600060016101000a81548160ff021916908360ff1602179055508260018190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600381600019169055505b50505050505b6101e7806100eb6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806337af7327146100675780634aa2762e146100b9578063bc109174146100e7578063d2a174e51461010d578063fab261f414610137575bfe5b341561006f57fe5b610077610163565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100c157fe5b6100c9610189565b60405180826000191660001916815260200191505060405180910390f35b34156100ef57fe5b6100f761018f565b6040518082815260200191505060405180910390f35b341561011557fe5b61011d610195565b604051808215151515815260200191505060405180910390f35b341561013f57fe5b6101476101a8565b604051808260ff1660ff16815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b60015481565b600060009054906101000a900460ff1681565b600060019054906101000a900460ff16815600a165627a7a72305820ff945b9d7a6ff1e878bec54db295bb00226acfa2fb89419a3f9798c76963b16500291ba08aecbf204ffac9c31638c4cf508c5a83600fb755b869235aefe0708f460f8126a043b5fb3bd40cc632fa8f274e4bc5503c72a34b6349344b2d1b48b45055a3e110'

note:
=====
the output "rawData" indicates that the expected value of "signature" is:
{
  v: '0x' + Buffer.from([27]).toString('hex'),
  r: '0x' + Buffer.from([138,236,191,32,79,250,201,195,22,56,196,207,80,140,90,131,96,15,183,85,184,105,35,90,239,224,112,143,70,15,129,38]).toString('hex'),
  s: '0x' + Buffer.from([67,181,251,59,212,12,198,50,250,143,39,78,75,197,80,60,114,163,75,99,73,52,75,45,27,72,180,80,85,163,225,16]).toString('hex')
}
which evaluates to:
{
  v: '0x1b',
  r: '0x8aecbf204ffac9c31638c4cf508c5a83600fb755b869235aefe0708f460f8126',
  s: '0x43b5fb3bd40cc632fa8f274e4bc5503c72a34b6349344b2d1b48b45055a3e110'
}

*/
// ----------------------------------------------------------------------

const unsign = require('../../../index')

const rawTx = '0xf90339018506fc23ac008310000094000000000000000000000000000000000000000080b902d26060604052341561000c57fe5b60405160a0806102d2833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080519060200190919050505b84600060006101000a81548160ff02191690831515021790555083600060016101000a81548160ff021916908360ff1602179055508260018190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600381600019169055505b50505050505b6101e7806100eb6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806337af7327146100675780634aa2762e146100b9578063bc109174146100e7578063d2a174e51461010d578063fab261f414610137575bfe5b341561006f57fe5b610077610163565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100c157fe5b6100c9610189565b60405180826000191660001916815260200191505060405180910390f35b34156100ef57fe5b6100f761018f565b6040518082815260200191505060405180910390f35b341561011557fe5b61011d610195565b604051808215151515815260200191505060405180910390f35b341561013f57fe5b6101476101a8565b604051808260ff1660ff16815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b60015481565b600060009054906101000a900460ff1681565b600060019054906101000a900460ff16815600a165627a7a72305820ff945b9d7a6ff1e878bec54db295bb00226acfa2fb89419a3f9798c76963b16500291ba08aecbf204ffac9c31638c4cf508c5a83600fb755b869235aefe0708f460f8126a043b5fb3bd40cc632fa8f274e4bc5503c72a34b6349344b2d1b48b45055a3e110'

const {txData, signature} = unsign(rawTx, true, true, true)

console.log('txData:', txData, "\n")
console.log('signature:', signature, "\n")

// ----------------------------------------------------------------------
