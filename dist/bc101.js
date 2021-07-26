"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(index, prevHash, timestamp, data) {
        this.index = index;
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        const data = this.index + this.prevHash + this.timestamp + this.data;
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex'); //converts the hash value into a hexidecimal string
    }
}
class Blockchain {
    constructor() {
        this.chain = [];
        this.chain.push(new Block(0, '0', Date.now(), 'Genses block'));
    }
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(data) {
        const block = new Block(this.latestBlock.index + 1, this.latestBlock.hash, Date.now(), data);
        this.chain.push(block);
    }
}
const blockchain = new Blockchain();
blockchain.addBlock("first block");
blockchain.addBlock("second block");
console.log(JSON.stringify(blockchain, null, 0));
