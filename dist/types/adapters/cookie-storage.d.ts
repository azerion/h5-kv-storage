import { IStorageAdapter } from './';
export declare class CookieStorage implements IStorageAdapter {
    private reg;
    namespace: string;
    constructor();
    length(): Promise<number>;
    key(n: number): Promise<string>;
    getItem(key: string): Promise<string>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
    setNamespace(namespace: string): Promise<void>;
    private getNameSpaceMatches;
    private getCookiesForNameSpace;
    storageAvailable: boolean;
    initialize(): Promise<string>;
}
