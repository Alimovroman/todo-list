import {
    div, isIncludes,
    mult,
    repeatString,
    returnBoolean,
    returnShortStr,
    returnUnicStr,
    salaryReducer,
    setUpperCase,
    sub,
    sum
} from "./tasks";

test('sum', () => {
    // state
    const salary: number = 800
    const n: number = 200

    //action
    const result = sum(salary, n)

    //expect
    expect(result).toBe(1000)
})
test('sub', () => {
    // state
    const salary: number = 1200
    const n: number = 200

    //action
    const result = sub(salary, n)

    //expect
    expect(result).toBe(1000)
})
test('div', () => {
    // state
    const salary: number = 1000
    const n: number = 2

    //action
    const result = div(salary, n)

    //expect
    expect(result).toBe(500)
})
test('mult', () => {
    // state
    const salary: number = 1000
    const n: number = 10

    //action
    const result = mult(salary, n)

    //expect
    expect(result).toBe(10000)
})
test('repeatString', () => {
    // state

    //action
    const result = repeatString("yo", 3, " ")
    const result2 = repeatString("yo", 3, ",")

    //expect
    expect(result).toBe("yo yo yo")
    expect(result2).toBe("yo,yo,yo")
})
test('salaryReducer', () => {
    // state

    //action
    const resultSum = salaryReducer(100, {type: 'SUM', n: 50})
    const resultSub = salaryReducer(100, {type: 'SUB', n: 50})
    const resultDiv = salaryReducer(100, {type: 'DIV', n: 50})
    const resulMult = salaryReducer(100, {type: 'MULT', n: 50})

    //expect
    expect(resultSum).toBe(150)
    expect(resultSub).toBe(50)
    expect(resultDiv).toBe(2)
    expect(resulMult).toBe(5000)
})
test('returnBoolean', () => {
    // state

    //action
    const result = returnBoolean("Incubator", "inc")
    const result2 = returnBoolean("Incubator", "yo")

    //expect
    expect(result).toBe(true)
    expect(result2).toBe(false)
})
test('returnUnicStr', () => {
    // state

    //action
    const result = returnUnicStr("Всем студентам инкубатора желаю удачи!", 10)

    //expect
    expect(result).toBe('Всем студе...')
})
test('returnShortStr', () => {
    // state

    //action
    const result = returnShortStr("Всем студентам инкубатора желаю удачи!")
    const result2 = returnShortStr("")

    //expect
    expect(result).toBe('Всем')
    expect(result2).toBe(null)
})
test('setUpperCase', () => {
    // state

    //action
    const result = setUpperCase("всем стУдентам инкуБатора Желаю удачИ!")

    //expect
    expect(result).toBe('Всем Студентам Инкубатора Желаю Удачи!')
})
test('isIncludes', () => {
    // state

    //action
    const result1 = isIncludes("Incubator", "Cut")
    const result2 = isIncludes("Incubator", "table")
    const result3 = isIncludes("Incubator", "inbba")
    const result4 = isIncludes("Incubator", "inba")
    const result5 = isIncludes("Incubator", "Incubatorrr")

    //expect
    expect(result1).toBe(true)
    expect(result2).toBe(false)
    expect(result3).toBe(true)
    expect(result4).toBe(true)
    expect(result5).toBe(true)
})
