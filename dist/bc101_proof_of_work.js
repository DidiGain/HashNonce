"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(index, prevHash, timestamp, data) {
        this.index = index;
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.data = data;
        const { nonce, hash } = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }
    calculateHash(nonce) {
        const data = this.index + this.prevHash + this.timestamp + this.data + nonce;
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex');
    }
    mine() {
        let hash;
        let nonce = 0;
        do {
            hash = this.calculateHash(++nonce);
        } while (hash.startsWith('00000') === false);
        return { nonce, hash };
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
console.log(JSON.stringify(blockchain, null, 2));
