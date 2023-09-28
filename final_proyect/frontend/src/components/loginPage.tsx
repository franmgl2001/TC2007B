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
        login({ email: '123@123.com', password: "123" }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Ve Por Mexico</h2>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default CustomLoginPage;

