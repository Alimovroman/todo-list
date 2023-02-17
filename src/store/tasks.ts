export const sum = (salary: number, n: number) => salary + n
export const sub = (salary: number, n: number) => salary - n
export const div = (salary: number, n: number) => salary / n
export const mult = (salary: number, n: number) => salary * n
export const repeatString = (str: string, repeat: number, join: string) => {
    let arr: string[] = []
    for (let i = 0;  i < repeat; i++){
        arr.push(str)
    }
    const result = arr.join(join)
    return result
    // const result = (str + join).repeat(repeat).slice(0, length - 1)
    // return result
}

export type ActionType = {
    type: 'SUM' | 'SUB' | 'DIV' | 'MULT'
    n: number
}
export type StateType = number
export const salaryReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "SUM":
            return state + action.n
        case "SUB":
            return state - action.n
        case "DIV":
            return state / action.n
        case "MULT":
            return state * action.n
        default:
            throw new Error('Yo yo yo Warning Bro')
    }
    return state
}

export const returnBoolean = (str: string, partOfTheString: string) => {
    return str.toLowerCase().startsWith(partOfTheString.toLowerCase())
}
export const returnUnicStr = (str: string, num: number) => {
    return str.slice(0, num) + '...'
}
export const returnShortStr = (str: string) => {
    const result = str.split(' ')
        .sort((a, b) => a.length - b.length)
    return str === '' ? null : result[0]
}
export const setUpperCase = (str: string) => {
    const result = str.toLowerCase()
        .split(' ')
        .map(str => str[0].toUpperCase() + str.slice(1))
        .join(' ')
    return result
}
export const isIncludes = (str: string, partOfTheString: string) => {
    let result = []
    const arr = partOfTheString.split('')
    for (let i = 0; i< arr.length; i++) {
        result.push(str.toLowerCase().indexOf(arr[i].toLowerCase()))
    }
    return result.find((e) => e === -1) !== undefined ? false : true
    //return result.length === partOfTheString.length ? true : false
}