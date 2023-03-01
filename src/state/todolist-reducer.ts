import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

type ActionType = RemoveTodolistACType
    | ReturnType<typeof changeFilterAC>
    | AddTodolistACType
    | ReturnType<typeof changeTitleTodolistAc>

export const todolistsReducer = (state: TodolistsType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(e => e.id !== action.payload.id)
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todoListId
                ? {...el, filter: action.payload.filter}
                : el)
        case "ADD-TODOLIST":
            const newTodoList: TodolistsType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return [
                ...state,
                newTodoList
            ]
        case "CHANGE-TITLE-TODOLIST":
            return state.map(el => el.id === action.payload.id
                ? {...el, title: action.payload.newTitle}
                : el
            )
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        id
    }
} as const)
export const changeFilterAC = (todoListId: string, filter: FilterValuesType) => ({
    type: 'CHANGE-FILTER',
    payload: {
        todoListId,
        filter
    }
} as const)
export const addTodolistAC = (title: string ) => ({
    type: 'ADD-TODOLIST',
    payload: {
        title,
        todolistId: v1()
    }
} as const)
export const changeTitleTodolistAc = (id: string, newTitle: string) => ({
    type: 'CHANGE-TITLE-TODOLIST',
    payload: {
        id,
        newTitle
    }
} as const)