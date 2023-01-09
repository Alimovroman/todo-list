import React, {FC} from 'react';
import {FilterValuesType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (filter: FilterValuesType) => void

}

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}
const ToDoList: FC<ToDoListPropsType> = (props) => {
    let taskList = props.tasks.length === 0
    ? <span>Your task list is empty</span>
    : props.tasks.map((task:TaskType) => {
        const removeTask = () => {
            props.removeTask(task.id)
        }
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("deactive")}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;