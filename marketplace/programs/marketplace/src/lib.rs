use anchor_lang::prelude::*;

declare_id!("3xfCopanXnrFCrGMsoEMYVFTHuUTnRaVv9VN5NBXbeej");

#[program]
pub mod marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
