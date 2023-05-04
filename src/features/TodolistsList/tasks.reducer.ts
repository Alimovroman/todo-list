import {Dispatch} from 'redux'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../common/actions/common.actions";
import {todolistsActions} from "./todolists.reducer";
import {appActions} from "../../app/app.reducer";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "../../common/utils";
import {AddTaskArgType, TaskType, todolistsAPI, UpdateTaskArgType, UpdateTaskModelType} from "./todolists.api";
import {ResultCode, TaskPriorities, TaskStatuses} from "../../common/enum";


const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }

})

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>('tasks/addTasks',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await todolistsAPI.createTask(arg)
            if (res.data.resultCode === ResultCode.Success) {
                const task = res.data.data.item
                // const action = addTaskAC(task)
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return {task}
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })



const updateTask = createAppAsyncThunk<UpdateTaskArgType,
    UpdateTaskArgType>
('task/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const state = getState()
        const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            dispatch(appActions.setAppError({error: 'task not found in the state'}))
            return rejectWithValue(null)
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...arg.domainModel
        }

        const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
                if (res.data.resultCode === 0) {
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                    return arg
                } else {
                    handleServerAppError(res.data, dispatch);
                    return rejectWithValue(null)
                }


    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const index = state[action.payload.todolistId].findIndex(tl => tl.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((tl) => tl.id === action.payload.taskId)
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            },)
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach((tl: any) => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTasksAndTodolists, () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer

// actions
export const {removeTaskAC} = slice.actions
export const tasksThunk = {fetchTasks, addTask, updateTask}

// thunks

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC({taskId, todolistId})
            dispatch(action)
        })
}


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


