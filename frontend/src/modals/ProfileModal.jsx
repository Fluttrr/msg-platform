import React from "react";
import { AppContext } from "../contexts/AppContext";
import { unblockUser, blockUser } from "../api/api";

function ProfileModal() {
    const { selectedUser, setSelectedUser, loggedInUser, serverIP, blocklist, setBlocklist } = React.useContext(AppContext);

    const toggleBlock = async (event) => {
        event.preventDefault();
        if (selectedUser.isBlocked) {
            unblockUser(serverIP, loggedInUser, selectedUser);
            setBlocklist(blocklist.filter(blockedUser => blockedUser.id !== selectedUser.id));
        }
        else {
            blockUser(serverIP, loggedInUser, selectedUser);
            setBlocklist([...blocklist, selectedUser]);
        }
        setSelectedUser({ ...selectedUser, isBlocked: !selectedUser.isBlocked });
    }

    return (
        <dialog id="profile_modal" className="modal">
            <div className="modal-box">
                <h1 className="text-primary text-2xl font-bold mb-2">{selectedUser.username}</h1>
                <p className="text-base-content">{selectedUser.descr}</p>
                <form method="dialog" className="form-control">
                    <div className="modal-action">
                        <button className="btn btn-neutral" onClick={(toggleBlock)}>
                            {selectedUser.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                        <button className="btn btn-primary">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog >
    );
}

export default ProfileModal;