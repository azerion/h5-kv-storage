import { StorageAdapter, LocalStorage } from './adapters'
export class KvStorage {
    private storageAdapter: StorageAdapter;

    private namespace: string;

    constructor(namespace: string = 'kvs') {
        this.storageAdapter = new LocalStorage();

        this.namespace = namespace;
    }

    public setNamespace(namedSpace: string): void | Promise<void> {
        this.namespace = namedSpace;
    }

    public setAdapter(storageAdapter: StorageAdapter): void {
        this.storageAdapter = storageAdapter;
    }

    get length(): Promise<number> {
        return this.storageAdapter.length();
    }

    public key(n: number): Promise<string | null> {
        return this.storageAdapter.key(n);
    }

    public getItem(key: string): Promise<any> {
        return this.storageAdapter.getItem(this.namespace + ':' + key);
    }

    public setItem(key: string, value: string): void | Promise<void> {
        return this.storageAdapter.setItem(this.namespace + ':' + key, value);
    }

    public removeItem(key: string): void | Promise<void> {
        return this.storageAdapter.removeItem(this.namespace + ':' + key);
    }

    public async clear(): Promise<void> {
        return this.storageAdapter.clear();
    }
}
