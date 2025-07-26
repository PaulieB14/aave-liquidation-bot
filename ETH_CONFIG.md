# 🎯 Ethereum Mainnet Configuration Guide

## ✅ Your System is Configured for ETH!

### **Substreams (Already Working)**
- ✅ Network: `mainnet` (Ethereum)
- ✅ API Key: Configured
- ✅ Monitoring: Aave liquidation events
- ✅ Status: **READY TO USE**

### **Aave Indexer (Needs Configuration)**

#### **Step 1: Configure Environment Variables**
Edit `/Users/paulbarba/Desktop/aave-liquidation-bot/aave-indexer/.env`:

```env
NODE_ENV = dev
PORT = 3000
WEBSOCKET_EXPECTED_PONG_BACK_DURATION = 10000
WEBSOCKET_KEEP_ALIVE_CHECK_INTERVAL = 30000

# Database configuration
DB_HOST = localhost
DB_USER = postgres
DB_PASS = password
DB_NAME = aave_indexer

# Ethereum mainnet Aave addresses
AUSDC_ADDRESS = 0xBcca60bB61934080951369a648Fb03DF4F96263C
LENDING_POOL_ADDRESS = 0x7d2768dE32b0b80b7a3454c06BdAC94A69DDc7A9

# Get free WebSocket URL from:
# https://infura.io/ (free tier available)
# https://alchemy.com/ (free tier available)
WEBSOCKET_RPC_URL = wss://mainnet.infura.io/ws/v3/YOUR_INFURA_KEY
```

#### **Step 2: Get Free WebSocket URL**
1. Go to [Infura.io](https://infura.io/)
2. Create free account
3. Create new project
4. Copy WebSocket URL
5. Replace `YOUR_INFURA_KEY` in `.env`

#### **Step 3: Set Up Database (Optional)**
For quick testing, you can use SQLite instead of PostgreSQL.

### **Execution Bot (Ready for ETH)**
- ✅ Network: Ethereum mainnet
- ✅ Contracts: Aave V2/V3
- ✅ Status: Ready to configure

## 🚀 Quick Start for ETH

### **1. Test Substreams (Already Working)**
```bash
cd /Users/paulbarba/Desktop/aave-liquidation-bot/substreams
. ./.substreams.env && substreams run substreams.yaml map_aave_events --start-block 24000000 --stop-block 24000010
```

### **2. Configure and Test Indexer**
```bash
cd /Users/paulbarba/Desktop/aave-liquidation-bot/aave-indexer
# Edit .env with your WebSocket URL
npm run dev
```

### **3. Start Complete System**
```bash
cd /Users/paulbarba/Desktop/aave-liquidation-bot
./start-complete-system.sh
```

## 📊 What You'll Monitor on ETH

### **Aave V2 Contracts (Ethereum Mainnet)**
- **LendingPool**: `0x7d2768dE32b0b80b7a3454c06BdAC94A69DDc7A9`
- **aUSDC**: `0xBcca60bB61934080951369a648Fb03DF4F96263C`
- **aUSDT**: `0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811`
- **aDAI**: `0x028171bCA77440897B824Ca71D1c56caC55b68A3`

### **Aave V3 Contracts (Ethereum Mainnet)**
- **Pool**: `0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2`
- **PoolDataProvider**: `0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3`

## 💰 ETH Liquidation Opportunities

### **Typical Liquidation Rewards**
- **Small liquidations**: 0.1-1 ETH
- **Medium liquidations**: 1-10 ETH
- **Large liquidations**: 10+ ETH

### **Gas Costs (Ethereum)**
- **Flash loan**: ~0.01-0.05 ETH
- **Liquidation**: ~0.02-0.1 ETH
- **Total cost**: ~0.03-0.15 ETH per attempt

### **Profit Threshold**
- **Minimum profitable liquidation**: ~0.2 ETH
- **Recommended minimum**: ~0.5 ETH

## 🔧 Troubleshooting ETH Setup

### **Common Issues**

1. **WebSocket Connection Failed**
   - Check your Infura/Alchemy key
   - Verify WebSocket URL format
   - Ensure you have sufficient quota

2. **Database Connection Failed**
   - Install PostgreSQL or use SQLite
   - Check database credentials

3. **Substreams Not Connecting**
   - Verify API key in `.substreams.env`
   - Check network connectivity

### **Testing Commands**
```bash
# Test Substreams
cd substreams && . ./.substreams.env && substreams run substreams.yaml map_aave_events --start-block 24000000 --stop-block 24000010

# Test Indexer API
curl http://localhost:3000/account?page=1&limit=10

# Check all processes
ps aux | grep -E '(substreams|npm|yarn)'
```

## 🎯 Next Steps

1. **Get WebSocket URL** from Infura/Alchemy
2. **Configure Indexer** `.env` file
3. **Test both components** individually
4. **Start complete system** with `./start-complete-system.sh`
5. **Monitor for liquidation opportunities** on Ethereum mainnet 