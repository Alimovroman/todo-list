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

function AppWithReducer() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })
    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatchTodolists(changeFilterAC(todoListId, filter))
    }
    const removeTodoList = (todoListId: string) => {
        dispatchTodolists(removeTodolistAC(todoListId))
        dispatchTasks(removeTodolistAC(todoListId))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    const editMainTitle = (todoListId: string, newTitle: string) => {
        dispatchTodolists(changeTitleTodolistAc(todoListId, newTitle))
        // setTodolists(todolists.map(el => el.id === todoListId
        //     ? {...el, title: newTitle}
        //     : el
        // ))
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const removeTask = (todoListId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }
    const addTask = (todoListId: string, title: string) => {
        dispatchTasks(addTaskAC(title, todoListId))
    }
    const editTask = (todoListId: string, taskId: string, newTitle: string) => {
        dispatchTasks(changeTitleAC(taskId, newTitle, todoListId))
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

export default AppWithReducer;
