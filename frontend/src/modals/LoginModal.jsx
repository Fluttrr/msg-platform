import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { User } from '../models';
import { WebSocketContext } from '../contexts/WebSocketContext';
import { identify } from '../api/api';

function LoginModal() {
    const [serverIP, setServerIP] = useState('');
    const [username, setUsername] = useState('');
    const { ws } = useContext(WebSocketContext);

    const { setLoggedInUser } = useContext(AppContext);

    useEffect(() => {
        const modal = document.getElementById('login_modal');
        if (modal) {
            modal.showModal();
        }
    }, []);

    const handleLogin = () => {
        const user = new User(1, username, "User 1's description");
        setLoggedInUser(user)
        identify(ws, user);
    };

    return (
        <dialog id="login_modal" className="modal">
            <div className="modal-box">
                <h2 className="text-primary text-xl font-bold mb-4">Login</h2>
                <form method="dialog" className="form-control" onSubmit={() => handleLogin()}>
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

                        <button className="btn btn-primary">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default LoginModal;