console.log('demo generic');
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
var mergeObj = merge({ name: 'Quy', title: 'Software Engineering' }, { age: 30 });
console.log('mergeObj:  ', mergeObj);
