const Moutai = artifacts.require("Moutai");

module.exports = function(deployer) {
  deployer.deploy(Moutai);
};