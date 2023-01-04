const CertificateIssuance = artifacts.require("CertificateIssuance")

module.exports = function (deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(CertificateIssuance)
}
