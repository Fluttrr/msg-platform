import React, { useEffect, useRef, useContext } from "react";
import InputField from "./InputField";
import MessageComponent from "./Message";
import { AppContext } from "../contexts/AppContext";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ProfileModal from "../modals/ProfileModal";
import { WebSocketContext } from "../contexts/WebSocketContext";
import GroupModal from "../modals/GroupModal";

function Chat() {
    const { selectedUser, isGroupSelected } = useContext(AppContext);
    const { messages } = useContext(WebSocketContext);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={chatContainerRef} className="bg-base-300 overflow-auto relative w-3/4 pb-12 h-full">
            <ProfileModal />
            <GroupModal />
            <div className="bg-base-200 p-4 font-bold text-xl w-full">
                <div className="tooltip tooltip-bottom" data-tip="View profile">
                    <button className="flex items-center" onClick={() => {
                        if (isGroupSelected)
                            document.getElementById('group_modal').showModal()
                        else
                            document.getElementById('profile_modal').showModal()
                    }}>
                        <span className="text-primary">{selectedUser && (isGroupSelected ? selectedUser.name : selectedUser.username)}</span>
                        {selectedUser && <ChevronRightIcon className="h-4 w-4 inline-block ml-1" />}
                    </button>

                </div>
            </div>

            <div className="p-4">
                {
                    messages.map((message, index) => (
                        <MessageComponent
                            messageKey={index}
                            user={message.sender}
                            content={message.content}
                            timestamp={message.created_at}
                        />
                    ))
                }
            </div>
            {selectedUser && <InputField />}
        </div >
    );
}

export default Chat;