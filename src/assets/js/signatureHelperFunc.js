import Web3 from 'web3'

async function signatureGen (data, accountToUse, callback) {
  // var msg = ethUtil.bufferToHex(Buffer.from(data))
  var from = accountToUse
  console.log('Sending personal sign request to MetaMask')
  var params = [data, from]
  // var method = 'personal_sign'
  window.web3 = new Web3(window.ethereum)
  window.web3.eth.personal.sign(params[0], params[1], function (err, result) {
    if (err) return console.log('Signature error: ', err)
    if (result.error) return console.log('Sorry! Error with signature result: ', result.error)
    // console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))
    callback(JSON.stringify(result))
  })
}

// On page load sample input params.
signatureGen('data', '0xec5bf0f1de02e5fc8fde5adebe12bd4239535b7d', function (sig) {
  console.log('Signature: ', sig)
})

export { signatureGen }
