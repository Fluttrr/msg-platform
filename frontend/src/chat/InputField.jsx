import React, { useState, useContext } from "react";
import { PaperAirplaneIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { WebSocketContext } from "../contexts/WebSocketContext.jsx";
import { AppContext } from "../contexts/AppContext.jsx";
import { sendMessage } from "../api/api";

function InputField() {
    const [message, setMessage] = useState('');
    const { ws } = React.useContext(WebSocketContext);
    const { loggedInUser, selectedUser, isGroupSelected } = useContext(AppContext);

    const submitMessage = (event) => {
        event.preventDefault();
        if (message.trim()) {
            console.log('Sending message:', message);
            sendMessage(ws, loggedInUser.id, selectedUser.id, message, isGroupSelected);
            setMessage(''); // Clear the input field
        }
    };

    return (
        <form className="fixed left-1/4 bottom-0 inset-x-0 w-3/4 bg-none p-2 flex items-center" onSubmit={submitMessage}>
            <input
                type="text"
                className="flex-grow input input-primary"
                placeholder="Type your message here!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                className="btn btn-neutral ml-2 p-2 flex items-center justify-center"
                style={{ width: '40px', height: '40px' }}
            >
                <RocketLaunchIcon />
            </button>
            <button
                type="submit"
                className="btn btn-primary ml-2 p-2 flex items-center justify-center"
                style={{ width: '40px', height: '40px' }}
            >
                <PaperAirplaneIcon />
            </button>
        </form>
    );
}

export default InputField;