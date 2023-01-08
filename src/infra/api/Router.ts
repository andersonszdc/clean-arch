import CreateTransaction from "../../application/CreateTransaction";
import GetTransaction from "../../application/GetTransaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";
import HttpServer from "./HttpServer";

export default class Router {
    constructor(readonly httpSever: HttpServer, readonly transactionRepository: TransactionRepository) {}

    init(): void {
        this.httpSever.on(
            "post",
            "/transactions",
            async (params: any, body: any) => {
                const createTransaction = new CreateTransaction(
                    this.transactionRepository
                );
                await createTransaction.execute(body);
            }
        );

        this.httpSever.on(
            "get",
            "/transactions/:code",
            async (params: any, body: any) => {
                const getTransaction = new GetTransaction(
                    this.transactionRepository
                );
                const transaction = await getTransaction.execute(params.code);
                return transaction;
            }
        );
    }
}
