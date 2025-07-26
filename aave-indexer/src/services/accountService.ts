import AccoutRepo from "../repository/accountRepo";
import { BadRequestError } from "../errors/BadRequestError";

class AccountService {
  private accountRepo: AccoutRepo;

  constructor() {
    this.accountRepo = new AccoutRepo();
  }

  async getAccounts(page: any, limit: any) {
    try {
      // Convert query params to numbers
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      // Validate inputs
      if (
        isNaN(pageNumber) ||
        isNaN(limitNumber) ||
        pageNumber < 1 ||
        limitNumber < 1
      ) {
        throw new BadRequestError("Invalid page or limit values.");
      }

      return this.accountRepo.getAll(pageNumber, limitNumber);
    } catch (err) {
      if (err instanceof BadRequestError) {
        throw err;
      }

      console.log("error in getAccounts() accounts service: ", err);
      throw new Error("something went wrong");
    }
  }
}

export default AccountService;
