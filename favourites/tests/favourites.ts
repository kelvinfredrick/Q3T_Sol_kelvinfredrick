import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favourites } from "../target/types/favourites";
import { assert } from "chai"

const web3 = anchor.web3;
const program = anchor.workspace.Favourites as Program<Favourites>;

describe("Favourites", async() => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const user = (provider.wallet as anchor.Wallet).payer;

  before(async () => {
    const balance = provider.connection.getBalance(user.publicKey)
    const balanceInSol = Number(balance) / web3.LAMPORTS_PER_SOL;
    const formatedBalance = new Intl.NumberFormat().format(balanceInSol);
    console.log(`balance:  ${formatedBalance} Sol`);
  });

  it("Saves user's favourites to blockchain", async() => {
    const favouriteNumber = new anchor.BN(23);
    const favouriteColor = "purple";
    const favouriteHobbies = ["skiing", "skydiving", "diving"];

    await program.methods
    .setFavourites(favouriteNumber, favouriteColor, favouriteHobbies)
    .signers([user])
    .rpc();

    const favouritePdaAndBump = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favourites"), user.publicKey.toBuffer()],
      program.programId,
    );

    const favouritesPda = favouritePdaAndBump[0];
    const dataFromPda = await program.account.favourites.fetch(favouritesPda);
    assert.equal(dataFromPda.color, favouriteColor);
    assert.equal(dataFromPda.number.toString(), favouriteNumber.toString());
    assert.deepEqual(dataFromPda.hobbies, favouriteHobbies);

  });

  it("Does'nt let people write to favourites for other user", async() => {
    const someRandomGuy = anchor.web3.Keypair.generate();
    try {
      await program.methods
      .setFavourites(new anchor.BN(23), "red", ["being a dork"])
      .signers([someRandomGuy])
      .rpc();
    }catch (err) {
      const errorMessage = (err as Error).message;
      assert.isTrue(errorMessage.includes("unknown signer"));
    }
  });


});
