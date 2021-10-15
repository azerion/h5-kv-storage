import { IStorageAdapter } from './';

export class LocalStorage implements IStorageAdapter {
    public storageAvailable: boolean = false;

    public namespace: string = 'kvs';

    constructor() {}

    public initialize(): Promise<string> {
        try {
            if (typeof localStorage === 'object') {
                localStorage.setItem('kv-storage-test', 'true');
                localStorage.removeItem('kv-storage-test');

                this.storageAvailable = true;
                return Promise.resolve('ok')
            }
        } catch (e) {}

        return Promise.reject('Unable to local your storage');
    }

    public setNamespace(namespace: string): void {

    }

    public clear(): Promise<void> {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.clear());
        } else {
            return Promise.reject("LocalStorage not available");
        }
    }

    public getItem(key: string): Promise<string | null> {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.getItem(key));
        } else {
            return Promise.reject("LocalStorage not available");
        }
    }

    public key(index: number): Promise<string | null> {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.key(index));
        } else {
            return Promise.reject("LocalStorage not available");
        }
    }

    public length(): Promise<number> {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.length);
        } else {
            return Promise.reject("LocalStorage not available");
        }
    }

    public removeItem(key: string): Promise<void> {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.removeItem(key));
        } else {
            return Promise.reject("LocalStorage not available");
        }
    }

    public setItem(key: string, value: string): Promise<void> {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.setItem(key, value));
        } else {
            return Promise.reject("LocalStorage not available");
        }
    }

}
