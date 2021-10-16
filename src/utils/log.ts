const t: number = Date.now();

export enum LogStatus {
    error,
    warn,
    info,
    debug,
    none,
}

let logLevel: LogStatus = LogStatus.none;

export function setLoglevel(level: LogStatus) {
    logLevel = level;
}

let themes: string[] = [
    'background: #c4161e; color: #fff',
    'background: #ff8c1c; color: #fff',
    'background: #ff0080; color: #fff',
    'background: #44a5ab; color: #fff'
]

/**
 * log
 * Just shows stuff in as dank as possible.
 *
 * @param {String} name
 * @param {String} message
 * @param {String} status
 * @public
 */
export function log(name: string, message: string, status: LogStatus = LogStatus.debug): void {
    if (status > logLevel) {
        return;
    }

    console.log('[' + (Date.now() - t) / 1000 + 's]' +
            '%c %c %c h5-kv-storage %c %c %c ' + name + ' ',
            'background: #278CEB', 'background:#006db6',
            'color: #fff; background: #001c4a;', 'background: #006db6',
            'background: #278CEB', themes[status],
            (typeof message !== 'undefined') ? message : '');
}
