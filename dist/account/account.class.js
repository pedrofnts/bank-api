"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    account_number;
    branch;
    balance;
    constructor(account_number, branch) {
        this.account_number = account_number;
        this.branch = branch;
        this.balance = 0;
    }
    deposit(value) {
        this.balance += value;
    }
    withdraw(value) {
        this.balance -= value;
    }
}
exports.Account = Account;
