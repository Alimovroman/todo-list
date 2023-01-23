import React, {Dispatch, useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'deactive'



function App() {
    const title1: string = 'Ypo'
    const title2: string = 'ad'
    const title3: string = 'Ypasasdasdo'

    const [tasks1, setTask1] = useState<Array<TaskType> >([
        {id:'1', isDone: true, title: 'adad'},
        {id:'2', isDone: false, title: 'asdasd'},
        {id:'3', isDone: true, title: 'adsssad'},
        {id:'4', isDone: false, title: 'adsssad'},
        {id:'5', isDone: false, title: 'asdasd2222ds'}
    ])
    const [tasks2, setTask2] = useState<Array<TaskType> >([
        {id:'1', isDone: true, title: 'adad'},
        {id:'2', isDone: false, title: 'asdasd'},
        {id:'3', isDone: true, title: 'adsssad'}
    ])
    const [tasks3, setTask3] = useState<Array<TaskType> >([])

    const [filter1, setFilter1] = useState<FilterValuesType>('all')
    const [filter2, setFilter2] = useState<FilterValuesType>('all')
    const [filter3, setFilter3] = useState<FilterValuesType>('all')

    const changeFilter = (setFilter: Dispatch<FilterValuesType>, filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilterTasksForRender = (tasks:Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        if(filter === 'active') {
            return  tasks.filter(task => task.isDone === true)
        } else if(filter === 'deactive' ) {
            return  tasks.filter(task => task.isDone === false)
        } else {
            return  tasks
        }
    }


    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTask1(tasks1.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
    }
    const filteredTasksForRender1 = getFilterTasksForRender(tasks1, filter1)
    const filteredTasksForRender2 = getFilterTasksForRender(tasks2, filter2)
    const filteredTasksForRender3 = getFilterTasksForRender(tasks3, filter3)
    const removeTask = (setTask: Dispatch<Array<TaskType>>, mainTasks: Array<TaskType>,  id: string) => {
        setTask(mainTasks.filter((task: TaskType) => task.id !== id))
    }

    const addTask = (setTask: Dispatch<Array<TaskType>>, tasks: Array<TaskType>,title: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title
        }
        setTask([...tasks, newTask])
    }

    return (
        <div className="App">
            <ToDoList title={title1}
                      addTask={addTask}
                      tasks={filteredTasksForRender1}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      setFilter={setFilter1}
                      mainTasks={tasks1}
                      setTask={setTask1}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter1}/>
            {/*<ToDoList title={title2} addTask={addTask} tasks={filteredTasksForRender2} removeTask={removeTask} changeFilter={changeFilter} setFilter={setFilter2} mainTasks={tasks2} setTask={setTask2}/>*/}
            {/*<ToDoList title={title3} addTask={addTask} tasks={filteredTasksForRender3} removeTask={removeTask} changeFilter={changeFilter} setFilter={setFilter3} mainTasks={tasks3} setTask={setTask3}/>*/}
        </div>
    );
}

export default App;
