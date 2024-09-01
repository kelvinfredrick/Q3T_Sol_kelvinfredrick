use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Fundraiser {
    pub maker: Pubkey,
    pub campaign_mint_to_raise: Pubkey,
    pub target_amount_to_raise: u64,
    pub current_fund_raised: u64,
    pub time_started_campaign: i64,
    pub campaign_duration: u8,
    pub bump: u8,
}