import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todoListAPI} from "../api/todoList-api";

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
