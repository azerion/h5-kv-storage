import { IStorageAdapter } from './adapters'
import { log, LogLevel, setLoglevel } from './utils/log'

export * from './adapters'

export class KvStorage {
  private storageAdapter?: IStorageAdapter

  private namespace = ''

  constructor(level: LogLevel = LogLevel.none) {
    setLoglevel(level)
  }

  public setNamespace(namedSpace: string): void | Promise<void> {
    this.namespace = namedSpace

    this.storageAdapter?.setNamespace(this.namespace)
  }

  public setAdapter(storageAdapter: IStorageAdapter): Promise<string> {
    this.storageAdapter = storageAdapter

    log(
      this.constructor.name,
      'addding and initializing adapter: ' + storageAdapter.constructor.name,
      LogLevel.info
    )
    return this.storageAdapter.initialize().then((status) => {
      if (status !== 'ok') {
        this.storageAdapter = undefined
        return Promise.reject('Unable to initiliaze adapter!')
      }

      this.storageAdapter?.setNamespace(this.namespace)
      return 'ok'
    })
  }

  public length(): Promise<number> {
    if (!this.storageAdapter) {
      return Promise.reject('No adapter configured!')
    }

    log(
      this.constructor.name,
      'Calling length() on storage adapter',
      LogLevel.debug
    )
    return this.storageAdapter.length()
  }

  public key(n: number): Promise<string | null> {
    if (!this.storageAdapter) {
      return Promise.reject('No adapter configured!')
    }

    log(
      this.constructor.name,
      'Calling key() on storage adapter',
      LogLevel.debug
    )
    return this.storageAdapter.key(n)
  }

  public getItem(key: string): Promise<any> {
    if (!this.storageAdapter) {
      return Promise.reject('No adapter configured!')
    }

    log(
      this.constructor.name,
      'Calling getItem() on storage adapter',
      LogLevel.debug
    )
    return this.storageAdapter.getItem(key)
  }

  public setItem(key: string, value: string): void | Promise<void> {
    if (!this.storageAdapter) {
      return Promise.reject('No adapter configured!')
    }

    log(
      this.constructor.name,
      'Calling setItem() on storage adapter',
      LogLevel.debug
    )
    return this.storageAdapter.setItem(key, value)
  }

  public removeItem(key: string): void | Promise<void> {
    if (!this.storageAdapter) {
      return Promise.reject('No adapter configured!')
    }

    log(
      this.constructor.name,
      'Calling removeItem() on storage adapter',
      LogLevel.debug
    )
    return this.storageAdapter.removeItem(key)
  }

  public async clear(): Promise<void> {
    if (!this.storageAdapter) {
      return Promise.reject('No adapter configured!')
    }

    log(
      this.constructor.name,
      'Calling clear() on storage adapter',
      LogLevel.debug
    )
    return this.storageAdapter.clear()
  }
}
