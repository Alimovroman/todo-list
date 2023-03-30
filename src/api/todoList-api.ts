import axios from "axios";

const settings = {
    withCredentials: true // для куки
}
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "ffdb5a84-7670-48ab-a1c2-5437e028d270"
    }
})
export const todoListAPI = {
    getTodoList() {
        return instance.get<TodoListType>(`todo-lists`)
            .then(res => res.data)
    },
    postTodoList(title: string) {
        return instance.post<ResponseType<{item: TodoListType}>>(`todo-lists`, {title})
            .then(res => res.data)
    },
    deleteTodoList(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
            .then(res => res.data)
    },
    putTodoList(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
            .then(res => res.data)
    }
}

type TodoListType = {
                addedDate: string
                id: string
                order: number
                title: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: 0 | 1 | 10
}
