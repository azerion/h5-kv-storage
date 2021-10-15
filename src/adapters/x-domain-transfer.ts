import { StorageAdapter } from './';

export class XDomainTransfer implements  StorageAdapter {
    constructor(targetDomain: string) {

    }
    clear(): Promise<void> {
        return Promise.resolve(undefined);
    }

    getItem(key: string): Promise<string | null> {
        return Promise.resolve('');
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

}
