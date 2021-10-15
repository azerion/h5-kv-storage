import { StorageCommand, IStorageMessage } from './'
import { StorageAdapter, LocalStorage } from '../adapters'

export class PostMessageHelper {
    private namespace: string;

    private adapter: StorageAdapter;

    constructor(namespace: string = 'kvs') {
        this.namespace = namespace;

        this.adapter = new LocalStorage();
    }

    public setAdapter(adapter: StorageAdapter): void {
        this.adapter = adapter;
    }


}
