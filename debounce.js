import uuid from './uuid.js';
import { debounceDefaultOptions } from './defaultOptions.js';

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed. The debounced function comes with a `cancelAll` and 
 * `cancelLatest` methods to cancel delayed `func` invocations, and a `invokeAll`
 * and `invokeLatest` methods to immediately invoke them. Provide `options` to indicate
 * whether only the latest `func` should be invoked.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.applyOnlyLatest=false]
 *  Specify invoking only the latest debounced function called.
 * @returns {Function} Returns the new debounced function.
 */

function debounce(func, wait = 0, options = {}) {
    const { applyOnlyLatest } = { ...debounceDefaultOptions, ...options };
    let latestDebouncedId, debouncedFunctions = {};

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    if (typeof wait !== 'number') {
        throw new TypeError('Expected a number');
    }

    async function cancel(id) {
        clearTimeout(debouncedFunctions[id].timer);
        delete debouncedFunctions[id];
    }

    async function invoke(id) {
        if (!applyOnlyLatest || id === latestDebouncedId) {
            if (debouncedFunctions[id]) {
                const { func, thisArg, args } = debouncedFunctions[id];
                cancel(id);
                func.apply(thisArg, args);
            }
        }
    }

    function debounced(...args) {
        let currDebouncedId = uuid();
        latestDebouncedId = currDebouncedId;
        debouncedFunctions[currDebouncedId] = { func, args, thisArg: this, timer: setTimeout(() => invoke(currDebouncedId), wait) };
    }

    debounced.invokeAll = async () => Object.keys(debouncedFunctions).forEach(invoke);
    debounced.cancelAll = async () => Object.keys(debouncedFunctions).forEach(cancel);
    debounced.invokeLatest = async () => invoke(latestDebouncedId);
    debounced.cancelLatest = async () => cancel(latestDebouncedId);
    return debounced;
}

export default debounce;