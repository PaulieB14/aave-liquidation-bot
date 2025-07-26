import { ethers } from "ethers";
import { configuration as config } from "../config";
import LendingPoolService from "../services/lendingPoolService";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const expectedPongBackDuration = config.get(
  "expectedPongBackDuration"
) as number;

const keepAliveCheckInterval = config.get("keepAliveCheckInterval") as number;

async function getMissedEvents(
  lendingPoolService: LendingPoolService,
  chain: string,
  block: number,
  aUsdcAddress: string,
  lendingPoolAddress: string,
  webSocketUrl: string
) {
  try {
    console.log(`MISSED EVENT CALLED FOR ${chain}`);
    await lendingPoolService.getMissedMultiSendTransaction(
      chain,
      block,
      aUsdcAddress,
      lendingPoolAddress,
      webSocketUrl
    );
  } catch (error: any) {
    console.error("getMissedEvents :", error.message);
  }
}

async function contractEventListener(
  chain: string,
  block: number,
  aUsdcAddress: string,
  lendingPoolAddress: string,
  webSocketUrl: string
) {
  try {
    const lendingPoolService = new LendingPoolService();
    let provider = new ethers.providers.WebSocketProvider(webSocketUrl);
    let totalWebsocketDisconnects = 0;
    let pingTimeout: NodeJS.Timeout;
    let keepAliveInterval: NodeJS.Timeout;

    provider._websocket.on("open", async () => {
      // get missed events
      getMissedEvents(
        lendingPoolService,
        chain,
        block,
        aUsdcAddress,
        lendingPoolAddress,
        webSocketUrl
      );
      // Keep pinging the connection.
      keepAliveInterval = setInterval(() => {
        // Checking websocket connection status.
        provider._websocket.ping();
        // If no response within timeout limit, restart websocket.
        pingTimeout = setTimeout(() => {
          provider._websocket.terminate();
        }, expectedPongBackDuration);
      }, keepAliveCheckInterval);

      // Listen to contract events here.
      console.log(`Listening to ${chain} contract events...`);
      const eventFilter = lendingPoolService.eventFilters(lendingPoolAddress);
      provider.on(eventFilter.lendingPool, (event) => {
        lendingPoolService.eventHandler(
          event,
          aUsdcAddress,
          lendingPoolAddress,
          webSocketUrl
        );
      });
    });

    // Websocket connection closed => Clear the timeout and interval, and restart the websocket.
    provider._websocket.on("close", () => {
      console.log(
        `${chain} Websocket Disconnect No: `,
        ++totalWebsocketDisconnects
      );
      clearInterval(keepAliveInterval);
      clearTimeout(pingTimeout);
      contractEventListener(
        chain,
        block,
        aUsdcAddress,
        lendingPoolAddress,
        webSocketUrl
      );
    });

    // Pong received => Websocket is alive => Clear the pingTimeout.
    provider._websocket.on("pong", () => {
      console.log(
        `${chain} Connection is alive! Disconnects till now: `,
        totalWebsocketDisconnects
      );
      clearTimeout(pingTimeout);
    });
  } catch (error: any) {
    console.log("contractEventListener: " + error.message);
  }
}

async function checkAPIServiceIsLive() {
  await contractEventListener(
    "AAVE",
    21249632,
    config.get("aUsdcAddress") as string,
    config.get("lendingPoolAddress") as string,
    config.get("websocketRpcUrl") as string
  );
}

checkAPIServiceIsLive();
