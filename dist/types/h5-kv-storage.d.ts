import { IStorageAdapter } from './adapters';
export * from './adapters';
export declare class KvStorage {
    private storageAdapter?;
    private namespace;
    constructor(debug?: boolean);
    setNamespace(namedSpace: string): void | Promise<void>;
    setAdapter(storageAdapter: IStorageAdapter): Promise<string>;
    length(): Promise<number>;
    key(n: number): Promise<string | null>;
    getItem(key: string): Promise<any>;
    setItem(key: string, value: string): void | Promise<void>;
    removeItem(key: string): void | Promise<void>;
    clear(): Promise<void>;
}
