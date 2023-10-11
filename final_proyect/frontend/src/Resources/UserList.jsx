import { Datagrid, List, TextField, SimpleForm, Create, TextInput, PasswordInput } from 'react-admin';


export const UserList = () => (
    < List >
        <Datagrid >
            <TextField source="username" />
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
                <div style={{ gap: 80, display: 'flex' }}>
                    <TextInput source="username" />
                    <PasswordInput source="password" />
                    <TextInput source="fullName" />
                    <TextInput source="email" />
                    <TextInput source="permissions" />
                </div>
            </SimpleForm>
        </Create>
    );
};
