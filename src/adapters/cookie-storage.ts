import { IStorageAdapter } from './';

interface ICookieStore {
    [name: string]: string;
}

export class CookieStorage implements  IStorageAdapter {
    private reg: RegExp = new RegExp('', 'g');

    public namespace: string = '';

    constructor() {
        this.setNamespace('kvs');
    }

    public length(): Promise<number> {
        return Promise.resolve((this.getNameSpaceMatches() !== null) ? this.getNameSpaceMatches().length : 0);
    }

    public key(n: number): Promise<string> {
        let key: string = this.getNameSpaceMatches()[n];
        let result: any = this.getCookiesForNameSpace()[key] || null;

        return Promise.resolve(result);
    }

    public getItem(key: string): Promise<string> {
        let result: any = this.getCookiesForNameSpace()[key] || null;

        return Promise.resolve(result);
    }

    public setItem(key: string, value: any): Promise<void> {
        document.cookie = encodeURIComponent(this.namespace + key) + '=' + encodeURIComponent(value) + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';

        return Promise.resolve();
    }

    public removeItem(key: string): Promise<void> {
        document.cookie = encodeURIComponent(this.namespace + key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

        return Promise.resolve();
    }

    public clear(): Promise<void> {
        let cookies: ICookieStore = this.getCookiesForNameSpace();
        for (let key in cookies) {
            if (cookies.hasOwnProperty(key)) {
                this.removeItem(key);
            }
        }

        return Promise.resolve();
    }

    public setNamespace(namespace: string): Promise<void> {
        if (namespace) {
            this.namespace = namespace + ':';
            this.reg = new RegExp('^' + this.namespace + '[a-zA-Z0-9]*', 'g');
        }

        return Promise.resolve();
    }

    private getNameSpaceMatches(): string[] {
        let cookies: string[] = decodeURIComponent(document.cookie).split('; ');

        return cookies.filter((val: string) => {
            let temp: RegExpMatchArray = val.match(this.reg) || []
            return temp.length > 0 || false;
        });
    }

    private getCookiesForNameSpace(): ICookieStore {
        let cookies: ICookieStore = {};
        this.getNameSpaceMatches().forEach((cookie: string) => {
            let temp: string[] = cookie.replace(this.namespace, '').split('=');
            cookies[temp[0]] = temp[1];
        });
        return cookies;
    }

    public storageAvailable: boolean = false;

    public initialize(): Promise<string> {
        this.storageAvailable = true;
        return Promise.resolve('ok');
    }
}
