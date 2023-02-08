import React, {KeyboardEvent, Dispatch, FC, useState, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import './App.css';
import SuperInput from "./component/SuperInput";
import EditableSpan from "./component/EditableSpan";
import {Button} from "@mui/material";

type ToDoListPropsType = {
    title: string
    todoListId: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string,  id: string) => void
    changeFilter: (todoListId: string,  filter: FilterValuesType) => void
    // setFilter: Dispatch<FilterValuesType>
    setTask: Dispatch<Array<TaskType>>
    mainTasks: Array<TaskType>
    addTask: (todoListId: string, str: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (taskId: string) => void
    editTask: (todoListId: string, taskId: string, newTitle: string ) => void
    editMainTitle: (todoListId: string, newTitle: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
const ToDoList: FC<ToDoListPropsType> = (props) => {
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(props.todoListId,  filter)
    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }
    const editTitle = (taskId: string, newTitle: string) => {
        props.editTask(props.todoListId, taskId, newTitle)
    }
    const editMainTitle = (newTitle:string) => {
        props.editMainTitle(props.todoListId, newTitle)
    }

    let taskList = props.tasks.length === 0
        ? <span>Your task list is empty</span>
        : props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(props.todoListId, task.id)
            const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)
            const taskClasses = task.isDone ? "task-done" : 'task'

            return (
                <li key={task.id} className={taskClasses}>
                    <input type="checkbox"
                           checked={task.isDone}
                           onChange={changeTaskStatus}
                   />
                    <EditableSpan oldTitle={task.title} callback={(newTitle) => editTitle(task.id, newTitle)}/>
                    <button onClick={removeTask}>x</button>

                </li>
            )
        })

    return (
        <div>
            <div className={'header-task'}>
                <EditableSpan oldTitle={props.title} callback={editMainTitle} />
                <Button color="secondary" onClick={removeTodoListHandler}>X</Button>
                {/*<button onClick={removeTodoListHandler}>*/}
                {/*    X*/}
                {/*</button>*/}
            </div>
            <SuperInput callback={addTask}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'btn-active' : ''} onClick={handlerCreator("all")}>All</button>
                <button className={props.filter === 'active' ? 'btn-active' : ''} onClick={handlerCreator("active")}>Active</button>
                <button className={props.filter === 'deactive' ? 'btn-active' : ''} onClick={handlerCreator("deactive")}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;