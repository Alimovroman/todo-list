import React, {FC} from 'react';

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
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
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;