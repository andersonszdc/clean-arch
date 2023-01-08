import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";
import SQLiteAdapter from "./infra/database/SQLiteAdapter";
import TransactionDatabaseRepository from "./infra/repository/TransactionDatabaseRepository";

const connection = new SQLiteAdapter();
const transactionRepository = new TransactionDatabaseRepository(connection);
const httpSever = new ExpressAdapter();
const router = new Router(httpSever, transactionRepository);
router.init();
httpSever.listen(3000);
