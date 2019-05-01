
var BigNumber = require('../../node_modules/bignumber.js');
var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var Verifier = artifacts.require("./Verifier.sol");

var proofJSON = {
    "proof":
    {
        "A": ["0x1bd5f683932f6d9eb37e703df0b7ae855bc74c3f68aa8020788ed5d11b304575", "0x2973ab804060897888f1cd241a19513321aa3f2e6fc1b038d5fbe4749c44757e"],
        "A_p": ["0x23a91bd248a890be3ade9dcaec25854316503881af06795608f6319b3b0f820b", "0x28a8c5c1b38b7084e76c807822f915176b1cb1de6aea8204ade9a744e89dd24b"],
        "B":
            [["0x25e2aceedfd6103bd7e00114528abd8f3f65786b6ffb105d488266f1004b831e", "0x2e5faa84808e2ca545a26934d361e7484aea3ab8b0c607710e2309eefc1c76c5"], ["0x2081f2181f28432f20ff0839bc9bed0f95b0bae61da3ae07feb4dc0c13165b85", "0x26af599381459c95eea699fccaf081c5b927ce965cabab5240042043fb400518"]],

        "B_p": ["0x1dd9aa4fecea15e657121cd8491171642c904fc2a30bec9fda31cc031ba64d9b", "0x24d0a5cf1201ed8df71733fe25cc0de32371837958d41444f536a42adff08010"],
        "C": ["0x86da8abff46cf38745ae3de12bbf209855f79c2c4df3f68a04a86881cbfee64", "0x2a38c5fa390ad4dee58a399465fd6250fbbcf6195c1630d025f78b6ac88bce86"],
        "C_p": ["0x2b81a89f79f58c05088babaad8bcbf35a5f29ea1ae6bc6c39ebb8315e8dca09b", "0x1d1964cebb54131743cf814184201852271dad53e520d4342139b1da431d2386"],
        "H": ["0x2fde20d574a97f953d0501453501942e8b119b3840797b78cb700ee1499a4d70", "0x21aba2876a164d61d3bacb89e306998bcba230c5389840c001180df835f6b140"],
        "K": ["0x2b647da45690731886d4d2459e881fabc06b657ede6faab07639bf21917566a1", "0x170ad3ddfbab7d23bc5f37dc80186415fa6c6f291eda2c7abbe2a5fe076ae8ad"]
    },
    "input": [4, 1]
}


var Config = async function (accounts) {

    const _owner = accounts[0];
    const _account_one = accounts[0];
    const _account_two = accounts[1];

    const proof = proofJSON['proof'];
    const input = proofJSON['input'];

    const _symbol = 'TNC'
    const _name = 'Udacity RealState Title'
    const _baseTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/'
    const _firstTokenId = 1
    const _lastTokenId = 10

    let erc721Mintable = await ERC721Mintable.new(_name, _symbol, _baseTokenURI);
    let verifier = await Verifier.new();
    let solnSquareVerifier = await SolnSquareVerifier.new(verifier.address, _name, _symbol, _baseTokenURI);



    return {
        owner: _owner,
        account_one: _account_one,
        account_two: _account_two,
        firstTokenId: _firstTokenId,
        lastTokenId: _lastTokenId,
        proof: proof,
        input: input,
        name: _name,
        symbol: _symbol,
        baseTokenURI: _baseTokenURI,
        weiMultiple: (new BigNumber(10)).pow(18),
        myToken: erc721Mintable,
        solnSquareVerifier: solnSquareVerifier,
        verifier: verifier
    }
}

module.exports = {
    Config: Config
};