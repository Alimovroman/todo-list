import React, {ChangeEvent,KeyboardEvent, FC, useState} from 'react';

type SuperInputProps = {
    callback: (str: string) => void

}

const SuperInput: FC<SuperInputProps> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const errorMessage =  error && <div className={'error'}>Error</div>
    const errorClassName = error ? 'input-error' : ''

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle !== '') {
            props.callback(title)

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

    return (
        <div className={'super-input'}>
            <input
                onChange={e => onChangeHandler(e)}
                value={title}
                onKeyDown={e => onKeyDownHandler(e)}
                className={errorClassName}
            />
            <button onClick={addTask}>+</button>
            {errorMessage}
        </div>
    );
};

export default SuperInput;