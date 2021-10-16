import { IStorageAdapter } from './storage-adapter';
import { XDomainStorage } from './x-domain-storage'

export class TransferStorage implements  IStorageAdapter {
    private fromAdapter: IStorageAdapter;

    private toAdapter: IStorageAdapter;

    public namespace: string = '';

    public storageAvailable: boolean = false;

    constructor(fromAdapter: IStorageAdapter, toAdapter: IStorageAdapter) {
        this.fromAdapter = fromAdapter;
        this.toAdapter = toAdapter;
    }

    public initialize(): Promise<string> {
        return this.fromAdapter.initialize().then(() => this.toAdapter.initialize());
    }

    public setNamespace(namespace: string): void {
        this.namespace = namespace;

        this.toAdapter.setNamespace(namespace);
        this.fromAdapter.setNamespace(namespace)
    }

    public clear(): Promise<void> {
        return this.fromAdapter.clear().then(() => this.toAdapter.clear());
    }

    public async getItem(key: string): Promise<string | null> {
        let item: string | null = await this.toAdapter.getItem(key);

        if (null === item) {
            item = await this.fromAdapter.getItem(key);
            await this.toAdapter.setItem(key, item || '');
        }

        return item;
    }

    public async key(index: number): Promise<string | null> {
        let item: string | null = await this.toAdapter.key(index);
        return item;
    }

    public length(): Promise<number> {
        return this.toAdapter.length();
    }

    public async removeItem(key: string): Promise<void> {
        await this.fromAdapter.removeItem(key);
        return this.toAdapter.removeItem(key);
    }

    public setItem(key: string, value: string): Promise<void> {
        return this.toAdapter.setItem(key, value);
    }
}
