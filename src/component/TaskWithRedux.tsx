import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../AppWithRedux";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {changeTaskStatusAC, changeTitleAC, removeTaskAC} from "../state/tasks-reducer";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

type PropsType = {
    task:  TaskType
    todolistId: string
}

const TaskWithRedux: FC<PropsType> = memo(({task, todolistId}) => {

    const dispatch = useDispatch<Dispatch>()

    const onRemoveTask = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))

    const onChangeTitle = (newTitle: string) => dispatch(changeTitleAC(task.id, newTitle, todolistId))


    const taskClasses = task.isDone ? "task-done" : 'task'


    return (
        <li className={taskClasses}>
            <Checkbox {...label}
                      checked={task.isDone}
                      onChange={onChangeTaskStatus}
            />
            <EditableSpan oldTitle={task.title} callback={onChangeTitle}/>
            <IconButton aria-label="delete" onClick={onRemoveTask} color="secondary">
                <DeleteIcon />
            </IconButton>
        </li>
    );
});

export default TaskWithRedux;