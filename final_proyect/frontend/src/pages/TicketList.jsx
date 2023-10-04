import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create } from 'react-admin';
import DropDown from '../components/DropDown';

export const TicketList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="coordinador" />
            <TextField source="categoria" />
            <TextField source="subcategoria" />
            <TextField source="status" />
        </Datagrid>
    </List>
);

export const TicketEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="coordinador" disabled />
            <TextInput source="categoria" />
            <TextInput source="subcategoria" />
            <TextInput source="status" />
            <TextInput source="descripcion" />
            <TextInput source="comentario" multiline rows={5} />
        </SimpleForm>
    </Edit>
);

export const TicketCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="coordinador" />
            <DropDown collection={"Servicios"} />
            <DropDown collection={"Prioridad"} />
            <DropDown collection={"Personal"} />
            <TextInput source="status" />
            <TextInput source="descripcion" />
            <TextInput source="comentario" multiline rows={5} />
        </SimpleForm>
    </Create>
);