import { Datagrid, List, TextField, SimpleForm, Create, TextInput, PasswordInput, EditButton, SelectInput, Edit, useNotify, useRefresh, useRedirect, SimpleList } from 'react-admin';
import { useMediaQuery } from '@mui/material';

export const UserList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    return (
        < List >
        {isSmall ? (
                < SimpleList
                primaryText={(record) => record.username}
                secondaryText={(record) => record.fullName}
                tertiaryText={(record) => record.email}
            /> ) : (
            <Datagrid >
                <TextField source="username" label="Usuario" />
                <TextField source="fullName" label="Nombre" />
                <TextField source="email" />
                <TextField source="permissions" label="Rol" />
                <EditButton />
            </Datagrid>
            )}
        </List >
    );
};


export const UserCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onError = (error) => {
        notify(`Error: ${error.message}`);
        if (error.message === "Locked")
            notify("Error: Favor de llenar todos los campos");
        else if (error.message === "I'm a Teapot")
            notify("Error: Contraeña debe ser de 8 caracteres o más");
        else if (error.message === "Gone")
            notify("Error: Usuario ya existe");
    };

    const onSuccess = () => {
        notify(`Usuario Creado`);
        refresh();
        redirect('/usuarios');
    }

    return (
        <Create mutationMode="undoable" mutationOptions={{ onError, onSuccess }}>
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
    const isSmallScreen = useMediaQuery('(max-width: 1300px)');

    const notify = useNotify();
    const onError = (error) => {
        console.log(error.message);
        if (error.message === "I'm a Teapot")
            notify("Error: Contraeña debe ser de 8 caracteres o más");
    };

    return (
        < Edit mutationMode="undoable" mutationOptions={{ onError }} >
            <SimpleForm>
                <div style={{ width: '100%', gap: 80, display: isSmallScreen ? 'block' : 'flex', flexDirection: isSmallScreen ? 'column' : 'row'}}>
                    <TextInput source="username" label="Usuario" disabled sx={{ marginBottom: isSmallScreen ? '10px' : '0'}}/>
                    <PasswordInput source="password" label="Contraseña" sx={{ marginBottom: isSmallScreen ? '10px' : '0'}}/>
                    <TextInput source="fullName" label="Nombre Completo" sx={{ marginBottom: isSmallScreen ? '10px' : '0'}}/>
                    <TextInput source="email" label="Email" sx={{ marginBottom: isSmallScreen ? '10px' : '0'}}/>
                    <SelectInput source="permissions" choices={[
                        { id: 'Admin', name: "Admin" },
                        { id: 'Coordinador', name: 'Coordinador' },
                        { id: 'Coordinador Nacional', name: 'Coordinador Nacional' },
                        { id: 'Ejecutivo', name: 'Ejecutivo' },
                    ]} label="Rol"sx={{ marginBottom: isSmallScreen ? '10px' : '0'}}/>

                </div>
            </SimpleForm>
        </Edit >
    );
};