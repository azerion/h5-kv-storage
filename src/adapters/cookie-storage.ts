import { IStorageAdapter } from './';

export class CookieStorage implements  IStorageAdapter {
    clear(): Promise<void> {
        return Promise.resolve(undefined);
    }

    getItem(key: string): Promise<string | null> {
        return Promise.resolve('undefined');
    }

    key(index: number): Promise<string | null> {
        return Promise.resolve('');
    }

    length(): Promise<number> {
        return Promise.resolve(0);
    }

    removeItem(key: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    setItem(key: string, value: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    public storageAvailable: boolean = false;

    initialize(): Promise<string> {
        return Promise.resolve('');
    }

    setNamespace(namespace: string): void {
    }

}
