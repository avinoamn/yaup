import CACHE from './cache.js';

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
    const cache = CACHE(options);

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }

        const value = callback(...args);
        cache.set(key, value);
        return value;
    };
}

export default memo;