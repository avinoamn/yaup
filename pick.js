/**
 * Pick properties from an Object.
 *
 * @since 0.1.0
 * @category Function
 * @param {Object} obj The Object to pick properties from.
 * @param {Array} keysToOmit The keys Array of the properties to pick.
 * @returns {Object} Returns the object with the picked properties.
 */

function pick(obj, keysToPick) {
    const keysToPickMap = keysToPick.reduce((prev, curr) => ({...prev, [curr]: true}), {});
    return Object.fromEntries(
        Object.entries(obj)
        .filter(([key]) => keysToPickMap[key])
    );
}

export default pick;