import React from 'react';
import { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { getUserByName, sendMessage } from '../api/api';
import { WebSocketContext } from '../contexts/WebSocketContext';
import { AppContext } from '../contexts/AppContext';

function NewChatModalBtn() {
    const [chatName, setChatName] = useState('');
    const { ws } = React.useContext(WebSocketContext);
    const { loggedInUser, serverIP } = React.useContext(AppContext);

    const handleStartChat = async () => {
        const otherUser = await getUserByName(serverIP, chatName);
        if (!otherUser) {
            alert('User not found!');
            return;
        }
        sendMessage(ws, loggedInUser.id, otherUser.id, 'Hello!');
        setChatName('');
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={() => document.getElementById('new_chat_modal').showModal()}>
                <PencilSquareIcon className="h-6 w-6" />
            </button>
            <dialog id="new_chat_modal" className="modal">
                <div className="modal-box">
                    <h2 className="text-primary text-xl font-bold mb-4">Start New Chat</h2>
                    <form method="dialog" className="form-control">
                        <label className="label">Username</label>
                        <input
                            type="text"
                            value={chatName}
                            className="input input-primary"
                            onChange={(e) => setChatName(e.target.value)}
                        />
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={handleStartChat}>
                                Start
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default NewChatModalBtn;