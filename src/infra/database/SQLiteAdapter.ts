import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'
import Connection from './Connection'

export default class SQLiteAdapter implements Connection {
    connection: Promise<Database<sqlite3.Database, sqlite3.Statement>>

    constructor() {
        this.connection = open({
            filename: './database.db',
            driver: sqlite3.Database,
        })
    }

    async query(statement: string, params: any): Promise<any> {
        return await (await this.connection).get(statement, params)
    }

    async all(statement: string, params: any): Promise<any> {
        return await (await this.connection).all(statement, params)
    }

    async one(statement: string, params: any): Promise<any> {
        return await (await this.connection).run(statement, params)
    }

    async close(): Promise<void> {
        await (await this.connection).close()
    }
}
