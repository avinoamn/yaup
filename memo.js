import uuid from './uuid.js';
import { memoDefaultOptions } from './defaultOptions.js';

/**
 * Creates a memoized function that caches return values with `args` as the key.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} callback The function to memo.
 * @param {Object} [options={}] The options object.
 * @param {number} [options.maxSize=100]
 * Specify the max capacity of cache items.
 * @param {number} [options.ttl=1000*60*60]
 * Specify the ttl(in ms) of the cache items before they are deleted.
 * @returns {Function} Returns the new memoized function.
 */

function memo(callback, options = {}) {
    const { maxSize, ttl } = { ...memoDefaultOptions, ...options};
    const cache = new Map();
    let currUUID = undefined;

    const getValue = key => cache.get(key).value;
    const getSetTime = key => cache.get(key).setTime;
    const set = (key, value) => cache.set(key, { value, setTime: Date.now() });
    const del = key => cache.delete(key);
    const pop = () => del(cache.keys().next().value);

    async function timeout(now, keysIterator, uuid) {
        if (currUUID === uuid) {
            const key = keysIterator.next().value;
            const setTime = getSetTime(key);
            if (now - ttl >= setTime) {
                del(key);
                timeout(now, keysIterator);
            }
        }
    }

    return function(...args) {
        currUUID = uuid();
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            const value = getValue(key);
            timeout(Date.now(), cache.keys(), currUUID);
            return value;
        }

        timeout(Date.now(), cache.keys(), currUUID);
        if (cache.size === maxSize) pop();

        const value = callback(...args);
        set(key, value);
        return value;
    };
}

export default memo;