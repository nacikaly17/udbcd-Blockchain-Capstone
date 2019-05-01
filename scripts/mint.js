const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK
const NUM_OF_START_TOKENID = 7
const NUM_OF_END_TOKENID = 10

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
  return
}

const NFT_ABI = [{
  "constant": false,
  "inputs": [
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "mint",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x40c10f19"
}]


async function main() {
  const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
  const web3Instance = new web3(
    provider
  )

  if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })

    // Token issued directly to the owner.
    for (var i = NUM_OF_START_TOKENID; i <= NUM_OF_END_TOKENID; i++) {
      const result = await nftContract.methods.mint(OWNER_ADDRESS, i).send(
        {
          "gas": 4712388,
          "gasPrice": 100000000000,
          from: OWNER_ADDRESS
        });
      console.log("Minted token. Transaction: " + result.transactionHash)
    }
  }
}

main()