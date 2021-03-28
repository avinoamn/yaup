/**
 * Remove properties from an Object.
 *
 * @since 0.1.0
 * @category Function
 * @param {Object} obj The Object to omit properties from.
 * @param {Array} keysToOmit The keys Array of the properties to omit.
 * @returns {Object} Returns the object without the omitted properties.
 */

function omit(obj, keysToOmit) {
    const keysToOmitMap = keysToOmit.reduce((prev, curr) => ({...prev, [curr]: true}), {});
    return Object.fromEntries(
        Object.entries(obj)
        .filter(([key]) => !keysToOmitMap[key])
    );
}

export default omit;