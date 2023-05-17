import React, {FC} from 'react';
import {Task} from "features/todolistsList/todolists/Todolist/Tasks/Task/Task";
import {TaskStatuses} from "common/enums";
import {TaskType} from "features/todolistsList/tasks/tasks.api";
import {TodolistDomainType} from "features/todolistsList/todolists/todolists.reducer";

type Props = {
    tasks: TaskType[]
    todolist: TodolistDomainType
}
export const Tasks: FC<Props> = ({tasks, todolist}) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}/>)
            }
        </div>
    );
};

