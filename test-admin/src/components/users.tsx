import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, SimpleForm, PasswordInput, TextInput, useUnique} from "react-admin";
import MyUrlField from '../MyUrlField';

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" label='ID' />
                    <TextField source="name" label='Nombre' />
                    <TextField source="username" label='Usuario' />
                    <EmailField source="email" label='Email' />
                    <TextField source="address.street" label='Dirección' />
                    <TextField source="phone" label='Teléfono' />
                    <MyUrlField source="website" />
                    <TextField source="company.name" label='Compañía' />
                </Datagrid>
            )}
        </List>
    );  
    
};
export const UserCreateForm = () => {
    const unique = useUnique();
    return (
        <SimpleForm>
            <TextInput source="username" validate={unique({ resource: 'users' })} />
            <PasswordInput source="password" />
        </SimpleForm>
    );
};

