use anchor_lang::error_code;

#[error_code]
pub enum MarketplaceError {
    #[msg("Name must be grater than 1 and less than 32 characters")]
    NameTooLong,
}