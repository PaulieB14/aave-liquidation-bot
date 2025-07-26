# Aave Liquidation Bot

A comprehensive system for monitoring and executing Aave liquidation opportunities on Ethereum mainnet.

## 🚀 Quick Start

### 1. Monitor Liquidations (Working Now!)
```bash
cd substreams
. ./.substreams.env
substreams run substreams.yaml map_aave_events
```

### 2. Start Complete System
```bash
chmod +x start-complete-system.sh
./start-complete-system.sh
```

## 📁 Project Structure

```
aave-liquidation-bot/
├── substreams/           # Real-time liquidation event monitoring
├── aave-indexer/         # Position health factor tracking
├── aave-v2-liquidator/   # Execution bot (needs setup)
├── bot/                  # Additional bot implementations
├── config/               # Configuration files
├── docs/                 # Documentation
└── scripts/              # Utility scripts
```

## 🔧 Components

### 1. **Substreams Monitor** ✅ Working
- Real-time monitoring of Aave liquidation events
- Detects `LiquidationCall` events on Ethereum mainnet
- No setup required - just run and watch!

### 2. **Aave Indexer** ⚠️ Needs Database
- Tracks user positions and health factors
- Requires PostgreSQL database setup
- See `ETH_CONFIG.md` for setup instructions

### 3. **Execution Bot** ⚠️ Needs Configuration
- Executes liquidations for profit
- Requires wallet setup and contract deployment
- See `SETUP_GUIDE.md` for full instructions

## 📖 Documentation

- **`QUICK_START_ETH.md`** - Get monitoring in 5 minutes
- **`SETUP_GUIDE.md`** - Complete system setup guide
- **`ETH_CONFIG.md`** - Ethereum-specific configuration
- **`OPERATIONALIZATION_GUIDE.md`** - Production deployment guide

## 🎯 What You'll See

When monitoring is active, you'll see output like:
```
🚨 LIQUIDATION DETECTED on Ethereum mainnet in block 24000123!
   Contract: 0x7d2768dE32b0b80b7a3454c06BdAC94A69DDc7A9
   Transaction: 0x1234...
   User: 0x5678...
   Collateral Asset: 0x9abc...
   Debt Asset: 0xdef0...
```

## 💰 Profit Potential

- **Typical liquidation rewards**: 5-10% of liquidated amount
- **Gas costs**: ~$50-200 per liquidation
- **Minimum profitable liquidation**: ~$500-1000
- **Frequency**: 1-5 liquidations per day on Ethereum

## 🛠️ Requirements

- **Substreams CLI** (for monitoring)
- **Node.js** (for indexer and execution bot)
- **PostgreSQL** (for position tracking)
- **Ethereum wallet** (for execution)

## 📞 Support

- Check `docs/` folder for detailed guides
- Review `ETH_CONFIG.md` for Ethereum-specific setup
- See `OPERATIONALIZATION_GUIDE.md` for production tips

---

**Status**: Monitoring system is live and working! 🎉
