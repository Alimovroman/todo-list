
import { v1 } from 'uuid'
import { TodolistsType } from '../App'
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAc,
    removeTodolistAC,
    todolistsReducer
} from "./todolist-reducer";

let todolistId1 = v1()
let todolistId2 = v1()

const startState: Array<TodolistsType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
]

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState!.length).toBe(1)
    expect(endState![0]!.id).toBe(todolistId2)
})
test('correct todolist should be change filter', () => {

    const endState = todolistsReducer(startState, changeFilterAC(todolistId1, "active"))

    expect(endState!.length).toBe(2)
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
})
test('correct todolist should be add new todolist', () => {
    const newTodoListId = v1()
    const endState = todolistsReducer(startState, addTodolistAC('New TODO list'))

    expect(endState!.length).toBe(3)
    expect(endState[2].id).toBe(newTodoListId)

})
test('correct todolist should be change todolist title', () => {
    const endState = todolistsReducer(startState, changeTitleTodolistAc(todolistId1, 'Yo yo man'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('Yo yo man')

})