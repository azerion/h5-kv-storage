export interface IStorageAdapter {
    length(): Promise<number>;
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    key(index: number): Promise<string | null>;
    clear(): Promise<void>;
}
