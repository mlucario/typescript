console.log('demo generic');

function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: 'Quy', title: 'Software Engineering' }, { age: 30 });

console.log('mergeObj:  ', mergeObj);

function countAndDescripte<T>(element: T): [T, string] {
    let description = 'Got no value';
    if (element.lenght === 1) {
        description = 'Got 1 elements';
    }
}
