import { groupByDefaultOptions } from './consts/defaultOptions.js';
import { groupMethodsMap } from './consts/mappings.js';

/**
 * Groups an Array of objects by given keys.
 *
 * @since 0.1.0
 * @category Function
 * @param {Array} [array=[]] The Array of objects to group.
 * @param {Array} [keys=[]] The Array of keys to group by.
 * @param {Object} [options={}] The options object.
 * @param {Array} [options.fieldsToGroup=[]]
 *  Specify fields to group inside the object. When empty, it will return array of grouped objects
 *  instead of one objects with grouped fields.
 * @param {Object} [options.groupMethods={ default: 'array' }]
 *  Specify the group methods for each field in fieldsToGroup.
 *  e.g.
 *  {
 *    'default': 'array'
 *    'field1': 'sum',
 *    'field2': (prev, curr, field) => prev ? prev[field] * curr[field] : curr[field] 
 *  }
 *  When providing your own group method, use the conditional operator(a ? b : c) to determine
 *  what wil be the first value.
 * @returns {Array} Returns the grouped values Array.
 */

function groupBy(array = [], keys = [], options = {}) {
    const { fieldsToGroup, groupMethods } = { ...groupByDefaultOptions, ...options };

     function getGroupMethod(field) {
        return groupMethods[field] ?
            groupMethodsMap(groupMethods[field]) :
            groupMethodsMap(groupMethods.default)
    }

    function getKey(currValue) {
        return keys.reduce((resKey, currKey) => resKey.concat(`${currKey}:${currValue[currKey]}`), []);
    }

    function groupFields(resObj, currValue) {
        return fieldsToGroup.reduce((groupedFields, currField) => ({
            ...groupedFields,
            [currField]: getGroupMethod(currField)(resObj, currValue, currField)
        }), {});
    }

    return Object.values(array.reduce((resObj, currValue) => {
        const key = getKey(currValue);
        return {
            ...resObj,
            [key]: fieldsToGroup.length === 0 ?
                (resObj[key] ? resObj[key].concat([currValue]) : [currValue]) :
                { ...currValue, ...groupFields(resObj[key], currValue) }
        };
    }, {}));
}

export default groupBy;