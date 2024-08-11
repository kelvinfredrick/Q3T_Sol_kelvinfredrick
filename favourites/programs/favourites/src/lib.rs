use anchor_lang::prelude::*;

declare_id!("HGLdBayTFRKtGTcdSJjm2S6btqfW4TbqYdkeawK3BihN");

pub const ANCHOR_DESCRIMINATOR_SIZE: usize = 8;

#[account]
#[derive(InitSpace)]

pub struct Favourites {
    pub number: u64,

    #[max_len(50)]
    pub color: String,

    #[max_len(5, 50)]
    pub hobbies: Vec<String>
}


#[derive(Accounts)]
pub struct SetFavourites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = ANCHOR_DESCRIMINATOR_SIZE + Favourites::INIT_SPACE,
        seeds = [b"favourites", user.key().as_ref()],
        bump
    )]

    pub favourites: Account<'info, Favourites>,

    pub system_program: Program<'info, System>
}

#[program]
pub mod favourites {

    use super::*;

    pub fn set_favourites(context: Context<SetFavourites>, number: u64, color: String, hobbies: Vec<String>) -> Result<()> {
        let user_public_key = context.accounts.user.key();
        msg!("Greetings from {}", context.program_id);
        msg!("user {user_public_key}'s favourite number is {number}, favourite color is {color}",);
        msg!("User's hobbies are {:?}", hobbies);

        context.accounts.favourites.set_inner(Favourites {
            number,
            color,
            hobbies
        });
        Ok(())
    }
}