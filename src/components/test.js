/* const ethers = require('ethers');
const EthersAdapter = require("@safe-global/protocol-kit")
const sapi = require("@safe-global/api-kit")
const SafeFactory = require("@safe-global/protocol-kit");
const SafeAccountConfig = require("@safe-global/protocol-kit");


const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/7uEvws3soc7TZgTUvZNoBB72fxT_IR-2");
//provider.send('eth_requestAccounts', []);
let signer = new ethers.Wallet("1b4ef2764fb0b762512aca9558a76db21db34c80b549e782e4ef8018a831dce2",provider);

try{
    const ethAdapterOwner1 = new EthersAdapter.EthersAdapter({
      ethers,
      signerOrProvider:signer
    })
    console.log(ethAdapterOwner1)
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
   // const safeService = new sapi.SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })

    const safeFactory = await SafeFactory.SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
    const safeAccountConfig = {
      owners: [
        await signer.getAddress(),
        "0xA85CCf0862131b38A898a3afE860797dCBfc08FD"
      ],
      threshold: 1,
      // ... (Optional params)
    }
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })

    const safeAddress = await safeSdkOwner1.getAddress()

    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)
  }catch(e){
    console.log(`Error is ${e}`);
  }
 */