export function groupingMethodsMap(method) {
    switch (method) {
        case 'array': return (a, b, field) => a ? a[field].concat([b[field]]) : [b[field]];
        case 'count': return (a, b, field) => a ? a[field] + 1 : 1;
        case 'sum': return (a, b, field) => a ? a[field] + b[field] : b[field];
        case 'mul': return (a, b, field) => a ? a[field] * b[field] : b[field];
        case 'and': return (a, b, field) => a ? a[field] && b[field] : !!b[field];
        case 'or': return (a, b, field) => a ? a[field] || b[field] : !!b[field];
        default:
            if (typeof method === 'function') return method;
            throw new TypeError(
                `Expected one of the following grouping methods: 'array', 'count', 'sum 'mul', 'and', 'or'. ` +
                `Or an '(a, b, field) => any' group function.`);
    }
}