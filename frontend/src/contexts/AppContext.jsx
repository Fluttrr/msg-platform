import React, { createContext, useState } from 'react';
import { User } from '../models';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [isGroupSelected, setIsGroupSelected] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [serverIP, setServerIP] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [groups, setGroups] = useState([]);
    const [blocklist, setBlocklist] = useState([]);

    return (
        <AppContext.Provider value={{
            selectedUser,
            setSelectedUser,
            loggedInUser,
            setLoggedInUser,
            serverIP,
            setServerIP,
            isLoggedIn,
            setIsLoggedIn,
            groups,
            setGroups,
            isGroupSelected,
            setIsGroupSelected,
            blocklist,
            setBlocklist
        }}>
            {children}
        </AppContext.Provider>
    );
};