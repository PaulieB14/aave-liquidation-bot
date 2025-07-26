# 🚀 Complete Aave Liquidation System Setup Guide

## 📋 Overview

This guide will help you set up a complete liquidation monitoring and execution system with three components:

1. **Substreams** - Real-time liquidation event detection
2. **Aave Indexer** - Position monitoring and health factor tracking
3. **Execution Bot** - Liquidation execution (when ready)

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Substreams     │    │   Aave Indexer    │    │  Execution Bot  │
│                  │    │                  │    │                 │
│ • Event Detection│    │ • Position       │    │ • Flash Loans   │
│ • Real-time      │    │   Monitoring     │    │ • Liquidation   │
│   monitoring     │    │ • Health Factor  │    │   Execution     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────┬───────────┴───────────┬───────────┘
                     │                       │
         ┌─────────────────────────────────────────────┐
         │         Complete Liquidation System         │
         │                                             │
         │ • Monitor → Detect → Execute → Profit       │
         └─────────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Start the Complete System
```bash
cd /Users/paulbarba/Desktop/aave-liquidation-bot
./start-complete-system.sh
```

### 2. Monitor Individual Components
```bash
# Check Substreams
cd substreams
. ./.substreams.env && substreams run substreams.yaml map_aave_events

# Check Indexer
cd aave-indexer
npm run dev

# Check Execution Bot (when ready)
cd aave-v2-liquidator
yarn start
```

## ⚙️ Configuration

### Substreams Configuration
- ✅ Already configured and working
- ✅ API key: `0fda4137469543cc496b3412f26e1560`
- ✅ Network: Ethereum mainnet
- ✅ Monitoring: Liquidation events

### Aave Indexer Configuration
```bash
cd aave-indexer
cp .env.example .env
```

Edit `.env` with:
```env
NODE_ENV = dev
PORT = 3000
DB_HOST = localhost
DB_USER = postgres
DB_PASS = password
DB_NAME = aave_indexer
AUSDC_ADDRESS = 0xBcca60bB61934080951369a648Fb03DF4F96263C
LENDING_POOL_ADDRESS = 0x7d2768dE32b0b80b7a3454c06BdAC94A69DDc7A9
WEBSOCKET_RPC_URL = wss://mainnet.infura.io/ws/v3/YOUR_INFURA_KEY
```

### Execution Bot Configuration
```bash
cd aave-v2-liquidator
# Configure environment variables
# Deploy smart contracts
# Set up wallet and private keys
```

## 📊 Monitoring Dashboard

### Substreams Output
- Real-time liquidation event detection
- Block-level monitoring
- Transaction details

### Indexer API
```bash
# Get account information
curl http://localhost:3000/account?page=1&limit=10

# Response includes:
# - Health factors
# - Position data
# - Liquidation risk
```

### Execution Bot
- Flash loan execution
- Liquidation transactions
- Profit tracking

## 🔧 Troubleshooting

### Common Issues

1. **Substreams not connecting**
   - Check API key in `.substreams.env`
   - Verify network connectivity

2. **Indexer not starting**
   - Check database connection
   - Verify environment variables

3. **Execution bot build issues**
   - Install dependencies: `yarn install`
   - Check Node.js version: `node --version`

### Logs and Debugging
```bash
# Check all running processes
ps aux | grep -E '(substreams|npm|yarn)'

# Stop all processes
pkill -f 'substreams run'
pkill -f 'npm run dev'
pkill -f 'yarn start'
```

## 🎯 Next Steps

1. **Configure Database** for Aave Indexer
2. **Set up Infura/Alchemy** for WebSocket connection
3. **Deploy Smart Contracts** for execution bot
4. **Configure Private Keys** for execution
5. **Test Complete System** end-to-end

## 📈 Profit Potential

- **Monitoring Only**: $0 (but valuable data)
- **With Execution**: $100-$1000+ per successful liquidation
- **Complete System**: Maximum profit potential

## 🔗 Useful Links

- [Substreams Documentation](https://docs.substreams.dev/)
- [Aave Protocol](https://aave.com/)
- [Flash Loans Guide](https://docs.aave.com/developers/guides/flash-loans) 