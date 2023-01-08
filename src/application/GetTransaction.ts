import TransactionRepository from "../domain/repository/TransactionRepository";

export default class GetTransaction {
    constructor(readonly transactionRepository: TransactionRepository) {}

    async execute(code: string): Promise<Output> {
        const transaction = await this.transactionRepository.get(code);
        return transaction;
    }
}

interface Output {
    code: string;
    amount: number;
    numberInstallments: number;
    paymentMethod: string;
    installments: Array<{ number: number; amount: number }>;
}
