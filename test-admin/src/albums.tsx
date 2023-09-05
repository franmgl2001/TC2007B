
import { List, Datagrid, TextField, } from "react-admin";


export const AlbumList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="userId" label="Id Usuario" />
            <TextField source="title" label="Título" />
        </Datagrid>
    </List>
);