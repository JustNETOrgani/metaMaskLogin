<template>
  <div class="home">
    <div id="loginWrapper">
      <el-row>
      <el-col :span="22">
        <el-col :span="6">
          <fieldset>
            <legend>Login</legend>
              <img alt="MetaMask Logo" src="../assets/imgs/metaMaskLogo.png">
              <el-button :loading="metaMaskLoginBtn" @click="metaMaskLogin()" type="primary" plain>Login with MetaMask</el-button>
          </fieldset>
        </el-col>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ethEnabled from '@/assets/js/web3nMetaMask'
import getHash from '@/assets/js/hashFunc'
import * as signatureGenerator from '@/assets/js/signatureHelperFunc'
import recoveredAddrFromSig from '@/assets/js/recoverSignerAddr'

export default {
  data () {
    return {
      userAddr: null,
      // Loading states
      metaMaskLoginBtn: false
    }
  },
  created () {
    if (!ethEnabled()) {
      this.$message('Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!')
    } else {
      this.loadingCertCreationgPage = false
      this.getAccount().then(accounts => {
        this.userAddr = accounts[0]
        console.log('User address: ', this.userAddr)
      })
    }
  },
  methods: {
    async getAccount () {
      var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      return accounts
    },
    metaMaskLogin () {
      console.log('Attempting MetaMask login...')
      this.metaMaskLoginBtn = true
      this.$confirm('You would be signing an arbitrary data to prove your blockchain address. There is no blockchain-related cost. Continue?', 'Reminder', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Signing in via MetaMask'
        })
        // Generate nonce
        const nonce = this.getArbitraryNumber()
        // Hash nonce before proceeding.
        getHash(nonce).then(nonceHashed => {
          // console.log('Hashed nonce: ', nonce)
          // Get signature fro user.
          signatureGenerator.signatureGen(nonceHashed, this.userAddr, (sig) => {
            const signature = sig.replace(/"/g, '') // Remove the double quotes.
            console.log('Signature of signer: ', signature)
            // Recover signer address from signature.
            const recoveredAddr = recoveredAddrFromSig(nonceHashed, signature)
            console.log('Address recovered: ', recoveredAddr)
            // recoveredAddr can be passed.
            if (this.userAddr.toLowerCase() === recoveredAddr.toLowerCase()) {
            // Proof successful.
              this.$message({
                message: 'Congrats, Proof successful.',
                type: 'success'
              })
              this.$alert('Identity verification successful via address: ' + recoveredAddr, 'Proof success', {
                confirmButtonText: 'OK',
                callback: action => {
                  this.$message({
                    type: 'info',
                    message: 'Welcome'
                  })
                }
              })
              // Redirect to user landing page.
            // this.$router.push('/userLanding')
            } else {
              this.$message.error('Sorry!, Identity proof failed.')
            }
            this.metaMaskLoginBtn = false
          }).catch(err => {
            this.metaMaskLoginBtn = false
            console.log('Error occured during signature generation', err)
          })
        }).catch(err => {
          this.metaMaskLoginBtn = false
          console.log('Error occured during hash generation', err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'MetaMask login canceled'
        })
        this.metaMaskLoginBtn = false
      })
    },
    getArbitraryNumber () {
      const max = 10000000
      const randomNum = Math.floor(Math.random() * max) // Get random number
      const creationTime = Math.round(+new Date() / 1000)// unix timestamp
      const arbNum = randomNum + '' + creationTime // Concatenate nums
      return arbNum
    }
  }
}
</script>
<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#loginWrapper{
  background-color: #ffffff;
  margin: 20% 40%;
  width: 48%;
  padding: 1rem 1.5rem;
}
legend {
 font-style: italic;
}
</style>
