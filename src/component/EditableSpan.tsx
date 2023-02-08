import React, {ChangeEvent, FC, useState} from 'react';

type EditPropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}
const EditableSpan: FC<EditPropsType> = ({oldTitle, callback}) => {
    const [newTitle, setNewTitle] = useState<string>(oldTitle)
    const [edit, setEdit] = useState(false)
    const editFullHandler = () => {
        setEdit(!edit)
        callback(newTitle)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit
            ? <input value={newTitle} onBlur={editFullHandler} onChange={onChangeTitle} autoFocus={true}/>
            : <span onDoubleClick={editFullHandler}>{oldTitle}</span>
    );
};

export default EditableSpan;