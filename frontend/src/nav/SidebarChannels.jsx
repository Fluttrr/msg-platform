import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { chatConnect, getGroups } from "../api/api";
import { UserIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { WebSocketContext } from "../contexts/WebSocketContext";

function SidebarChannels() {
    const { ws, channels, setMessages } = useContext(WebSocketContext);
    const { loggedInUser, selectedUser, setSelectedUser, groups, setGroups, serverIP, isGroupSelected, setIsGroupSelected } = useContext(AppContext);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groups = await getGroups(serverIP, loggedInUser);
                if (groups) {
                    console.log(groups);
                    setGroups(groups);
                }
            } catch (error) {
                console.error("Failed to fetch groups:", error);
            }
        };

        fetchGroups();
    }, [serverIP, loggedInUser]);

    return (
        <div>
            <h1 className="menu-title"><span><UserIcon className="inline w-5 h-5" /> Users</span></h1>
            <ul className="w-full text-left menu">
                {channels.map((chat, index) => (
                    <li>
                        <button
                            key={index}
                            onClick={() => {
                                setIsGroupSelected(false);
                                setSelectedUser(chat);
                                setMessages([]);
                                chatConnect(ws, chat.id, false);
                            }}
                            className={`w-full text-left mb-2 ${!isGroupSelected && selectedUser.id === chat.id ? 'active' : ''
                                }`}
                        >
                            <span>{chat.username}</span>
                        </button>
                    </li>

                ))}
            </ul>
            <h1 className="menu-title"><span><UserGroupIcon className="inline w-5 h-5" /> Groups</span></h1>
            <ul className="w-full text-left menu">
                {groups.map((group, index) => (
                    <li>
                        <button
                            key={index}
                            onClick={() => {
                                setIsGroupSelected(true);
                                setSelectedUser(group);
                                setMessages([]);
                                chatConnect(ws, group.id, true);
                            }}
                            className={`w-full text-left mb-2 ${isGroupSelected && selectedUser.id === group.id ? 'active' : ''
                                }`}
                        >
                            <span>{group.name}</span>
                        </button>
                    </li>

                ))}
            </ul>
        </div>

    );
}

export default SidebarChannels;