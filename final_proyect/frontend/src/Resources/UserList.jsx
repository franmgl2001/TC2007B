import { Datagrid, List, TextField, SimpleForm, Create, TextInput, PasswordInput, EditButton, SelectInput, Edit } from 'react-admin';


export const UserList = () => (
    < List >
        <Datagrid >
            <TextField source="username" label="Usuario" />
            <TextField source="fullName" label="Nombre" />
            <TextField source="email" />
            <TextField source="permissions" label="Rol" />
            <EditButton />
        </Datagrid>
    </List >
);


export const UserCreate = () => {
    return (
        <Create>
            <SimpleForm >
                <div style={{ gap: 80, display: 'flex' }}>
                    <TextInput source="username" label="Usuario" />
                    <PasswordInput source="password" label="Contraseña" />
                    <TextInput source="fullName" label="Nombre Completo" />
                    <TextInput source="email" label="Email" />
                    <SelectInput source="permissions" choices={[
                        { id: 'Admin', name: "Admin" },
                        { id: 'Coordinador', name: 'Coordinador' },
                        { id: 'Coordinador Nacional', name: 'Coordinador Nacional' },
                        { id: 'Ejecutivo', name: 'Ejecutivo' },
                    ]} label="Rol" />

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
                    <TextInput source="username" label="Usuario" disabled />
                    <PasswordInput source="password" label="Contraseña" />
                    <TextInput source="fullName" label="Nombre Completo" />
                    <TextInput source="email" label="Email" />
                    <SelectInput source="permissions" choices={[
                        { id: 'Admin', name: "Admin" },
                        { id: 'Coordinador', name: 'Coordinador' },
                        { id: 'Coordinador Nacional', name: 'Coordinador Nacional' },
                        { id: 'Ejecutivo', name: 'Ejecutivo' },
                    ]} label="Rol" />
                </div>
            </SimpleForm>
        </Edit>
    );
};