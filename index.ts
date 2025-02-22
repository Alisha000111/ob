import inquirer from "inquirer"
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;
    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withdrawl of $${amount} successful. Remaining balance: $${this.balance}`)
        }else{
            console.log("Insufficient balance.");
        }
    }
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1;
        }this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
}
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;
    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const accounts: BankAccount[] = [
    new BankAccount (1111, 1000),
    new BankAccount (2222, 4000),
    new BankAccount (3333, 6000)
];
const Customers: Customer[] = [
    new Customer ("Alisha","M.Irfan","Female",20,3162203334,accounts[0]),
    new Customer ("Tania","Saaim","Female",30,3332201334,accounts[1]),
    new Customer ("Asma","M.Ali","Female",40,3411023334,accounts[2])
]
async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })
        const Customer = Customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
        if(Customer){
            console.log(`Welcome, ${Customer.firstName} ${Customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit","Withdraw","Check Balance","Exit"]
            }]);
            switch (ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the ammount to deposit:"
                    })
                    Customer.account.deposit(depositAmount.amount);
                    break;
                    case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the ammount to withdraw:"
                    })
                    Customer.account.withdraw(withdrawAmount.amount);
                    break;
                    case "Check Balance":
                    Customer.account.checkBalance();
                    break;
                    case "Exit":
                        console.log("Exiting bank program...");
                        console.log ("\n Thank you for using our bank services. Have a great day!");
                        return;
            }
        }else {
            console.log("Invalid account number, Please try again.");
        }
    }while(true)
}
service()

