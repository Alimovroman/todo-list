// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    // console.log(nums)
    //...здесь пишем код.
    return nums.reduce((startValue, value) => startValue + value, 0)
    // В return стоит "заглушка", чтоб typescript не ругался

}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    if (a === b && b === c) {
        return '10'
    } else if (a < b && b === c) {
        return '01'
    } else if (a === b && b > c) {
        return '01'
    } else if (a < b && b > c) {
        return '11'
    } else {
        return '00'
    }

}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    let result = number.toString().split('').reduce((acc, value) => acc + (+value), 0)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    // return .spit('').reduce((acc, value) => acc + value, 0)
    return result
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let a: number = 0
    let b: number = 0
    for (let i = 0; i < arr.length; i++) {
        i % 2 === 0
            ? a += arr[i]
            : b += arr[i]
    }
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return a > b
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return []
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    let result = 0
    const arr: number[] = []

    function getResult(result: number, N: number): number {
        if (N === 0) {
            return 0
        }
        if (N == 1) {
            return arr.push(result + 1)
        } else {
            return arr.push(result + 1 + getResult(result, N - 1));
        }
    }

    if (N === 0) {
        return 0
    }
    getResult(0, N)

    // getResult(0, N)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return arr.reduce((acc, value) => acc + value)
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    let resultArr = []
    let moneys = amountOfMoney.toString().split('')
    let thousends = +moneys.slice(0, moneys.length - 3).join().replace(/[\s.,%]/g, '')
    let hungreads = +moneys.slice(moneys.length - 3, moneys.length - 2).join().replace(/[\s.,%]/g, '')
    let tens = +moneys.slice(moneys.length - 2, moneys.length - 1).join().replace(/[\s.,%]/g, '')
    let allMonets = +moneys[moneys.length-1]
    if (amountOfMoney > 999) {
        for (let i = 0; i < thousends; i++) {
            resultArr.push(1000)
        }
    }


    let oneHudreads: number = hungreads - 5

    if(hungreads - 5 >= 0) {
        resultArr.push(500)
    }

    if (oneHudreads > 0)
        for (let i = 0; i < oneHudreads; i++) {
            resultArr.push(100)
        }

    if (tens - 5 >= 0) {
        resultArr.push(50)
    }
    let twenty: number = tens > 5 ? tens - 5 : tens

    switch (twenty) {
        case 4:
            resultArr.push(20,20)
            break
        case 3:
            resultArr.push(20,10)
            break
        case 2:
            resultArr.push(20)
            break
        case 1:
            resultArr.push(10)
            break
        default:
            break
    }
    allMonets - 5 >=0 && resultArr.push(5)
    let monets: number = allMonets > 5 ? allMonets - 5 : allMonets
    switch (monets) {
        case 4:
            resultArr.push(2,2)
            break
        case 3:
            resultArr.push(2,1)
            break
        case 2:
            resultArr.push(2)
            break
        case 1:
            resultArr.push(1)
            break
        default:
            break
    }

    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return resultArr
}