import { groupByDefaultOptions } from './consts/defaultOptions.js';
import { groupingMethodsMap } from './consts/mappings.js';

/**
 * Groups an Array of objects by given keys.
 *
 * @since 0.1.0
 * @category Function
 * @param {Array<object>} [array] The Array of objects to group.
 * @param {Array<string>} [keys] The Array of keys to group by.
 * @param {object} [options={}] The options object.
 * @param {Array<string>} [options.fieldsToGroup=[]]
 *  Specify fields to group inside the object. When empty, it will return array of grouped objects
 *  instead of one objects with grouped fields.
 * @param {object} [options.groupingMethods={ default: 'array' }]
 *  Specify the group methods for each field in fieldsToGroup.
 *  e.g.
 *  {
 *    'default': 'array'
 *    'field1': 'sum',
 *    'field2': (prev, curr, field) => prev ? prev[field] * curr[field] : curr[field] 
 *  }
 *  When providing your own group method, use the conditional operator(a ? b : c) to determine
 *  what wil be the first value.
 * @returns {object} Returns the grouped values Array(or object if defined `fieldsToGroup`).
 */

function groupBy(array, keys, options = {}) {
    const { fieldsToGroup, groupingMethods } = { ...groupByDefaultOptions, ...options };
    const GroupedFieldsScript = getGroupedFieldsScript();

    function getGroupingMethod(field) {
        return (groupingMethods[field] ?
            groupingMethodsMap(groupingMethods[field]) :
            groupingMethodsMap(groupingMethods.default)).toString();
    }

    function getGroupedFieldsScript() {
        const groupedFields = fieldsToGroup
            .reduce((groupedFields, currField) => {
                const groupingMethod = getGroupingMethod(currField);
                return groupedFields.concat(`${currField}: (${groupingMethod})(resObj, currValue, '${currField}')`);
            }, []);

        return `({${groupedFields.join(', ')}})`;
    }
    
    function getGroupKey(currValue) {
        return keys.reduce((resKey, currKey) => resKey.concat([currValue[currKey]]), []);
    }

    function groupFields(resObj, currValue) {
        return eval(GroupedFieldsScript);
    }

    return array.reduce((resObj, currValue) => {
        const key = getGroupKey(currValue);
        return {
            ...resObj,
            [key]: fieldsToGroup.length === 0 ?
                (resObj[key] ? resObj[key].concat([currValue]) : [currValue]) :
                { ...currValue, ...groupFields(resObj[key], currValue) }
        };
    }, {});
}

export default groupBy;