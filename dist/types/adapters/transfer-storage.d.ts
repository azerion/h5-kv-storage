import { IStorageAdapter } from './storage-adapter';
export declare class TransferStorage implements IStorageAdapter {
    private fromAdapter;
    private toAdapter;
    namespace: string;
    storageAvailable: boolean;
    constructor(fromAdapter: IStorageAdapter, toAdapter: IStorageAdapter);
    initialize(): Promise<string>;
    setNamespace(namespace: string): void;
    clear(): Promise<void>;
    getItem(key: string): Promise<string | null>;
    key(index: number): Promise<string | null>;
    length(): Promise<number>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
}
