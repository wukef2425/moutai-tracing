// src/web3.js

import Web3 from 'web3';

// 这是 Ganache HTTP 连接地址
const defaultProvider = "http://localhost:7545";

function createWeb3Instance(providerUrl = defaultProvider) {
    if (Web3.givenProvider) {
        return new Web3(Web3.givenProvider);
    } else if (providerUrl) {
        // 使用 HTTPProvider
        return new Web3(new Web3.providers.HttpProvider(providerUrl));
    } else {
        console.error("No Ethereum provider available.");
        return null;
    }
}

const web3 = createWeb3Instance();

export default web3;