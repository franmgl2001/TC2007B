import { SimpleForm, TextInput, useUnique } from 'react-admin';

const UserCreateForm = () => {
    const unique = useUnique();
    return (
        <SimpleForm>
            <TextInput source="username" validate={unique()} />
        </SimpleForm>
    );
};
