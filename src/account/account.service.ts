import { Ca } from "./ca.class";
import { Sa } from "./sa.class";
import { Account } from "./account.class";
import { Accounts } from "./accounts.interface";

let accounts: Accounts = {
  1: new Ca("01", "02"),
  2: new Sa("02", "01"),
};

export const findAll = async (): Promise<Accounts> => Object.values(accounts);
export const find = async (id: number): Promise<Account> => accounts[id];
export const create = async (newAccount: Ca | Sa): Promise<Account> => {
  const id = new Date().valueOf();

  accounts[id] = newAccount;

  return accounts[id];
};

export const update = async (
  id: number,
  accountUpdate: Account
): Promise<Account | null> => {
  const account = await find(id);

  if (!account) {
    return null;
  }

  accounts[id] = accountUpdate;

  return accounts[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const account = await find(id);

  if (!account) {
    return null;
  }

  delete accounts[id];
};
