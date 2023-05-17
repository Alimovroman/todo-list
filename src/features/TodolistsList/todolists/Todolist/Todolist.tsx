import React, {FC, memo, useCallback, useEffect} from 'react'
import {Delete} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import {
    TodolistDomainType,
    todolistsThunks
} from 'features/todolistsList/todolists/todolists.reducer'
import {tasksThunks} from 'features/todolistsList/tasks/tasks.reducer';
import {TaskStatuses} from 'common/enums';
import {useActions, useAppDispatch} from 'common/hooks';
import {AddItemForm, EditableSpan} from 'common/components'
import {TaskType} from "features/todolistsList/tasks/tasks.api";
import {FilterTasksButtons} from "features/todolistsList/todolists/Todolist/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/todolistsList/todolists/Todolist/Tasks/Tasks";
import {TodolistTitle} from "features/todolistsList/todolists/Todolist/TodolistTitle/TodolistTitle";

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist: FC<Props> = memo(({todolist, tasks}) => {

    const {fetchTasks, addTask} = useActions(tasksThunks)


    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const addTaskCallback = useCallback((title: string) => {
        return addTask({title, todolistId: todolist.id}).unwrap()
    }, [todolist.id])



    return <div>
        <TodolistTitle todolist={todolist}/>
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
        <Tasks tasks={tasks} todolist={todolist}/>
        <div style={{paddingTop: '10px'}}>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    </div>
})


