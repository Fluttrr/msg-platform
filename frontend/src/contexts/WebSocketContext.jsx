import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { getChats, getUserById, isUserBlocked } from '../api/api';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [channels, setChannels] = useState([]);
    const [ws, setWs] = useState(null);
    const { isLoggedIn, loggedInUser, serverIP } = useContext(AppContext);

    useEffect(() => {
        if (!isLoggedIn) return;

        const socket = new WebSocket('ws://' + serverIP + ':50011/ws');

        socket.onopen = () => {
            console.log('WebSocket connection established');
            setWs(socket);
        };

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'messages') {
                // Messages are received as complete objects, but only with User IDs, so we need to fetch the correct name to display
                let messages = message.payload;
                messages = await Promise.all(messages.map(async (message) => {
                    const userData = await getUserById(serverIP, message.sender);
                    return {
                        sender: userData.username,
                        content: message.content,
                        created_at: new Date(message.created_at).toLocaleString(),
                    };
                }));
                setMessages((prevMessages) => [...prevMessages, ...messages]);
            } else if (message.type === 'users') {
                // Users are received as a list of IDs, so we need to fetch the correct names to display
                let users = message.payload;
                users = await Promise.all(users.map(async (user) => {
                    const userData = await getUserById(serverIP, user);
                    const isBlocked = await isUserBlocked(serverIP, loggedInUser.id, user);
                    userData.isBlocked = isBlocked;
                    return userData;
                }));
                setChannels((prevChannels) => [...prevChannels, ...users]);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error.message);
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed', event);
            // Retry connection after 1 second
            setTimeout(() => {
                if (isLoggedIn) {
                    const newSocket = new WebSocket('ws://' + serverIP + ':50011/ws');
                    setWs(newSocket);
                }
            }, 1000);
        };

        return () => {
            socket.close();
        };
    }, [isLoggedIn, serverIP]);

    useEffect(() => {
        console.log('WebSocket state updated:', ws);
        if (ws) {
            getChats(ws);
        }
    }, [ws]);

    return (
        <WebSocketContext.Provider value={{ ws, messages, setMessages, channels, setChannels }}>
            {children}
        </WebSocketContext.Provider>
    );
};