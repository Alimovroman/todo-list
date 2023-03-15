import React, {KeyboardEvent, Dispatch, FC, useState, ChangeEvent, useCallback, memo, useMemo} from 'react';
import {FilterValuesType, TaskType} from "./App";
import './App.css';
import SuperInput from "./component/SuperInput";
import EditableSpan from "./component/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useSelector} from "react-redux";
import {TasksStateType, TodolistsType} from "./AppWithRedux";
import {AppRootStateType} from "./state/store";
import Task from "./component/Task";
import TaskWithRedux from "./component/TaskWithRedux";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

type ToDoListPropsType = {
    title: string
    todoListId: string
    todolist: TodolistsType
    tasks: Array<TaskType>
    editMainTitle: (todoListId: string, newTitle: string) => void
    changeFilter: (todoListId: string,  filter: FilterValuesType) => void
    addTask: (todoListId: string, str: string) => void
    filter: FilterValuesType
    removeTodoList: (taskId: string) => void
    // editTask: (todoListId: string, taskId: string, newTitle: string ) => void
    // removeTask: (todoListId: string,  id: string) => void
    // changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void


}

const ToDoList: FC<ToDoListPropsType> = memo((props) => {

    const onHandlerCreatorAll = useCallback(() => {
        props.changeFilter(props.todoListId,  'all')
    }, [props.todoListId] )
    const onHandlerCreatorActive = useCallback(() => {
        props.changeFilter(props.todoListId,  'active')
    }, [props.todoListId] )
    const onHandlerCreatorDeactive = useCallback(() => {
        props.changeFilter(props.todoListId,  'deactive')
    }, [props.todoListId] )

    const removeTodoListHandler = useCallback(() => {
        props.removeTodoList(props.todoListId)
    }, [props.removeTodoList, props.todoListId])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todoListId, title)
    }, [props.addTask, props.todoListId])

    const editMainTitle = useCallback((newTitle:string) => {
        props.editMainTitle(props.todoListId, newTitle)
    }, [props.editMainTitle, props.todoListId])

    // const editTitle = useCallback((taskId: string, newTitle: string) => {
    //     props.editTask(props.todoListId, taskId, newTitle)
    // }, [ props.editTask, props.todoListId])
    //
    //
    // const removeTask = useCallback((id: string) => {
    //     props.removeTask(props.todoListId, id)
    // }, [props.removeTask, props.todoListId])
    //
    // const changeTaskStatus = useCallback((taskId: string,  isDone: boolean) => {
    //     props.changeTaskStatus(props.todoListId, taskId, isDone)
    // },[ props.changeTaskStatus, props.todoListId])

    let tasks = props.tasks
    if (props.todolist.filter === 'active') {
        tasks = props.tasks.filter(task => task.isDone === true)
    }
    if (props.todolist.filter === 'deactive') {
        tasks = props.tasks.filter(task => task.isDone === false)
    }

    let taskList = tasks.length === 0
        ? <span>Your task list is empty</span>
        : tasks.map((task: TaskType) => {
            // return <Task key={task.id}
            //              task={task}
            //              changeTaskStatus={changeTaskStatus}
            //              removeTask={removeTask}
            //              editTitle={editTitle}
            // />
            return <TaskWithRedux key={task.id} task={task} todolistId={props.todoListId}/>
        })



    return (
        <div>
            <div className={'header-task'}>
                <EditableSpan oldTitle={props.title} callback={editMainTitle} />
                <IconButton aria-label="delete" onClick={removeTodoListHandler} color="secondary">
                    <DeleteIcon />
                </IconButton>
            </div>
            <SuperInput callback={addTask}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <ButtonWithMemo title={'All'} variant={props.filter === 'all' ?"outlined" : 'contained'} color={"secondary"} callback={onHandlerCreatorAll} />
                <ButtonWithMemo title={'Active'} variant={props.filter === 'active' ?"outlined" : 'contained'} color={"success"} callback={onHandlerCreatorActive} />
                <ButtonWithMemo title={'Completed'} variant={props.filter === 'deactive' ?"outlined" : 'contained'} color={"error"} callback={onHandlerCreatorDeactive} />
            </div>
        </div>
    );
});

type ButtonProps = {
    title: string
    color:  "inherit" | "secondary" | "primary" | "error" | "info" | "success" | "warning" | undefined
    variant:  "text" | "outlined" | "contained" | undefined
    callback: () => void
}
const ButtonWithMemo: FC<ButtonProps> = memo(({title, variant, color,  callback}) => {

    console.log('button')
    return <Button variant={variant}
                   color={color}
                   onClick={callback}>
        {title}
    </Button>
})

export default ToDoList;