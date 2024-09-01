use anchor_lang::prelude::*;
use anchor_spl::{ associated_token::AssociatedToken, token::{ Mint, Token, TokenAccount } };

use crate::{ state::Fundraiser, ANCHOR_DISCRIMINATOR };

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
    pub campaign_mint_to_raise: Account<'info, Mint>,

    #[account(
        init,
        payer = maker,
        seeds = [b"fundraiser-grav.id", maker.key().as_ref()],
        bump,
        space = ANCHOR_DISCRIMINATOR + Fundraiser::INIT_SPACE,
    )]
    pub fundraiser : Account<'info, Fundraiser>,

    #[account(
        init,
        payer = maker,
        associated_token::mint = campaign_mint_to_raise,
        associated_token::authority = fundraiser,
    )]
    pub vault: Account<'info, TokenAccount>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
