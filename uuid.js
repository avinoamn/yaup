/**
 * Creates unique id string.
 *
 * @since 0.1.0
 * @category Function
 * @returns {String} Returns the new unique id string.
 */

function uuid() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export default uuid;