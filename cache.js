import uuid from './uuid.js';
import { cacheDefaultOptions } from './consts/defaultOptions.js';

/**
 * Creates a cache. The cache comes with a 'clear', 'has', 'del', 'pop',
 * 'get' and 'set' functions.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} callback The function to memo.
 * @param {Object} [options={}] The options object.
 * @param {number} [options.maxSize=100]
 * Specify the max capacity of cache items.
 * @param {number} [options.ttl=1000*60*60]
 * Specify the ttl(in ms) of the cache items before they are deleted.
 * @returns {Function} Returns the new cache.
 */

function cache(options = {}) {
    const { maxSize, ttl } = { ...cacheDefaultOptions, ...options};
    let lastTimeoutCalled;
    const cache = new Map();

    const clear =  cache.clear;
    const has = cache.has;
    const del = cache.delete;

    function pop() {
        del(cache.keys().next().value);
        callTimeout();
    }

    function get(key) {
        const value = cache.get(key).value;
        callTimeout();
        return value;
    }

    function set(key, value) {
        callTimeout();
        if (cache.size === maxSize) pop();
        cache.set(key, { value, setTime: Date.now() });
    }

    function callTimeout() {
        lastTimeoutCalled = uuid();
        timeout(Date.now(), cache.keys(), lastTimeoutCalled);
    }

    async function timeout(now, keysIterator, uuid) {
        if (lastTimeoutCalled === uuid) {
            const key = keysIterator.next().value;
            const setTime = cache.get(key).setTime;
            if (now - ttl >= setTime) {
                del(key);
                timeout(now, keysIterator, uuid);
            }
        }
    }

    return {
        clear,
        has,
        del,
        pop,
        get,
        set
    }
}

export default cache;