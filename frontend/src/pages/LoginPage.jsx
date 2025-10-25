// filepath: /home/fluttr/Desktop/Projects/ChatUI/src/pages/LoginPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { WebSocketContext } from '../contexts/WebSocketContext';
import { identify, loginWithUsername } from '../api/api';

function LoginPage() {
    const { loggedInUser, setLoggedInUser, setIsLoggedIn, serverIP, setServerIP } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const { ws } = useContext(WebSocketContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const user = await loginWithUsername(serverIP, username)
        setLoggedInUser(user);
        setIsLoggedIn(true);
    };

    useEffect(() => {
        if (ws && loggedInUser) {
            identify(ws, loggedInUser);
            navigate('/chat');
        }
    }, [ws, loggedInUser]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="modal-box">
                <h2 className="text-primary text-xl font-bold mb-4">Login</h2>
                <form className="form-control" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <label className="label">Server Address</label>
                    <input
                        required={true}
                        type="text"
                        value={serverIP}
                        className="input input-primary"
                        onChange={(e) => setServerIP(e.target.value)}
                    />
                    <label className="label">Username</label>
                    <input
                        required={true}
                        type="text"
                        value={username}
                        className="input input-primary"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="modal-action">
                        <button className="btn btn-primary" type="submit">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;