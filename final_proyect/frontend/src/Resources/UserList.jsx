import { Datagrid, List, TextField, SimpleForm, Create, TextInput, PasswordInput, EditButton, SelectInput, Edit, useNotify } from 'react-admin';


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
    const notify = useNotify();
    const onError = (error) => {
        notify(`Error: ${error.message}`);
        if (error.message === "Locked")
            notify("Error: Favor de llenar todos los campos");
        else if (error.message === "I'm a Teapot")
            notify("Error: Contraeña debe ser de 8 caracteres o más");
        else if (error.message === "Gone")
            notify("Error: Usuario ya existe");
    };

    return (
        <Create mutationMode="undoable" mutationOptions={{ onError }}>
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
    const notify = useNotify();
    const onError = (error) => {
        if (error.message === "I'm a Teapot")
            notify("Error: Contraeña debe ser de 8 caracteres o más");
    };
    return (
        < Edit mutationMode="undoable" mutationOptions={{ onError }} >
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