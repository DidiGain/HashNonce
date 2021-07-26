import * as crypto from 'crypto';

class Block {
    readonly hash: string;

    constructor (
        readonly index: number,
        readonly prevHash: string,
        readonly timestamp: number,
        readonly data: string
    ) {
        this.hash = this.calculateHash();
    }

    private calculateHash(): string {
        const data = this.index + this.prevHash + this.timestamp + this.data;
        return crypto
                    .createHash('sha256')
                    .update(data)
                    .digest('hex'); //converts the hash value into a hexidecimal string
    } 
}

class Blockchain {
    private readonly chain: Block[] = [];

    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    constructor() {
        this.chain.push(new Block(0, '0', Date.now(), 'Genses block'));
    }

    addBlock(data: string): void {
        const block = new Block(this.latestBlock.index + 1,
                                this.latestBlock.hash,
                                Date.now(),
                                data);
                                
        this.chain.push(block);
    }
}

const blockchain = new Blockchain();
blockchain.addBlock("first block");
blockchain.addBlock("second block");

console.log(JSON.stringify(blockchain, null, 2));