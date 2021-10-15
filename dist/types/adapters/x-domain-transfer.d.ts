import { StorageAdapter } from './';
export declare class XDomainTransfer implements StorageAdapter {
    constructor(targetDomain: string);
    clear(): Promise<void>;
    getItem(key: string): Promise<string | null>;
    key(index: number): Promise<string | null>;
    length(): Promise<number>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
}