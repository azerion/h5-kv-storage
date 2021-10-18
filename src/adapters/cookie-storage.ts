import { IStorageAdapter } from './'

interface ICookieStore {
    [name: string]: string
}

export class CookieStorage implements IStorageAdapter {
    private reg = new RegExp('', 'g')

    public namespace = ''

    constructor() {
        void this.setNamespace('kvs')
    }

    public length(): Promise<number> {
        return Promise.resolve(
            this.getNameSpaceMatches() !== null
                ? this.getNameSpaceMatches().length
                : 0
        )
    }

    public key(n: number): Promise<string> {
        const key: string = this.getNameSpaceMatches()[n]
        const result: string | null = this.getCookiesForNameSpace()[key] || null

        return Promise.resolve(result?.toString()) as Promise<string>
    }

    public getItem(key: string): Promise<string> {
        const result: string | null = this.getCookiesForNameSpace()[key] || null

        return Promise.resolve(result?.toString()) as Promise<string>
    }

    public setItem(key: string, value: string): Promise<void> {
        document.cookie =
            encodeURIComponent(this.namespace + key) +
            '=' +
            encodeURIComponent(value) +
            '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/'

        return Promise.resolve()
    }

    public removeItem(key: string): Promise<void> {
        document.cookie =
            encodeURIComponent(this.namespace + key) +
            '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

        return Promise.resolve()
    }

    public clear(): Promise<void> {
        const cookies: ICookieStore = this.getCookiesForNameSpace()
        for (const key in cookies) {
            if (Object.prototype.hasOwnProperty.call(cookies, key)) {
                void this.removeItem(key)
            }
        }

        return Promise.resolve()
    }

    public setNamespace(namespace: string): Promise<void> {
        if (namespace) {
            this.namespace = namespace + ':'
            this.reg = new RegExp('^' + this.namespace + '[a-zA-Z0-9]*', 'g')
        }

        return Promise.resolve()
    }

    private getNameSpaceMatches(): string[] {
        const cookies: string[] = decodeURIComponent(document.cookie).split(
            '; '
        )

        return cookies.filter((val: string) => {
            const temp: RegExpMatchArray = this.reg.exec(val) || []
            return temp.length > 0 || false
        })
    }

    private getCookiesForNameSpace(): ICookieStore {
        const cookies: ICookieStore = {}
        this.getNameSpaceMatches().forEach((cookie: string) => {
            const temp: string[] = cookie.replace(this.namespace, '').split('=')
            cookies[temp[0]] = temp[1]
        })
        return cookies
    }

    public storageAvailable = false

    public initialize(): Promise<string> {
        this.storageAvailable = true
        return Promise.resolve('ok')
    }
}
