import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SuperInput from "../component/SuperInput";
import {action} from "@storybook/addon-actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AddItemForm',
    component: SuperInput,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {
            description: 'Button click'
        }
    },
} as ComponentMeta<typeof SuperInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SuperInput> = (args) => <SuperInput {...args} />;

export const AddItenStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItenStory.args = {
    callback: action('Button Click')
};


const Template1: ComponentStory<typeof SuperInput> = (args) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean | null>(true)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            args.callback(title)

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
        if (error) setError(null)
        e.key === 'Enter' && addTask()
    }
    const buttonStyle = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        background: "hotpink"
    }
    console.log('superInput')
    return (
        <div className={'super-input'}>
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
        </div>
    );
};
export const AddItemFormStoryError = Template1.bind({});
AddItemFormStoryError.args = {
    callback: action('Button Click')
};
