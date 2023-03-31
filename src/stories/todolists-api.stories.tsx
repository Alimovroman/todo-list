import React, {useEffect, useState} from 'react'
import {tasksApi, TitleTaskType, todoListAPI} from "../api/todoList-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true // для куки
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoList()
            .then(res => {
                console.log(res)
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Yo yo yo'
        todoListAPI.postTodoList(title)
            .then(resp => {
                console.log(resp)
                setState(resp)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '15ea3e7b-88a6-477a-98d1-ee73ca359258'
        todoListAPI.deleteTodoList(todoId)
            .then(resp => {
                console.log(resp)
                setState(resp)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '167a232d-da0b-4f2f-837b-be7c9001608d'
        const title = 'Super-Man'
        todoListAPI.putTodoList(todoId, title)
            .then(resp => {
                console.log(resp)
                setState(resp)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '06ab8dbc-922e-488d-a707-58f62bdda727'
        tasksApi.getTasks(todolistId)
            .then(res => {
                setState(res)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '06ab8dbc-922e-488d-a707-58f62bdda727'
        const title = 'Task is one'
        tasksApi.postTask(todolistId, title)
            .then(res => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '06ab8dbc-922e-488d-a707-58f62bdda727'
        const taskId = '42f122ae-c251-4af2-a0da-c1fffa4d3f27'
        tasksApi.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '06ab8dbc-922e-488d-a707-58f62bdda727'
        const taskId = '4eb5dba3-accc-461f-ba5a-94dc217ce58e'
        const task: TitleTaskType = {
            title: 'Yo Yo Yo Bro',
            description: null,
            completed: true,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
        }
        tasksApi.putTask(todolistId, taskId, task)
            .then(res => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
