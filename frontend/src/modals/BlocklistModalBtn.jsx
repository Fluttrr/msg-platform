import React, { useEffect } from 'react';
import { useState } from 'react';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import { getBlocklist, unblockUser } from '../api/api';
import { AppContext } from '../contexts/AppContext';

function BlocklistModalBtn() {
    const { loggedInUser, serverIP, blocklist, setBlocklist, selectedUser, setSelectedUser } = React.useContext(AppContext);

    const handleUnblockUser = async (user) => {
        unblockUser(serverIP, loggedInUser, user);
        setBlocklist(blocklist.filter(blockedUser => blockedUser.id !== user.id));
        if (user.id === selectedUser.id)
            setSelectedUser({ ...selectedUser, isBlocked: false });
    };

    useEffect(() => {
        const fetchBlocklist = async () => {
            const blocklistData = await getBlocklist(serverIP, loggedInUser);
            setBlocklist(blocklistData);
        };
        fetchBlocklist();
    }, [serverIP, loggedInUser]);

    return (
        <div>
            <button className="btn btn-neutral" onClick={() => document.getElementById('blocklist_modal').showModal()}>
                <NoSymbolIcon className="h-6 w-6" />
            </button>
            <dialog id="blocklist_modal" className="modal">
                <div className="modal-box">
                    <div className="modal-header flex justify-between">
                        <h2 className="text-primary text-xl font-bold mb-4">Your Blocklist</h2>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blocklist.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleUnblockUser(user)}>
                                            Unblock
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <form method="dialog" className="form-control">
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={() => document.getElementById('blocklist_modal').close()}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default BlocklistModalBtn;