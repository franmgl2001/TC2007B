import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    useRecordContext,

} from "react-admin";

import { UnselectButton } from '../hooks/UnSelectButton';
import React from "react";

const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

export const PostList = () => (

    <List filters={postFilters}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <ReferenceField source="userId" reference="users" link="show" label="Id Usuario" />
            <TextField source="title" label="Título" />
            <EditButton />
        </Datagrid>
        <UnselectButton />
    </List>
);

export const PostEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="id" />
            <TextInput source="title" />
            <TextInput source="body" multiline rows={5} />
        </SimpleForm>
    </Edit>
);

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" label="Titulo" />
            <TextInput source="body" multiline rows={5} />
        </SimpleForm>
    </Create>
);