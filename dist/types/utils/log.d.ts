export declare enum LogLevel {
    error = 0,
    warn = 1,
    info = 2,
    debug = 3,
    none = 4
}
export declare function setLoglevel(level: LogLevel): void;
/**
 * log
 * Just shows stuff in as dank as possible.
 *
 * @param {String} name
 * @param {String} message
 * @param {String} status
 * @public
 */
export declare function log(name: string, message: string, status?: LogLevel): void;
