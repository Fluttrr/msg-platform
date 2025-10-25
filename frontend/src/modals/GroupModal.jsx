import React, { useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { changeGroupDescription, getGroupUserlist } from "../api/api";
import { UserIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

function GroupModal() {
    const { selectedUser, setSelectedUser, serverIP, isGroupSelected } = React.useContext(AppContext);
    const [description, setDescription] = React.useState(selectedUser.descr);
    const [userlist, setUserlist] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!isGroupSelected || !selectedUser) return;
            const users = await getGroupUserlist(serverIP, selectedUser.id);
            setUserlist(users);
        };
        fetchData();
    }, [serverIP, selectedUser]);

    useEffect(() => {
        setDescription(selectedUser.descr);
    }, [selectedUser]);

    const handleSave = async () => {
        await changeGroupDescription(serverIP, selectedUser.id, description);
        setSelectedUser({ ...selectedUser, descr: description });
    };

    return (
        <div>
            <dialog id="group_modal" className="modal">
                <div className="modal-box">
                    <h1 className="text-primary text-2xl font-bold mb-6">{selectedUser.name}</h1>
                    <p className="text-neutral-content"><span><UserIcon className="inline w-5 h-5" /> Users</span></p>
                    <table className="table w-full mt-2 mb-6">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userlist.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.descr.length > 20 ? user.descr.substring(0, 20) + '...' : user.descr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-neutral-content mb-2"><span><ChatBubbleBottomCenterTextIcon className="inline w-5 h-5" /> Description</span></p>
                    <form method="dialog" className="form-control" onSubmit={handleSave}>
                        <textarea className="textarea textarea-primary" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <div className="modal-action">
                            <button className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </dialog >
        </div>
    );
}

export default GroupModal;