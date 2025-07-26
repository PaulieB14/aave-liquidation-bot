import { AppDataSource } from "../db/dataSource";
import { Accounts } from "../db/entity/Accounts";
class AccoutRepo {
  public async create(accountData: any) {
    try {
      const account = new Accounts();
      account.health_factor = accountData.healthFactor;
      account.wallet_address = accountData.userAddress;
      account.total_collateral_eth = accountData.totalCollateralETH;
      account.total_debt_eth = accountData.totalDebtETH;
      account.ltv = accountData.ltv;

      return AppDataSource.manager.save(account);
    } catch (err) {
      console.log("error creating account in create() in AccoutService: ", err);
    }
  }

  public async update(accountData: any, account: Accounts) {
    try {
      account.health_factor = accountData.healthFactor;
      account.wallet_address = accountData.userAddress;
      account.total_collateral_eth = accountData.totalCollateralETH;
      account.total_debt_eth = accountData.totalDebtETH;
      account.ltv = accountData.ltv;

      return AppDataSource.manager.save(account);
    } catch (err) {
      console.log("error creating account in create() in AccoutService: ", err);
    }
  }

  public async get(userAddress: string) {
    try {
      return AppDataSource.getRepository(Accounts).findOneBy({
        wallet_address: userAddress,
      });
    } catch (err) {
      console.log("error creating account in create() in AccoutService: ", err);
    }
  }

  public async getAll(page: number, limit: number) {
    try {
      return AppDataSource.getRepository(Accounts).findAndCount({
        take: limit,
        skip: limit * (page - 1),
        order: {
          id: "ASC",
        },
      });
    } catch (err) {
      console.log(
        "error getting all accounts in getAll() in AccoutService: ",
        err
      );
      throw new Error("something went wrong");
    }
  }
}

export default AccoutRepo;
