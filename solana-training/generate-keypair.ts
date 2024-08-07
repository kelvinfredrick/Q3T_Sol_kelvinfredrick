import {Keypair} from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`The public key is: ${keypair.publicKey}`);
console.log(`The secret key is: ${keypair.secretKey}`);
console.log("done");