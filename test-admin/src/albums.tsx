
import { List, Datagrid, TextField,  } from "react-admin";


export const AlbumList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="userId" />
            <TextField source="title" />
        </Datagrid>
    </List>
);