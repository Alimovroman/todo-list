import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import SuperInput from "./component/SuperInput";
import ButtonAppBar from "./component/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAc,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Dispatch} from "redux";

export type FilterValuesType = 'all' | 'active' | 'deactive'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>((state) => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<Dispatch>()
    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, filter))
    }
    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    const editMainTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTitleTodolistAc(todoListId, newTitle))
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }
    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const editTask = (todoListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTitleAC(taskId, newTitle, todoListId))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <SuperInput callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(e => {
                            let filteredTasksForRender = tasks[e.id]
                            if (e.filter === 'active') {
                                filteredTasksForRender = tasks[e.id].filter(task => task.isDone === true)
                            }
                            if (e.filter === 'deactive') {
                                filteredTasksForRender = tasks[e.id].filter(task => task.isDone === false)
                            }
                            return (
                                <Grid item key={e.id}>
                                    <Paper elevation={3} style={{padding: '10px'}}>
                                        <ToDoList title={e.title}

                                                  todoListId={e.id}
                                                  addTask={addTask}
                                                  tasks={filteredTasksForRender}
                                                  removeTask={removeTask}
                                                  changeFilter={changeFilter}
                                                  changeTaskStatus={changeTaskStatus}
                                                  removeTodoList={removeTodoList}
                                                  editTask={editTask}
                                                  editMainTitle={editMainTitle}
                                                  filter={e.filter}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
