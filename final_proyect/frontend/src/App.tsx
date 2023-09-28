import { Admin, Resource, ShowGuesser, Layout } from "react-admin";
import { dataProvider } from './dataProvider';
import { UserList, UserCreateForm } from "./components/users";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import Dashboard from './Dashboard';
import { authProvider } from './authProvider';
import { i18nProvider } from './i18nProvider';
//import { MyAppBar } from './components/appbar';
import CustomLoginPage from './components/loginPage';
import MyLayout from './MyLayout';

//const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;


export const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} i18nProvider={i18nProvider}
        darkTheme={{ palette: { mode: 'dark' } }} loginPage={CustomLoginPage} layout={MyLayout}
    >


        <Resource
            name="users"
            list={UserList}
            show={ShowGuesser}
            create={UserCreateForm}
            recordRepresentation="name"
            icon={UserIcon}
            options={{ label: 'Usuarios' }}
        />
    </Admin >
); 