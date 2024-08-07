import * as anchor from "@coral-xyz/anchor";
import {BN, Program} from "@coral-xyz/anchor";
import { AnchorVaultQ3 } from "../target/types/anchor_vault_q3";

describe("anchor-vault-q3", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorVaultQ3 as Program<AnchorVaultQ3>;

  const vaultState = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("state"), provider.publicKey.toBytes()], program.programId)[0];
  const vault = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("vault"), vaultState.toBytes()], program.programId)[0];


  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .initialize()
    .accountsPartial({
      vault: vault,
      state: vaultState,
      systemProgram: anchor.web3.SystemProgram.programId,
    }
    )
    .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is deposit!", async () => {
    // Add your test here.
    const tx = await program.methods
    .deposit(new BN(anchor.web3.LAMPORTS_PER_SOL))
        .accounts({user: provider.wallet.publicKey})
    .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is withdraw!", async () => {
    // Add your test here.
    const tx = await program.methods
        .withdraw(new BN(anchor.web3.LAMPORTS_PER_SOL))
        .accounts({user: provider.wallet.publicKey})
        .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Is close!", async () => {
    // Add your test here.
    const tx = await program.methods
        .close()
        .accounts({user: provider.wallet.publicKey})
        .rpc();
    console.log("Your transaction signature", tx);
  });

});