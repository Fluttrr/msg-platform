import React from 'react';
import { useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { createOrJoinGroup } from '../api/api';
import { AppContext } from '../contexts/AppContext';

function JoinGroupModalBtn() {
    const [groupName, setGroupName] = useState('');
    const { serverIP, groups, setGroups, loggedInUser } = React.useContext(AppContext);

    const handleGroupJoin = async () => {
        const newGroup = await createOrJoinGroup(serverIP, groupName, loggedInUser);
        setGroups(Array.isArray(groups) ? [...groups, newGroup] : [newGroup]);
    };

    return (
        <div>
            <button className="btn btn-neutral" onClick={() => document.getElementById('join_group_modal').showModal()}>
                <UserGroupIcon className="h-6 w-6" />
            </button>
            <dialog id="join_group_modal" className="modal">
                <div className="modal-box">
                    <h2 className="text-primary text-xl font-bold mb-4">Join or create a Group</h2>
                    <form method="dialog" className="form-control">
                        <label className="label">Group Name</label>
                        <input
                            type="text"
                            value={groupName}
                            className="input input-primary"
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={handleGroupJoin}>
                                Join/Create
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default JoinGroupModalBtn;