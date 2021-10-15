import { IStorageAdapter } from '../adapters';
export declare class PostMessageHelper {
    private adapter;
    private sourceDomain;
    constructor(sourceDomain: string);
    setAdapter(adapter: IStorageAdapter): void;
    private sendError;
    private messageHandler;
}
