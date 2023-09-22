import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout, ToggleThemeButton } from 'react-admin';
import { MenuItem } from '@mui/material';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import { defaultTheme, useTheme } from 'react-admin';
import { Button } from '@mui/material';

// It's important to pass the ref to allow Material UI to manage the keyboard navigation


const MyAppBar = () => <AppBar userMenu={<UserMenu />} toolbar={<ToggleThemeButton />} />;

const MyLayout = (props) => (
    <Layout {...props} appBar={MyAppBar} />
);


export default MyLayout;