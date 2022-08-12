import { Accounts } from "./accounts.interface";
import express, { Request, Response } from "express";
import * as AccountService from "./account.service";
import { Account } from "./account.class";
import { Ca } from "./ca.class";
import { Sa } from "./sa.class";

export const accountsRouter = express.Router();

accountsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const accounts: Accounts = await AccountService.findAll();
    res.status(200).send(accounts);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

accountsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const account: Account = await AccountService.find(id);
    if (account) {
      return res.status(200).send(account);
    }
    res.status(404).send("Account not found");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

accountsRouter.post("/create", async (req: Request, res: Response) => {
  try {
    let account: Account;
    if (req.body.type == "ca") {
      account = new Ca(req.body.account_number, req.body.branch);
    } else {
      account = new Sa(req.body.account_number, req.body.branch);
    }

    const newAccount = await AccountService.create(account);

    res.status(201).json(newAccount);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

accountsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const accountUpdate: Account = req.body;

    const account: Account = await AccountService.find(id);
    if (account) {
      const updatedAccount = await AccountService.update(id, accountUpdate);
      return res.status(200).json(updatedAccount);
    }
    const newAccount = await AccountService.create(accountUpdate);
    res.status(201).json(newAccount);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

accountsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);

    const account: Account = await AccountService.find(id);
    if (account) {
      await AccountService.remove(id);

      res.sendStatus(204).send("Account deleted");
    }
    res.sendStatus(404).send("Account not found");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
