# aave-indexer

An Indexer for aUSDC Aave Contract to Monitor Liquidation Parameters
Listens to previous missed events and new live events
**Events**

```
Deposit
Borrow
Repay
Withdraw
LiquidationCall
```

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js**: Version **v21.7.1**
- **npm**: Version **10.8.3**
- **PostgreSQL**: A running PostgreSQL instance for database setup

## Installation

Clone the repo:

```bash
git clone https://github.com/lovesharma95/aave-indexer.git
cd aave-indexer
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
#Server environment
NODE_ENV=dev
#Port number
PORT=3000

#Websocket configuration
WEBSOCKET_EXPECTED_PONG_BACK_DURATION=10000
WEBSOCKET_KEEP_ALIVE_CHECK_INTERVAL=30000

#Db configuration
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=

#Blockchain configuration
AUSDC_ADDRESS=
LENDING_POOL_ADDRESS=
WEBSOCKET_RPC_URL=

```

Modify the `.env` values.

## Project Structure

```
src\
 |--config\         	# Environment variables and configuration related things
 |--controllers\    	# Route controllers (controller layer)
 |--assets\         	# ABI files
 |--db\             	# Migrations, data source and entity files
 |--services\       	# Business logic
 |--repository\       	# DB layer
 |--errors\         	# Error Classes
 |--eventListener\      # websocket connection files
 |--index.ts        	# App entry point
```

## API Documentation

Get Account Information

```
GET http://localhost:3000/account?page=1&limit=10
```

Response Example:

```
{
  "data": [
    {
      "id": 1,
      "created_at": "2024-11-22T21:43:23.225Z",
      "updated_at": "2024-11-23T10:29:31.812Z",
      "created_by": "SYSTEM",
      "updated_by": "SYSTEM",
      "is_active": true,
      "is_deleted": false,
      "wallet_address": "0x06cF19e0c17FC400B20F59c3C405AB0e5f73e7ff",
      "health_factor": "1.546990754114435715",
      "total_collateral_eth": "144.210489455449614754",
      "total_debt_eth": "79.917512293684682929",
      "ltv": "0.000000000000008181"
    },
  ],
  "page": "1",
  "limit": "1",
  "total": 37
}
```
