import React, {Dispatch, useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'deactive'

type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const title1: string = 'Ypo'
    const title2: string = 'ad'
    const title3: string = 'Ypasasdasdo'


    const [tasks1, setTask1] = useState<Array<TaskType>>([
        {id: '1', isDone: true, title: 'adad'},
        {id: '2', isDone: false, title: 'asdasd'},
        {id: '3', isDone: true, title: 'adsssad'},
        {id: '4', isDone: false, title: 'adsssad'},
        {id: '5', isDone: false, title: 'asdasd2222ds'}
    ])

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })



    const changeFilter = (todoListId: string,   filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id ===todoListId ? {...el, filter: filter} : el))
    }


    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, isDone} : t)})
        // setTask1(tasks1.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const removeTask = (todoListId: string,  taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(e => e.id !== taskId )})

    }

    const addTask = (todoListId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title
        }
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask ]})
        // setTask([...tasks, newTask])
    }
    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
    }

    return (
        <div className="App">
            {todolists.map(e => {
                    let filteredTasksForRender = tasks[e.id]
                    if (todolists[0].filter === 'active') {
                        filteredTasksForRender = tasks[e.id].filter(task => task.isDone === true)
                    }
                    if (todolists[0].filter === 'deactive') {
                        filteredTasksForRender = tasks[e.id].filter(task => task.isDone === false)
                    }
                    return (
                        <ToDoList title={title1}
                                  key={e.id}
                                  todoListId={e.id}
                                  addTask={addTask}
                                  tasks={filteredTasksForRender}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  // setFilter={setFilter1}
                                  mainTasks={tasks1}
                                  setTask={setTask1}
                                  changeTaskStatus={changeTaskStatus}
                                  removeTodoList={removeTodoList}
                                  filter={e.filter}/>
                    )
                }
            )}


        </div>
    );
}

export default App;
