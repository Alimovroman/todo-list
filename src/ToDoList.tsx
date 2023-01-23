import React, {KeyboardEvent, Dispatch, FC, useState, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import './App.css';

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (setTask: Dispatch<Array<TaskType>>, mainTask: Array<TaskType>, id: string) => void
    changeFilter: (setFilter: Dispatch<FilterValuesType>, filter: FilterValuesType) => void
    setFilter: Dispatch<FilterValuesType>
    setTask: Dispatch<Array<TaskType>>
    mainTasks: Array<TaskType>
    addTask: (setTask: Dispatch<Array<TaskType>>, tasks: Array<TaskType>, str: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
const ToDoList: FC<ToDoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    // const ref = useRef<any>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle !== '') {
            props.addTask(props.setTask, props.mainTasks, title)

        } else {
            setError(true)
        }
        setTitle('')

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(props.setFilter, filter)
    const errorMessage =  error && <div className={'error'}>Error</div>
    const errorClassName = error ? 'input-error' : ''


    let taskList = props.tasks.length === 0
        ? <span>Your task list is empty</span>
        : props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(props.setTask, props.mainTasks, task.id)
            const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            const taskClasses = task.isDone ? "task-done" : 'task'
            return (
                <li key={task.id} className={taskClasses}>
                    <input type="checkbox"
                           checked={task.isDone}
                           onChange={changeTaskStatus}
                   />
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    onChange={e => onChangeHandler(e)}
                    value={title}
                    onKeyDown={e => onKeyDownHandler(e)}
                    className={errorClassName}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
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