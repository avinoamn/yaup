export function groupFieldsMethodsMapping(method) {
    switch (method) {
        case 'array': return (a, b, field) => [].concat(a[field]).concat([b[field]]);
        case '+': return (a, b, field) => a[field] + b[field];
        case '*': return (a, b, field) => a[field] * b[field];
        case '&&': return (a, b, field) => a[field] && b[field];
        case '||': return (a, b, field) => a[field] || b[field];
        default:
            if (typeof method === 'function') return method; 
            throw new TypeError(`Expected one of the following group methods: []. Or an '(a, b, field) => any' group function.`);
    }
}