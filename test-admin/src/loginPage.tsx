import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';

const CustomLoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </form>
    );
};

export default CustomLoginPage;
