import { IStorageAdapter, LocalStorage } from './adapters'
export * from './adapters'
export class KvStorage {
    private storageAdapter?: IStorageAdapter;

    private namespace: string = '';

    public setNamespace(namedSpace: string): void | Promise<void> {
        this.namespace = namedSpace;

        this.storageAdapter?.setNamespace(this.namespace);
    }

    public setAdapter(storageAdapter: IStorageAdapter): Promise<string> {
        this.storageAdapter = storageAdapter;

        return this.storageAdapter.initialize().then((status) => {
            console.log(status);
            if (status !== 'ok') {
                this.storageAdapter = undefined;
                return Promise.reject('Unable to initiliaze adapter!');
            }

            this.storageAdapter?.setNamespace(this.namespace);
            return 'ok'
        });
    }

    get length(): Promise<number> {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }

        return this.storageAdapter.length();
    }

    public key(n: number): Promise<string | null> {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }

        return this.storageAdapter.key(n);
    }

    public getItem(key: string): Promise<any> {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }

        return this.storageAdapter.getItem(key);
    }

    public setItem(key: string, value: string): void | Promise<void> {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }

        return this.storageAdapter.setItem(key, value);
    }

    public removeItem(key: string): void | Promise<void> {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }

        return this.storageAdapter.removeItem(key);
    }

    public async clear(): Promise<void> {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }

        return this.storageAdapter.clear();
    }
}
