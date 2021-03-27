import { groupByDefaultOptions } from './defaultOptions.js';
import { groupFieldsMethodsMapping } from './mappings.js';

/**
 * Groups an Array of objects by given keys.
 *
 * @since 0.1.0
 * @category Function
 * @param {Array} [array=[]] The Array of objects to group.
 * @param {Array} [keys=[]] The Array of keys to group by.
 * @param {Object} [options={}] The options object.
 * @param {Array} [options.groupedFields=[]]
 *  Specify fields to group inside the object. When empty, it will return array of grouped objects
 *  instead of one objects with grouped fields.
 * @param {String|Function} [options.groupFieldsMethod='array']
 *  Specify the group method for the groupedFields.
 * @param {Object} [options.groupFieldsMethods={}]
 *  Specify the group method for each specific groupedField (will override options.groupFieldsMethod
 *  for those fields). e.g. {'field1': 'array', 'field2': '+'}
 * @returns {Array} Returns the grouped values Array.
 */

function groupBy(array = [], keys = [], options = {}) {
    const { groupedFields, groupFieldsMethod, groupFieldsMethods } = { ...groupByDefaultOptions, ...options };

     function getGroupFieldMethod(field) {
        return groupFieldsMethods[field] ?
            groupFieldsMethodsMapping(groupFieldsMethods[field]) :
            groupFieldsMethodsMapping(groupFieldsMethod)
    }

    function getKey(currValue) {
        return keys.reduce((resKey, currKey) => resKey.concat(`${currKey}:${currValue[currKey]}`), []);
    }

    function getGroupedFieldsObj(resObj, currValue) {
        return groupedFields.reduce((resGroupedFieldsObj, currField) => ({
            ...resGroupedFieldsObj,
            [currField]: resObj ?
                getGroupFieldMethod(currField)(resObj, currValue, currField) :
                currValue[currField]
        }), {});
    }

    return Object.values(array.reduce((resObj, currValue) => {
        const key = getKey(currValue);
        return {
            ...resObj,
            [key]: groupedFields.length === 0 ?
                (resObj[key] ? resObj[key].concat([currValue]) : [currValue]) :
                { ...currValue, ...getGroupedFieldsObj(resObj[key], currValue) }
        };
    }, {}));
}

export default groupBy;