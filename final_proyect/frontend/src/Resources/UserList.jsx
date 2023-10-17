import { Datagrid, List, TextField, SimpleForm, Create, TextInput, PasswordInput, EditButton, SelectInput, Edit } from 'react-admin';


export const UserList = () => (
    < List >
        <Datagrid >
            <TextField source="username" />
            <TextField source="fullName" />
            <TextField source="email" />
            <TextField source="permissions" />
            <EditButton />
        </Datagrid>
    </List >
);


export const UserCreate = () => {
    return (
        <Create>
            <SimpleForm >
                <div style={{ gap: 80, display: 'flex' }}>
                    <TextInput source="username" />
                    <PasswordInput source="password" />
                    <TextInput source="fullName" />
                    <TextInput source="email" />
                    <SelectInput source="permissions" choices={[
                        { id: 'Admin', name: "Admin" },
                        { id: 'Coordinador', name: 'Coordinador' },
                        { id: 'Coordinador Nacional', name: 'Coordinador Nacional' },
                        { id: 'Ejecutivo', name: 'Ejecutivo' },
                    ]} />

                </div>
            </SimpleForm>
        </Create>
    );
};

export const UserEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <div style={{ gap: 80, display: 'flex' }}>
                    <TextInput source="username" disabled />
                    <PasswordInput source="password" />
                    <TextInput source="fullName" />
                    <TextInput source="email" />
                    <SelectInput source="permissions" choices={[
                        { id: 'Admin', name: "Admin" },
                        { id: 'Coordinador', name: 'Coordinador' },
                        { id: 'Coordinador Nacional', name: 'Coordinador Nacional' },
                        { id: 'Ejecutivo', name: 'Ejecutivo' },
                    ]} />
                </div>
            </SimpleForm>
        </Edit>
    );
};