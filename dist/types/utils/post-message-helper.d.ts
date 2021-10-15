import { StorageAdapter } from '../adapters';
export declare class PostMessageHelper {
    private namespace;
    private adapter;
    constructor(namespace?: string);
    setAdapter(adapter: StorageAdapter): void;
}
