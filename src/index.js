/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
/* Конечно, намного легче для проверки массива было бы использовать "isArray", 
но в задании было указано извращаться без использования методов массива... ) */
    
    if (array.length == 0 || !(typeof array === 'object' && array.hasOwnProperty('length'))) {
        throw new Error('empty array');
    } 

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for (let index in array) {

        if (fn(array[index]) === false) {
            return false;
        } 
    }

    return true;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {

    if (array.length == 0 || !(typeof array === 'object' && array.hasOwnProperty('length'))) {
        throw new Error('empty array');
    } 

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for (let index in array) {

        if (fn(array[index])) {
            return true;
        }
    }

    return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {

    let badArray = [];
    
    if (typeof fn != 'function') {
        throw new Error('fn is not a function');
    }

    for (let index = 1; index < arguments.length; index++) {
        try {
            fn(arguments[index]);
        } catch (e) {
            badArray.push(arguments[index]);
        }
    }
    
    return badArray;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {

    if (typeof number != 'number') {
        throw new Error('number is not a number');
    }

    try {
        let calcMethods = {

            sum: function () {
                for (let index = 0; index < arguments.length; index++) {
                    number += arguments[index];
                }

                return number;
            },

            dif: function () {
                for (let index = 0; index < arguments.length; index++) {
                    number -= arguments[index];
                }

                return number;
            },

            div: function () {

                for (let index = 0; index < arguments.length; index++) {
                    if (arguments[index] === 0) {
                        throw new Error('division by 0');
                    } else {                    
                        number /= arguments[index];
                    }
                }

                return number;
            },

            mul: function () {

                for (let index = 0; index < arguments.length; index++) {
                    number *= arguments[index];
                }

                return number;
            }
        };

        return calcMethods;

    } catch (e) {

        return e.message;
    } 
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
