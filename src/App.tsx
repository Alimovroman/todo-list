import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

export type FilterValuesType = 'all' | 'active' | 'deactive'
function App() {
    const title1: string = 'Ypo'
    const title2: string = 'ad'
    const title3: string = 'Ypasasdasdo'

    const [tasks1, setTask1] = useState<Array<TaskType> >([
        {id:1, isDone: true, title: 'adad'},
        {id:2, isDone: false, title: 'asdasd'},
        {id:3, isDone: true, title: 'adsssad'},
        {id:4, isDone: false, title: 'adsssad'},
        {id:5, isDone: false, title: 'asdasd2222ds'}
    ])
    const [tasks2, setTask2] = useState<Array<TaskType> >([
        {id:1, isDone: true, title: 'adad'},
        {id:2, isDone: false, title: 'asdasd'},
        {id:3, isDone: true, title: 'adsssad'}
    ])
    const [tasks3, setTask3] = useState<Array<TaskType> >([

    ])

    const [filter1, setFilter1] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => {
        setFilter1(filter)
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

    const filteredTasksForRender = getFilterTasksForRender(tasks1, filter1)
    const removeTask = (id: number) => {
        setTask1(tasks1.filter(task => task.id !== id))
    }
    const removeTask2 = (id: number) => {
        setTask2(tasks2.filter(task => task.id !== id))
    }
    const removeTask3 = (id: number) => {
        setTask3(tasks3.filter(task => task.id !== id))
    }
    return (
        <div className="App">
            <ToDoList title={title1} tasks={filteredTasksForRender} removeTask={removeTask} changeFilter={changeFilter}/>
            <ToDoList title={title2} tasks={tasks2} removeTask={removeTask2} changeFilter={changeFilter}/>
            <ToDoList title={title3} tasks={tasks3} removeTask={removeTask3} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
