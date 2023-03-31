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

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
    },
    postTask(todolistId: string, title: string) {
        return instance.post<ResponseType<ItemsType>>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    putTask(todolistId: string, taskId: string, task: TitleTaskType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, task)
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

type TasksType = {
    error: null | string
    items: ItemsType[]
    totalCount: 0 | 1 | 10
}
type ItemsType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TitleTaskType = {
    title: string
    description: string | null
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}


