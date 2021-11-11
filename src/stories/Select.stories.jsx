import {Select} from '../components/select'

export default {
    title: "Foresight/Select",
    component: Select,
    argTypes:{
        isMultiple: {control: 'boolean'},
        placeholder: {control: 'text'},
        startOptions: {control: 'array'},
    }
}

const myAlert = selectedItems => {
    alert(selectedItems);
};

const Template = args => <Select {...args} />;

export const Task = Template.bind({});
Task.args = {
    isMultiple: false,
    startOptions:[{id:1, label: "Image", value: 1}, {id:2, label: "Live", value: 2}, {id:3, label: "Notes", value: 3}, {id:4, label: "Presentation", value: 4}, {id:5, label: "Report", value: 5}, {id:6, label: "Video", value: 6}],
    placeholder: "No Items Selected!",
    alertSelectedItems: myAlert
};