export class Account {
  protected account_number: string;
  protected branch: string;
  private balance: number;

  constructor(account_number: string, branch: string) {
    this.account_number = account_number;
    this.branch = branch;
    this.balance = 0;
  }

  public deposit(value: number): void {
    this.balance += value;
  }

  public withdraw(value: number): void {
    this.balance -= value;
  }
}
