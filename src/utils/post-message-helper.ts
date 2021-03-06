import { IStorageMessage, StorageCommand } from './'
import { IStorageAdapter, LocalStorage } from '../adapters'
import { log, LogLevel, setLoglevel } from '../utils/log'

export class PostMessageHelper {
    // private namespace: string;

    private adapter: IStorageAdapter

    private sourceDomain: string

    constructor(sourceDomain: string, logLevel: LogLevel = LogLevel.none) {
        this.sourceDomain = sourceDomain
        setLoglevel(logLevel)
        // We'll just ass-u-me local storage for now
        this.adapter = new LocalStorage()
        void this.adapter.initialize().then(() => {
            window.addEventListener('message', this.messageHandler.bind(this))
        })
    }

    public setAdapter(adapter: IStorageAdapter): void {
        this.adapter = adapter
    }

    private sendError(
        source: MessagePort,
        command: StorageCommand,
        message: string
    ): void {
        source.postMessage(<IStorageMessage>{
            status: 'error',
            command: command,
            value: message,
        })
    }

    private messageHandler(event: MessageEvent) {
        if (event.origin.indexOf(this.sourceDomain) === -1) {
            // Received message is not from the domain we'd like to get data from. Skipping....
            return
        }

        const receivedMessage: IStorageMessage | null =
            event.data &&
            Object.prototype.hasOwnProperty.call(event.data, 'command')
                ? (event.data as IStorageMessage)
                : null
        const source: MessagePort = event.ports[0]

        if (typeof source === 'undefined' || !source) {
            // No source to return too, skipping
            return
        }

        if (null !== receivedMessage) {
            log(
                this.constructor.name + ':' + window.location.host,
                'Message received from ' +
                    this.sourceDomain +
                    ': ' +
                    StorageCommand[receivedMessage.command],
                LogLevel.debug
            )

            switch (receivedMessage.command) {
                case StorageCommand.init:
                    log(
                        this.constructor.name + ':' + window.location.host,
                        'Remote resource initialized',
                        LogLevel.debug
                    )

                    source.postMessage(<IStorageMessage>{
                        status: 'ok',
                        command: receivedMessage.command,
                    })
                    break
                case StorageCommand.getItem:
                    try {
                        void this.adapter
                            .getItem(receivedMessage.key as string)
                            .then((item: string | null) => {
                                source.postMessage(<IStorageMessage>{
                                    status: 'ok',
                                    command: receivedMessage.command,
                                    value: item,
                                })
                            })
                    } catch (e: any) {
                        this.sendError(source, receivedMessage.command, e)
                    }
                    break
                case StorageCommand.setItem:
                    try {
                        void this.adapter.setItem(
                            receivedMessage.key as string,
                            receivedMessage.value as string
                        )

                        source.postMessage(<IStorageMessage>{
                            status: 'ok',
                            command: receivedMessage.command,
                        })
                    } catch (e: any) {
                        this.sendError(source, receivedMessage.command, e)
                    }
                    break
                case StorageCommand.removeItem:
                    try {
                        void this.adapter
                            .removeItem(receivedMessage.key as string)
                            .then(() => {
                                source.postMessage(<IStorageMessage>{
                                    status: 'ok',
                                    command: receivedMessage.command,
                                })
                            })
                    } catch (e: any) {
                        this.sendError(source, receivedMessage.command, e)
                    }
                    break
                case StorageCommand.setNamespace:
                    try {
                        this.adapter.setNamespace(
                            receivedMessage.value as string
                        )

                        source.postMessage(<IStorageMessage>{
                            status: 'ok',
                            command: receivedMessage.command,
                        })
                    } catch (e: any) {
                        this.sendError(source, receivedMessage.command, e)
                    }
                    break
                case StorageCommand.clear:
                    try {
                        void this.adapter.clear()
                        source.postMessage(<IStorageMessage>{
                            status: 'ok',
                            command: receivedMessage.command,
                        })
                    } catch (e: any) {
                        this.sendError(source, receivedMessage.command, e)
                    }
                    break
                case StorageCommand.length:
                    try {
                        void this.adapter.length().then((value: number) => {
                            source.postMessage(<IStorageMessage>{
                                status: 'ok',
                                command: receivedMessage.command,
                                value: value.toString(),
                            })
                        })
                    } catch (e: any) {
                        this.sendError(source, receivedMessage.command, e)
                    }
                    break
                case StorageCommand.key:
                    try {
                        let key: number = parseInt(receivedMessage.key || '-1')

                        void this.adapter
                            .key(key)
                            .then((value: string | null) => {
                                source.postMessage(<IStorageMessage>{
                                    status: 'ok',
                                    command: receivedMessage.command,
                                    value: value,
                                })
                            })
                    } catch (e: any) {
                        this.sendError(source, receivedMessage.command, e)
                    }
                    break
                default:
                    this.sendError(
                        source,
                        receivedMessage.command,
                        'Command not found'
                    )
                    break
            }
        } else {
            this.sendError(source, StorageCommand.error, 'Empty message!')
        }
    }
}
