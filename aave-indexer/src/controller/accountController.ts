import { BadRequestError } from "../errors/BadRequestError";
import AccountService from "../services/accountService";

export const getAccounts = async (req: any, res: any) => {
  try {
    const accountService = new AccountService();
    const [accounts, total] = await accountService.getAccounts(
      req.query.page,
      req.query.limit
    );

    res.status(200).json({
      data: accounts,
      page: req.query.page,
      limit: req.query.limit,
      total,
    });
  } catch (error: any) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ error: "Invalid page or limit values." });
    }

    console.error("[ERROR] - Failed to fetch accounts: ", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
