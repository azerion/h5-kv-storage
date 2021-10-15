import { StorageAdapter } from './';
export declare class XDomain implements StorageAdapter {
    storageEnabled: boolean;
    private xDomainName;
    private target;
    private iframe;
    constructor(xDomainName: string, iframeId?: string);
    initialize(): Promise<string>;
    clear(): Promise<void>;
    getItem(key: string): Promise<string | null>;
    key(index: number): Promise<string | null>;
    length(): Promise<number>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    private sendMessageToIframe;
}
