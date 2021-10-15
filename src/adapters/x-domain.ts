import {StorageAdapter} from './';
import {IStorageMessage, StorageCommand} from '../utils';

export class XDomain implements StorageAdapter {
    public storageEnabled: boolean = false;

    private xDomainName: string = '';

    constructor(xDomainName: string) {
        this.xDomainName = xDomainName;

        this.sendMessageToIframe({
            command: StorageCommand.init
        }).then(() => {
            this.storageEnabled = true;
        });
    }

    public clear(): Promise<void> {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.clear
        }) as Promise<void>;
    }

    public getItem(key: string): Promise<string | null> {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.getItem,
            key: key
        }) as Promise<string | null>;
    }

    public key(index: number): Promise<string | null> {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.key,
            length: index
        }) as Promise<string | null>;
    }

    public length(): Promise<number> {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.length,
        }) as Promise<number>;
    }

    public removeItem(key: string): Promise<void> {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.removeItem,
            key: key
        }) as Promise<void>;
    }

    public setItem(key: string, value: string): Promise<void> {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }

        return this.sendMessageToIframe({
            command: StorageCommand.removeItem,
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
            if (!this.storageEnabled && message.command !== StorageCommand.init) {
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
                console.log('Frame received message', event);

                let receivedMessage: IStorageMessage = (event.data && event.data.command) ? event.data : null;

                if (receivedMessage.command === StorageCommand.init) {
                    returnedResult = true;
                }

                if (receivedMessage.status === undefined || receivedMessage.status !== 'ok') {
                    reject(receivedMessage.value);
                }

                if (receivedMessage.length !== undefined) {
                    resolve(receivedMessage.length);
                }

                switch (receivedMessage.command) {
                    case StorageCommand.setNamespace:
                        // this.namespace = receivedMessage.value + ':';
                    case StorageCommand.getItem:
                    case StorageCommand.length:
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

            if (this.storageEnabled || message.command === StorageCommand.init) {
                console.log('Sending message to parent: ', message);
                window.parent.postMessage(message, this.xDomainName, [messageChannel.port2]);
            }
        });
    }
}
