import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../AppWithRedux";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

type PropsType = {
    task:  TaskType
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    removeTask: (id: string) => void
    editTitle: (taskId: string, newTitle: string) => void
}

const Task: FC<PropsType> = memo(({task,
                                      changeTaskStatus,
                                      removeTask,
                                      editTitle
}) => {
    const onRemoveTask = useCallback(() => removeTask(task.id), [removeTask, task.id])
    const onChangeTaskStatus = useCallback((e:ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked), [changeTaskStatus, task.id])

    const onChangeTitle = useCallback((newTitle: string) => {
        editTitle(task.id, newTitle )
    },[editTitle, task.id])
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

export default Task;