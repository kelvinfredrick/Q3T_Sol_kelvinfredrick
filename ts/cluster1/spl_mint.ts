import {
  Keypair,
  PublicKey,
  Connection,
  Commitment,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  createMint,
} from "@solana/spl-token";
import wallet from "../wba-wallet.json";
import { create } from "domain";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection(clusterApiUrl("devnet"), commitment);

const token_decimals = 1_000_000n;

// Mint address
// const mint = new PublicKey(keypair.publicKey);

(async () => {
  try {
    const mint = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      keypair.publicKey,
      9 // We are using 9 to match the CLI decimal default exactly
    );
    console.log(mint);
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
      true,
      commitment
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);

    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair,
      100000000000
    );
    console.log(`Your mint txid: ${mintTx}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
