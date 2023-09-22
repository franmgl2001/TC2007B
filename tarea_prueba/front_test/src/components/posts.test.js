import { render, screen } from '@testing-library/react';
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    useRecordContext,

} from "react-admin";

import { UnselectButton } from '../hooks/UnSelectButton';
import React from "react";
import { PostList, PostEdit, PostCreate } from './posts';

test('renders learn react link', () => {
});