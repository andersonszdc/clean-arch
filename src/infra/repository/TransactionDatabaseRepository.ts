import Transaction from "../../domain/entity/Transaction"
import TransactionRepository from "../../domain/repository/TransactionRepository"
import Installment from "../../domain/entity/Installments"
import Connection from "../database/Connection"

export default class TransactionDatabaseRepository implements TransactionRepository {
    constructor(readonly connection: Connection) {}

    async save(transaction: Transaction): Promise<void> {
        await this.connection.one(
            "INSERT INTO transactions (code, amount, number_installments, payment_method) VALUES (?, ?, ?, ?)",
            [transaction.code, transaction.amount, transaction.numberInstallments, transaction.paymentMethod]
        )
        for (const installment of transaction.installments) {
            await this.connection.one("INSERT INTO installments (code, number, amount) VALUES (?, ?, ?)", [
                transaction.code,
                installment.number,
                installment.amount,
            ])
        }
    }

    async get(code: string): Promise<Transaction> {
        const transactionData = await this.connection.query("SELECT * FROM transactions WHERE code = ?", code)
        const transaction = new Transaction(
            transactionData.code,
            transactionData.amount,
            transactionData.number_installments,
            transactionData.payment_method
        )
        const installmentsData = await this.connection.all("SELECT * FROM installments WHERE code = ?", code)
        for (const installmentData of installmentsData) {
            const installment = new Installment(installmentData.number, installmentData.amount)
            transaction.installments.push(installment)
        }
        return transaction
    }
}
