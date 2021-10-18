import { IStorageAdapter } from './'
import { IStorageMessage, StorageCommand } from '../utils'
import { log, LogStatus } from '../utils/log'

export class XDomainStorage implements IStorageAdapter {
  public storageAvailable = false

  private xDomainName = ''

  private target: WindowProxy = window.parent

  private iframe: HTMLIFrameElement

  constructor(xDomainName: string, iframeIdOrUrl: string) {
    this.xDomainName = xDomainName
    const isDomain: boolean =
      (/^(http|https):\/\//.exec(iframeIdOrUrl)?.length || 0) > 0 || false

    if (!isDomain && document.querySelector(iframeIdOrUrl) !== null) {
      this.iframe = document.querySelector(iframeIdOrUrl) as HTMLIFrameElement
    } else {
      this.iframe = this.createIFrame(iframeIdOrUrl)
    }
  }

  private createIFrame(url: string): HTMLIFrameElement {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('id', 'kv-strg-x-dmn')
    iframe.setAttribute('width', '0px')
    iframe.setAttribute('height', '0px')
    iframe.setAttribute(
      'style',
      'position:absolute; top: -999px; display: none'
    )
    iframe.setAttribute('src', url)
    document.body.appendChild(iframe)
    return iframe
  }

  public initialize(): Promise<string> {
    if (this.storageAvailable === true) {
      return Promise.reject('Adapter already initialized')
    }

    if (this.iframe === undefined) {
      this.storageAvailable = true

      return Promise.resolve('ok')
    }

    if ('complete' === this.iframe?.contentDocument?.readyState) {
      return new Promise(
        (resolve: (value: string | PromiseLike<string>) => void) => {
          this.iframe.addEventListener('load', () => {
            this.target = this.iframe.contentWindow as WindowProxy
            resolve('ok')
          })
        }
      )
        .then(() =>
          this.sendMessageToIframe({
            command: StorageCommand.init,
          })
        )
        .then((message) => {
          this.storageAvailable = true

          return message
        }) as Promise<string>
    }

    return Promise.reject('Unable to initialize adapter!')
  }

  public setNamespace(namespace: string): void {
    if (!this.storageAvailable) {
      return
    }

    this.sendMessageToIframe({
      command: StorageCommand.setNamespace,
      value: namespace,
    }) as Promise<void>
  }

  public clear(): Promise<void> {
    if (!this.storageAvailable) {
      return Promise.reject('XDomain storage not available')
    }

    return this.sendMessageToIframe({
      command: StorageCommand.clear,
    }) as Promise<void>
  }

  public getItem(key: string): Promise<string | null> {
    if (!this.storageAvailable) {
      return Promise.reject('XDomain storage not available')
    }

    return this.sendMessageToIframe({
      command: StorageCommand.getItem,
      key: key,
    }) as Promise<string | null>
  }

  public key(index: number): Promise<string | null> {
    if (!this.storageAvailable) {
      return Promise.reject('XDomain storage not available')
    }

    return this.sendMessageToIframe({
      command: StorageCommand.key,
      length: index,
    }) as Promise<string | null>
  }

  public length(): Promise<number> {
    if (!this.storageAvailable) {
      return Promise.reject('XDomain storage not available')
    }

    return this.sendMessageToIframe({
      command: StorageCommand.length,
    }) as Promise<number>
  }

  public removeItem(key: string): Promise<void> {
    if (!this.storageAvailable) {
      return Promise.reject('XDomain storage not available')
    }

    return this.sendMessageToIframe({
      command: StorageCommand.removeItem,
      key: key,
    }) as Promise<void>
  }

  public setItem(key: string, value: string): Promise<void> {
    if (!this.storageAvailable) {
      return Promise.reject('XDomain storage not available')
    }

    return this.sendMessageToIframe({
      command: StorageCommand.setItem,
      key: key,
      value: value,
    }) as Promise<void>
  }

  private sendMessageToIframe(
    message: IStorageMessage
  ): Promise<string | number | void> {
    let returnedResult: boolean
    if (message.command === StorageCommand.init) {
      returnedResult = false
    }

    const messageChannel: MessageChannel = new MessageChannel()

    return new Promise(
      (resolve: (value?: any) => void, reject: (error?: any) => void) => {
        if (!this.storageAvailable && message.command !== StorageCommand.init) {
          reject('Messaging not enabled!')
        }

        if (message.command === StorageCommand.init) {
          //small timeout to see if stuff is enabled
          setTimeout(() => {
            if (!returnedResult) {
              reject('Unable to get a response in time')
            }
          }, 1000)
        }

        messageChannel.port1.onmessage = (event: MessageEvent) => {
          const receivedMessage: IStorageMessage | null =
            event.data &&
            Object.prototype.hasOwnProperty.call(event.data, 'command')
              ? (event.data as IStorageMessage)
              : null

          if (
            receivedMessage === null ||
            receivedMessage.status === undefined ||
            receivedMessage.status !== 'ok'
          ) {
            return reject('Wrong data!')
          }
          log(
            this.constructor.name,
            'Message received from ' +
              this.xDomainName +
              ': ' +
              StorageCommand[receivedMessage.command],
            LogStatus.debug
          )

          switch (receivedMessage.command) {
            case StorageCommand.length:
              resolve(receivedMessage.length)
              break
            case StorageCommand.getItem:
            case StorageCommand.key:
              resolve(receivedMessage.value)
              break
            case StorageCommand.setItem:
            case StorageCommand.removeItem:
            case StorageCommand.clear:
            case StorageCommand.init:
            case StorageCommand.setNamespace:
              resolve(receivedMessage.status)
              break
            default:
              reject(receivedMessage.value)
              break
          }
        }

        if (this.storageAvailable || message.command === StorageCommand.init) {
          log(
            this.constructor.name,
            'Sending message to ' +
              this.xDomainName +
              ': ' +
              StorageCommand[message.command],
            LogStatus.debug
          )
          this.target.postMessage(message, this.xDomainName, [
            messageChannel.port2,
          ])
        }
      }
    ) as Promise<string | number | void>
  }
}
