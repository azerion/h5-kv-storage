import { StorageAdapter } from '../adapters';
export declare class PostMessageHelper {
    private adapter;
    private sourceDomain;
    constructor(sourceDomain: string);
    setAdapter(adapter: StorageAdapter): void;
    private sendError;
    private messageHandler;
}
