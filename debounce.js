import uuid from './uuid.js';
import { debounceDefaultOptions } from './consts/defaultOptions.js';

/**
 * Creates a debounced function that delays invoking `callback` until after `wait`
 * milliseconds have elapsed. The debounced function comes with a `cancelAll` and 
 * `cancelLatest` methods to cancel delayed `callback` invocations, and a `invokeAll`
 * and `invokeLatest` methods to immediately invoke them. Provide `options` to indicate
 * whether only the latest `callback` should be invoked.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} callback The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.applyOnlyLatest=false]
 * Specify invoking only the latest debounced function called.
 * @returns {Function} Returns the new debounced function.
 */

function debounce(callback, wait = 0, options = {}) {
    const { applyOnlyLatest } = { ...debounceDefaultOptions, ...options };
    let lastDebouncedCalled, debouncedCalled = {};

    if (typeof callback !== 'function') {
        throw new TypeError('Expected a function');
    }
    if (typeof wait !== 'number') {
        throw new TypeError('Expected a number');
    }

    async function cancel(id) {
        clearTimeout(debouncedCalled[id]?.timer);
        delete debouncedCalled[id];
    }

    async function invoke(id) {
        if (debouncedCalled[id]) {
            const { args } = debouncedCalled[id];
            cancel(id);
            callback.apply(this, args);
        }
    }

    function debounced(...args) {
        const currDebounced = uuid();
        if (applyOnlyLatest) cancel(lastDebouncedCalled);
        lastDebouncedCalled = currDebounced;
        debouncedCalled[currDebounced] = { args, timer: setTimeout(() => invoke(currDebounced), wait) };
    }

    debounced.invokeAll = async () => Object.keys(debouncedCalled).forEach(invoke);
    debounced.cancelAll = async () => Object.keys(debouncedCalled).forEach(cancel);
    debounced.invokeLatest = async () => invoke(lastDebouncedCalled);
    debounced.cancelLatest = async () => cancel(lastDebouncedCalled);
    return debounced;
}

export default debounce;