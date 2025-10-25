import React from "react";

function MessageComponent({ messageKey, user, timestamp, content }) {
    return (
        <div className="mb-2">
            <div className="display-block">
                <span className="font-bold text-primary mr-2">{user}</span>
                <span className="text-xs text-base-content opacity-50">{timestamp.toLocaleString()}</span>
            </div>
            <p className="text-base-content">{content}</p>
        </div>
    );
}

export default MessageComponent;