#!/usr/bin/env node
"use strict";

const args = process.argv.slice(2);
const mnemonic = args[0] || null;

const bip39 = require("bip39");
if(mnemonic) {
  const isValid = bip39.validateMnemonic(mnemonic, bip39.EN);
  if(!isValid) {
    console.error("Invalid mnemonic (EN wordlist)");
    return;
  }
}

const tron = require("@tatumio/tron");
const sdk = tron.TatumTronSDK({ apiKey: '' });
const wallet = sdk.wallet.generateWallet(mnemonic);
wallet.then(console.log)

