/**
 * Returns whether or not we're in a non-browser environment
 * @method isServer
 * @returns {boolean}
 */
export function isServer() {
    // NOTE: this isn't the only way to determine if we're in the server environment
    return typeof window === 'undefined';
}