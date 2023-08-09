#!/usr/bin/env node
"use strict";
require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC || null;

const bip39 = require("bip39");
if(MNEMONIC) {
  const isValid = bip39.validateMnemonic(MNEMONIC, bip39.EN);
  if(!isValid) {
    console.error("Invalid mnemonic (EN wordlist)");
    return;
  }
} else {
  console.log("No mnemonic provided, generating one...");
}

const tron = require("@tatumio/tron");
const sdk = tron.TatumTronSDK({ apiKey: '' });
const wallet = sdk.wallet.generateWallet(MNEMONIC);
wallet.then(console.log)
