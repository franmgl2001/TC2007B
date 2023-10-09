import { Datagrid, List, TextField, SimpleForm, Create } from 'react-admin';


export const UserList = () => (
    < List >
        <Datagrid rowClick="edit">
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
                <TextField source="username" />
                <TextField source="password" />
                <TextField source="fullName" />
                <TextField source="email" />
                <TextField source="Permissions" />
            </SimpleForm>
        </Create>
    );
};
