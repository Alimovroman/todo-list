import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TaskWithRedux from "../component/TaskWithRedux";
import ReduxStoreProviderDecorator from "./decorators/ReduxStoreProviderDecorator";
import {TaskType} from "../AppWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/TaskWithRedux',
    component: TaskWithRedux,
    args: {

    },
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof TaskWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux task={task} todolistId={'todolistId1'} />
}
const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskCopy />;

export const TaskWithReduxStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskWithReduxStories.args = {

};

