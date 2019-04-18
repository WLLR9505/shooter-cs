//funções úteis

function Proximity (mainXY = [2] , obj = [], tolerance) {
    //retorna o objeto que está perto
    let objReturn = null;
    obj.forEach((o) => {
        if (DistAB(mainXY, [o.sprite.posX, o.sprite.posY]) < tolerance) {
            objReturn = o;
        }
    });
    return objReturn;
}

function Quadrant(obj1 = [2], obj2 = [2]) {
    //retorna em qual quadrante está o obj1 em relação ao obj2
    //0|1
    //3|2

    if (obj1[0] < obj2[0]) {    //esquerda
        if (obj1[1] < obj2[1])
            return 0 //cima
        else
            return 3 //baixo
    } else {    //direita
        if (obj1[1] < obj2[1])
            return 1 //cima
        else
            return 2 //baixo
    }
}

function CopyObj (source) {
    return Object.assign({}, source);
}

function RandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function RemoveFromArray(arr , forDeletion) {
    return arr = arr.filter(item => !forDeletion.includes(item));
}

function MoveValue(from, value) {
    if (value > from) { //se tenta mover um valor maior que o disponivel
        from = 0;
        return from;
    } else {
        from -= value;
        return value;
    }
}

function DistAB(A = [2], B = [2]) {
    return Math.sqrt( Math.pow( (B[0] - A[0]) , 2) + Math.pow( (B[1] - A[1]) , 2) )
}

function ClearConsoleEvery(seconds : number) {
    //limpa o console a cada x segundos
    let globalDate = new Date();
    let globalSeconds = globalDate.getSeconds();
    if (globalSeconds % seconds == 0) {
        console.clear()
    }
}

function Repeat(times : number, callback) {
    while(times > 0) {
        callback()
        times--;
    }
}

export { Proximity, DistAB, MoveValue, RemoveFromArray, RandomNumber, CopyObj, Repeat, Quadrant, ClearConsoleEvery}
