import { StorageCommand } from './'

export interface IStorageMessage {
    command: StorageCommand;
    status?: string;
    key?: string;
    value?: string;
    length?: number;
}
