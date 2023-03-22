import React, {useCallback} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
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

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>((state) => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<Dispatch>()

    const changeFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todoListId, filter))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const editMainTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTitleTodolistAc(todoListId, newTitle))
    }, [dispatch])

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

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
                            return (
                                <Grid item key={e.id}>
                                    <Paper elevation={3} style={{padding: '10px'}}>
                                        <ToDoList title={e.title}
                                                  todoListId={e.id}
                                                  addTask={addTask}
                                                  todolist={e}
                                                  tasks={tasks[e.id]}
                                                  changeFilter={changeFilter}
                                                  removeTodoList={removeTodoList}
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
