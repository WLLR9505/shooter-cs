function CopyObj(source) {
    return Object.assign({}, source);
}
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function RemoveFromArray(arr, forDeletion) {
    return arr = arr.filter(item => !forDeletion.includes(item));
}
function MoveValue(from, value) {
    if (value > from) {
        from = 0;
        return from;
    }
    else {
        from -= value;
        return value;
    }
}
function DistAB(A = [2], B = [2]) {
    return Math.sqrt(Math.pow((B[0] - A[0]), 2) + Math.pow((B[1] - A[1]), 2));
}
function Repeat(times, callback) {
    while (times > 0) {
        callback();
        times--;
    }
}
export { DistAB, MoveValue, RemoveFromArray, RandomNumber, CopyObj, Repeat };
//# sourceMappingURL=tools.js.map