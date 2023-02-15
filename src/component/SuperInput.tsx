import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

type SuperInputProps = {
    callback: (str: string) => void

}

const SuperInput: FC<SuperInputProps> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    // const errorMessage = error && <div className={'error'}>Error</div>
    // const errorClassName = error ? 'input-error' : ''

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.callback(title)

        } else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        e.key === 'Enter' && addTask()
    }
    const buttonStyle = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        background: "hotpink"
    }
    return (
        <div className={'super-input'}>
            {/*<input*/}
            {/*    onChange={e => onChangeHandler(e)}*/}
            {/*    value={title}*/}
            {/*    onKeyDown={e => onKeyDownHandler(e)}*/}
            {/*    className={errorClassName}*/}
            {/*/>*/}
            <TextField id="standard-basic"
                       size={"small"}
                       label={error ? 'Title is required' : 'Please type you title'}
                       variant="outlined"
                       onChange={e => onChangeHandler(e)}
                       value={title}
                       onKeyDown={e => onKeyDownHandler(e)}
                       error={!!error}
            />
            <Button variant="contained" onClick={addTask} style={buttonStyle}>
                +
            </Button>
            {/*{errorMessage}*/}
        </div>
    );
};

export default SuperInput;