import { Admin, Resource, ShowGuesser} from "react-admin";
import { dataProvider } from './dataProvider';
import { UserList } from "./users";
import { PostList, PostEdit, PostCreate } from "./posts";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';
import { AlbumList } from "./albums";
import { i18nProvider } from './i18nProvider';


export const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} i18nProvider={i18nProvider}>
        
        <Resource 
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={PostIcon}
        />
        <Resource
            name="users"
            list={UserList}
            show={ShowGuesser}
            recordRepresentation="name"
            icon={UserIcon}
        />
        <Resource
            name="albums"
            list={AlbumList}
            icon={PostIcon}
        />
    </Admin>
);