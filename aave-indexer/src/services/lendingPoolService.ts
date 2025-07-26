import { ethers } from "ethers";
import AccoutRepo from "../repository/accountRepo";
import * as lendingPoolABI from "../assets/lendingPool.abi.json";

class LendingPoolService {
  accountRepo: AccoutRepo;
  lendingPoolContractIface = new ethers.utils.Interface(lendingPoolABI.abi);

  constructor() {
    this.accountRepo = new AccoutRepo();
  }

  public async getMissedMultiSendTransaction(
    chain: string,
    block: number,
    aUsdcAddress: string,
    lendingPoolAddress: string,
    webSocketUrl: string
  ) {
    try {
      const eventFilter = this.eventFilters(lendingPoolAddress);
      const response: any = await this.getPastEvents(
        eventFilter.lendingPool,
        lendingPoolAddress,
        block,
        webSocketUrl
      );
      const transactionHashes = [];

      for (const event of response.events) {
        try {
          let response = await this.eventHandler(
            event,
            aUsdcAddress,
            lendingPoolAddress,
            webSocketUrl
          );
          if (response) {
            transactionHashes.push(event.transactionHash);
          }
        } catch (error) {
          console.error(error);
        }
      }

      console.log(
        "Transaction hashes of missed events added: ",
        transactionHashes
      );
      console.log("Total missed events added: ", transactionHashes.length);
      console.log(
        `Events added between blocks: ${response.startBlockNumber} and ${response.endBlockNumber}`
      );

      return {
        totalReimburse: transactionHashes.length,
        transactionHashes: transactionHashes,
        startBlock: response.startBlockNumber,
        endBlock: response.endBlockNumber,
      };
    } catch (error: any) {
      console.error("getMissedMultiSendTransactions: ", error.message);
    }
  }

  private async getPastEvents(
    eventFilter: {
      address: string;
      topics: string[][];
    },
    contractAddress: string,
    startBlockNumber: number,
    webSocketUrl: string
  ) {
    try {
      const provider = new ethers.providers.WebSocketProvider(webSocketUrl);
      let contractABI = lendingPoolABI.abi;
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      const blockNo = startBlockNumber;
      if (blockNo === null) {
        console.log("Received null from db for last block number!");
        return;
      }
      // Get latest block number from network.
      const currentBlock = await provider.getBlockNumber();

      // Query all events with eventFilter between the two block numbers.
      let queriedEvents: any = [];
      if (currentBlock - blockNo <= 2000) {
        queriedEvents = await contract.queryFilter(
          eventFilter,
          blockNo,
          currentBlock
        );
      } else {
        let start = blockNo;
        let end = blockNo + 2000;
        while (start < currentBlock) {
          let events = await contract.queryFilter(eventFilter, start, end);
          start = end + 1;
          end = start + 2000 < currentBlock ? start + 2000 : currentBlock;
          queriedEvents = [...queriedEvents, ...events];
        }
      }

      return {
        events: queriedEvents,
        startBlockNumber: blockNo,
        endBlockNumber: currentBlock,
      };
    } catch (error: any) {
      console.log("getPastEvents: ", error.message);
      throw new Error(error);
    }
  }

  async eventHandler(
    event: any,
    aUsdcAddress: string,
    lendingPoolAddress: string,
    webSocketUrl: string
  ) {
    try {
      // Get the event signature from the first topic
      const eventSignature = event.topics[0];

      // Map of event signatures to their respective event names
      const eventMapping: { [signature: string]: string } = {
        [this.lendingPoolContractIface.getEventTopic("Deposit")]: "Deposit",
        [this.lendingPoolContractIface.getEventTopic("Borrow")]: "Borrow",
        [this.lendingPoolContractIface.getEventTopic("Repay")]: "Repay",
        [this.lendingPoolContractIface.getEventTopic("Withdraw")]: "Withdraw",
        [this.lendingPoolContractIface.getEventTopic("LiquidationCall")]:
          "LiquidationCall",
      };

      // Check if the event signature exists in the mapping
      const eventName = eventMapping[eventSignature];

      if (!eventName) {
        console.warn("Unknown event type received:", eventSignature);
        return null;
      }

      // Decode the event log
      const decodedEventData = this.lendingPoolContractIface.decodeEventLog(
        eventName,
        event.data,
        event.topics
      );

      // Add decoded data and event type to the event object
      event["type"] = eventName;
      event["args"] = decodedEventData;

      const provider = new ethers.providers.WebSocketProvider(webSocketUrl);

      const receipt = await provider.getTransactionReceipt(
        event.transactionHash
      );

      // Check if the receipt logs interact with the target contract address
      const interactsWithTargetContract = receipt.logs.some(
        (log) => log.address.toLowerCase() === aUsdcAddress.toLowerCase()
      );

      if (!interactsWithTargetContract) {
        // console.log(
        //   "Event does not interact with the target contract, skipping."
        // );
        return null; // Skip events that do not interact with the target contract
      }

      const contract = new ethers.Contract(
        event.address,
        lendingPoolABI.abi,
        provider
      );

      const userData = await contract.getUserAccountData(event["args"]["user"]);

      const userDecodedData = {
        userAddress: event["args"]["user"],
        totalCollateralETH: ethers.utils.formatEther(
          BigInt(userData["totalCollateralETH"]._hex)
        ),
        totalDebtETH: ethers.utils.formatEther(
          BigInt(userData["totalDebtETH"]._hex)
        ),
        availableBorrowsETH: ethers.utils.formatEther(
          BigInt(userData["availableBorrowsETH"]._hex)
        ),
        currentLiquidationThreshold: ethers.utils.formatEther(
          BigInt(userData["currentLiquidationThreshold"]._hex)
        ),
        ltv: ethers.utils.formatEther(BigInt(userData["ltv"]._hex)),
        healthFactor: ethers.utils.formatEther(
          BigInt(userData["healthFactor"]._hex)
        ),
      };

      const minHealthFactor = 1.05;
      if (parseFloat(userDecodedData.healthFactor) < minHealthFactor) {
        // notification alert
        console.log(
          `⚠️  ALERT: Account ${userDecodedData.userAddress} has a Health Factor of ${userDecodedData.healthFactor}. Immediate action required.`
        );
      }

      console.log(
        `✅  Success: Account ${userDecodedData.userAddress} has valid Health Factor. Saving Data!!!`
      );

      // DB Calls
      const account = await this.accountRepo.get(userDecodedData.userAddress);
      if (!account) {
        await this.accountRepo.create(userDecodedData);
      } else {
        await this.accountRepo.update(userDecodedData, account);
      }

      return userDecodedData;
    } catch (error: any) {
      console.error("Error in Event Handler: ", error.message);
    }
  }

  public eventFilters(contractAddress: string) {
    return {
      lendingPool: {
        address: contractAddress,
        topics: [
          [
            this.lendingPoolContractIface.getEventTopic("Deposit"),
            this.lendingPoolContractIface.getEventTopic("Borrow"),
            this.lendingPoolContractIface.getEventTopic("Repay"),
            this.lendingPoolContractIface.getEventTopic("Withdraw"),
            this.lendingPoolContractIface.getEventTopic("LiquidationCall"),
          ],
        ],
      },
    };
  }
}

export default LendingPoolService;
