import { StorageAdapter } from './adapters';
export declare class KvStorage {
    private storageAdapter;
    private namespace;
    constructor(namespace?: string);
    setNamespace(namedSpace: string): void | Promise<void>;
    setAdapter(storageAdapter: StorageAdapter): void;
    get length(): Promise<number>;
    key(n: number): Promise<string | null>;
    getItem(key: string): Promise<any>;
    setItem(key: string, value: string): void | Promise<void>;
    removeItem(key: string): void | Promise<void>;
    clear(): Promise<void>;
}
