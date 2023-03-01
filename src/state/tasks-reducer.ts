import {TasksStateType} from "../App";
import {AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";
import {v1} from "uuid";

type RemoveACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTitleACACType = ReturnType<typeof changeTitleAC>

// type AddTodolistACType = ReturnType<typeof AddTodolistAC>

type ActionType = RemoveACType | AddTaskACType
    | ChangeTaskStatusACType | ChangeTitleACACType
    | AddTodolistACType | RemoveTodolistACType
export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const todolistId = action.payload.todolistId
            return {
                ...state,
                [todolistId]: state[todolistId].filter(task => task.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            const todolistId = action.payload.todolistId
            const task = {id: '5', title: action.payload.title, isDone: false}
            return {
                ...state,
                [todolistId]: [task, ...state[todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            const todolistId = action.payload.todolistId
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === action.payload.id
                    ? {...t, isDone: action.payload.isDone}
                    : t)
            }
        }
        case "CHANGE-TITLE": {
            const todolistId = action.payload.todolistId
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === action.payload.id
                    ? {...t, title: action.payload.title}
                    : t
                )
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistId] : []
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    payload: {
        id,
        todolistId
    }
} as const)
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}
export const changeTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {
            id,
            title,
            todolistId
        }
    } as const
}
