import React from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

function App() {
    const title1: string = 'Ypo'
    const title2: string = 'ad'
    const title3: string = 'Ypasasdasdo'
    const tasks1: Array<TaskType> = [
        {id:1, isDone: true, title: 'adad'},
        {id:2, isDone: false, title: 'asdasd'},
        {id:3, isDone: true, title: 'adsssad'},
        {id:4, isDone: false, title: 'adsssad'},
        {id:5, isDone: false, title: 'asdasd2222ds'}
    ]
    const tasks2: Array<TaskType> = [
        {id:1, isDone: true, title: 'adad'},
        {id:2, isDone: false, title: 'asdasd'},
        {id:3, isDone: true, title: 'adsssad'}
    ]
    const tasks3: Array<TaskType> = [

    ]
    return (
        <div className="App">
            <ToDoList title={title1} tasks={tasks1}/>
            <ToDoList title={title2} tasks={tasks2}/>
            <ToDoList title={title3} tasks={tasks3}/>
        </div>
    );
}

export default App;
