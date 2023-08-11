require('dotenv').config();
const bip39 = require("bip39");

const ETHEREUM_MNEMONIC = process.env.ETHEREUM_MNEMONIC || null;

if (!ETHEREUM_MNEMONIC) {
  console.error("Missing ETHEREUM_MNEMONIC env variable");
  return;
}

const isValid = bip39.validateMnemonic(ETHEREUM_MNEMONIC, bip39.EN);
if (!isValid) {
  console.error("Invalid mnemonic (EN wordlist)");
  return;
}

const ethWallet = require("ethereumjs-wallet");
const getEthereumXpub = () => {
  const seed = bip39.mnemonicToSeedSync(ETHEREUM_MNEMONIC);
  const xpub = ethWallet.hdkey
    .fromMasterSeed(seed)
    .derivePath("m/44'/60'/0'/0")
    .publicExtendedKey();
  return xpub;
}

console.log(getEthereumXpub());
