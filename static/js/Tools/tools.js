function Quadrant(obj1 = [2], obj2 = [2]) {
    if (obj1[0] < obj2[0]) {
        if (obj1[1] < obj2[1])
            return 0;
        else
            return 3;
    }
    else {
        if (obj1[1] < obj2[1])
            return 1;
        else
            return 2;
    }
}
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
export { DistAB, MoveValue, RemoveFromArray, RandomNumber, CopyObj, Repeat, Quadrant };
//# sourceMappingURL=tools.js.map