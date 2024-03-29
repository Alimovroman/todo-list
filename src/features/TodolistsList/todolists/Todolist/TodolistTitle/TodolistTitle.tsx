import React, {FC, useCallback} from 'react';
import {EditableSpan} from "common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "common/hooks";
import {TodolistDomainType, todolistsThunks} from "features/todolistsList/todolists/todolists.reducer";

type Props = {
    todolist: TodolistDomainType
}
export const TodolistTitle: FC<Props> = ({todolist}) => {
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)

    const removeTodolistCallback = () => {
        removeTodolist(todolist.id)
    }

    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }, [todolist.id])
    return (
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback}/>
            <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    );
};