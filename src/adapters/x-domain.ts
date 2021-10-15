import {IStorageAdapter} from './';
import {IStorageMessage, StorageCommand} from '../utils';

export class XDomain implements IStorageAdapter {
    public storageAvailable: boolean = false;

    private xDomainName: string = '';

    private target: WindowProxy = window.parent;

    private iframe: HTMLIFrameElement;

    constructor(xDomainName: string, iframeId?: string) {
        this.xDomainName = xDomainName;

        if (iframeId && document.querySelector(iframeId) !== null) {
            this.iframe = document.querySelector(iframeId) as HTMLIFrameElement;

            return
        }

        this.iframe = document.createElement('iframe');
    }

    public initialize(): Promise<string> {
        if (this.storageAvailable === true) {
            console.log('Adapter already initilized');
        }

        if ('complete' === this.iframe?.contentDocument?.readyState) {
        }

        return new Promise( (resolve: any) => {
            this.iframe.addEventListener("load", () => {
                console.log('loaded!');
                this.target = this.iframe.contentWindow as WindowProxy;
                resolve();
            });
        }).then(() => this.sendMessageToIframe({
            command: StorageCommand.init
        })).then((message) => {
            this.storageAvailable = true;

            return message;
        }) as Promise<string>;
    }

    public setNamespace(namespace: string): void {

    }

    public clear(): Promise<void> {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.clear
        }) as Promise<void>;
    }

    public getItem(key: string): Promise<string | null> {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.getItem,
            key: key
        }) as Promise<string | null>;
    }

    public key(index: number): Promise<string | null> {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.key,
            length: index
        }) as Promise<string | null>;
    }

    public length(): Promise<number> {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.length,
        }) as Promise<number>;
    }

    public removeItem(key: string): Promise<void> {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.removeItem,
            key: key
        }) as Promise<void>;
    }

    public setItem(key: string, value: string): Promise<void> {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.setItem,
            key: key,
            value: value
        }) as Promise<void>;
    }

    private sendMessageToIframe(message: IStorageMessage): Promise<string | number | void> {
        let returnedResult: boolean;
        if (message.command === StorageCommand.init) {
            returnedResult = false;
        }

        let messageChannel: MessageChannel = new MessageChannel();

        return new Promise((resolve: (value?: any ) => void, reject: (error?: any) => void) => {
            if (!this.storageAvailable && message.command !== StorageCommand.init) {
                reject('Messaging not enabled!');
            }

            if (message.command === StorageCommand.init) {
                //small timeout to see if stuff is enabled
                setTimeout(() => {
                    if (!returnedResult) {
                        reject('Unable to get a response in time');
                    }
                }, 1000);
            }

            messageChannel.port1.onmessage = (event: MessageEvent) => {
                let receivedMessage: IStorageMessage = (event.data && event.data.hasOwnProperty('command')) ? event.data : null;

                if (receivedMessage.status === undefined || receivedMessage.status !== 'ok') {
                    reject(receivedMessage.value);
                }

                console.log('Message received from target', StorageCommand[receivedMessage.command], event);

                switch (receivedMessage.command) {
                    case StorageCommand.setNamespace:
                        // this.namespace = receivedMessage.value + ':';
                    case StorageCommand.length:
                        resolve(receivedMessage.length);
                        break;
                    case StorageCommand.getItem:
                    case StorageCommand.key:
                        resolve(receivedMessage.value);
                        break;
                    case StorageCommand.setItem:
                    case StorageCommand.removeItem:
                    case StorageCommand.clear:
                    case StorageCommand.init:
                        resolve(receivedMessage.status);
                        break;
                    default:
                        reject(receivedMessage.value);
                        break;
                }
            };

            if (this.storageAvailable || message.command === StorageCommand.init) {
                console.log('Sending message to parent: ', message);
               this.target.postMessage(message, this.xDomainName, [messageChannel.port2]);
            }
        });
    }
}
