import dotenv from "dotenv";
dotenv.config();

export const config = {
  // Environment variables
  nodeEnv: process.env.NODE_ENV || "dev",
  port: parseInt(process.env.PORT!, 10) || 3000,

  // WebSocket settings
  expectedPongBackDuration:
    parseInt(process.env.WEBSOCKET_EXPECTED_PONG_BACK_DURATION!, 10) || 10000,
  keepAliveCheckInterval:
    parseInt(process.env.WEBSOCKET_KEEP_ALIVE_CHECK_INTERVAL!, 10) || 30000,

  // Database configuration
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: parseInt(process.env.DB_PORT!, 10) || 5432,
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASS || "postgres",
  dbName: process.env.DB_NAME || "aave-indexer",

  // Blockchain configuration
  aUsdcAddress:
    process.env.AUSDC_ADDRESS || "0xBcca60bB61934080951369a648Fb03DF4F96263C",
  lendingPoolAddress:
    process.env.LENDING_POOL_ADDRESS ||
    "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
  websocketRpcUrl:
    process.env.WEBSOCKET_RPC_URL || "wss://ethereum-rpc.publicnode.com",
};
