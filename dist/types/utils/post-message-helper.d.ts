import { IStorageAdapter } from '../adapters';
import { LogLevel } from '../utils/log';
export declare class PostMessageHelper {
    private adapter;
    private sourceDomain;
    constructor(sourceDomain: string, logLevel?: LogLevel);
    setAdapter(adapter: IStorageAdapter): void;
    private sendError;
    private messageHandler;
}
