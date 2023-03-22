import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SuperInput from "../component/SuperInput";
import {action} from "@storybook/addon-actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Task from "../component/Task";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('change task status'),
        removeTask: action('remove task'),
        editTitle: action('change title')
    },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {id: '212', title: 'Task1', isDone: false},
};


export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {id: '212', title: 'Task1', isDone: true},
};

export const TaskFullUsing = () => {
    const [isDone, setIsDone] = useState(false)
    const [title, setTitle] = useState('Task 1')

    const onChangeStatus = () => {
        setIsDone(!isDone)
    }

    console.log(title)
    const onChangeTitle = (taskId: string , newTitle: string) => {
        setTitle(newTitle)
    }
    return <Task task={{id: '212', title, isDone}}
                 changeTaskStatus={onChangeStatus}
                 removeTask={action('Remove task')}
                 editTitle={onChangeTitle} />
}
