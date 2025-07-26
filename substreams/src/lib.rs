use substreams::log;
use substreams_ethereum::pb::eth::v2 as eth;
use hex;

// Aave V2 LendingPool contract address on Ethereum mainnet
const AAVE_V2_LENDING_POOL: &str = "0x7d2768dE32b0b80b7a3454c06BdAC94A69DDc7A9";
// Aave V3 Pool contract address on Ethereum mainnet
const AAVE_V3_POOL: &str = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2";

// LiquidationCall event signature (keccak256 hash of the event signature)
const LIQUIDATION_CALL_EVENT: &str = "0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52";

#[substreams::handlers::map]
pub fn map_aave_events(block: eth::Block) -> Result<(), substreams::errors::Error> {
    log::info!("Aave Liquidation Monitor: Processing Ethereum block {}", block.number);

    for log in block.logs() {
        let address = format!("0x{}", hex::encode(log.address()));
        
        // Check if this is an Aave contract
        if address == AAVE_V2_LENDING_POOL || address == AAVE_V3_POOL {
            let topics = log.topics();
            
            // Check if this is a LiquidationCall event
            if topics.len() > 0 && hex::encode(&topics[0]) == LIQUIDATION_CALL_EVENT[2..] {
                log::info!("🚨 LIQUIDATION DETECTED on Ethereum mainnet in block {}!", block.number);
                log::info!("   Contract: {}", address);
                
                // Log additional details if available
                if topics.len() >= 4 {
                    log::info!("   User: 0x{}", hex::encode(&topics[1]));
                    log::info!("   Collateral Asset: 0x{}", hex::encode(&topics[2]));
                    log::info!("   Debt Asset: 0x{}", hex::encode(&topics[3]));
                }
                
                log::info!("   Data: 0x{}", hex::encode(log.data()));
            }
        }
    }

    Ok(())
}
