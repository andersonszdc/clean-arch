export default interface Connection {
    query: (statement: string, params: any) => Promise<any>;
    all: (statement: string, params: any) => Promise<any>;
    one: (statement: string, params: any) => Promise<any>;
    close: () => Promise<void>;
}
