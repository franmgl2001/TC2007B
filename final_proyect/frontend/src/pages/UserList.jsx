import { Datagrid, List, TextField, SimpleForm, Create, TextInput } from 'react-admin';


export const UserList = () => (
    < List >
        <Datagrid >
        <TextInput source="username" />
                <TextField source="password" />
                <TextField source="fullName" />
                <TextField source="email" />
                <TextField source="permissions" />
        </Datagrid>
    </List >
);


export const UserCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <div style={{gap: 80, display: 'flex'}}>
                    <TextInput source="username" />
                    <TextInput source="password" />
                    <TextInput source="fullName" />
                    <TextInput source="email" />
                    <TextInput source="permissions" />
                </div>
            </SimpleForm>
        </Create>
    );
};
