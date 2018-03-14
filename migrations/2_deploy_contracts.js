var CBCSToken = artifacts.require("./CBCSToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CBCSToken);
};
