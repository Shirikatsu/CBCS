# Contract Bonded Collateralized Stake (CBCS Token)
ERC721 Token Smart Contract for the Ethereum Blockchain for educational purposes.

## Deploying the contract

### Requirements

```bash
$ truffle version
Truffle v4.1.3 (core: 4.1.3)
```

```bash
$ ganache-cli --version
Ganache CLI v6.1.0 (ganache-core: 2.1.0)
```

### Procedure

Compile the contracts
```bash
truffle compile
```

Modify `truffle.js` to configure the network that you are deploying to. (Uses development network pointing at localhost:8545 by default)

```javascript
module.exports = {
    networks: {
        development: {
          host: "localhost",
          port: 8545,
          network_id: "*" // Match any network id
        }
    }
};
```

Launch a test environment (if necessary).
```bash
ganache-cli gas=0xFFFFFFFF
```

Migrate the contract
```bash
truffle migrate --network <chosen_network_name>
```

There should be output which provides the address of the deployed contract. We will need this to interact with it directly.


## Interacting with the contract

### Requirements

```bash
$ geth version
Geth
Version: 1.7.3-stable
```

### Procedure

The contract has a function called `receiveNewToken()` which receives any amount of Ether for an exchange to a new CBCS token.

Using `geth` to interact with it, we require the deployed contract address supplied after deployment and the `abi` part of the compiled json output found in `build/contracts/CBCSToken.json`.

To mint new coins to an address:

```bash
$ geth attach <hosted_node>
> var CBCSContractAddress = <deployed_address>
undefined

> var CBCSContractABI = <ABI>
undefined

> var CBCSContract = eth.contract(CBCSContractABI)
undefined

> var CBCS = CBCSContract.at(CBCSContractAddress)
undefined

> CBCS.name()
"Contract Bonded Collateralized Stake Token"

> CBCS.symbol()
"CBCS"

> CBCS.totalSupply()
0

> var txObj = { from: <account_supplying_eth>, value: <any_amount_of_eth>, gas: 500000 }
undefined

> CBCS.receiveNewToken()
<some_tx_hash>

> CBCS.totalSupply()
1
```

The account address supplying the Ether should now be the owner of a unique CBCS Token. Verify with:

```bash
> CBCS.tokensOf(<account_address>)
['0']
```

Should return an array of all the token IDs owned by the provided address.

Token IDs start at 0 and iterate upwards with unique values. If a token is burnt, it no longer exists and can be minted again.