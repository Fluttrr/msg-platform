import React, { useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { changeUserDescription } from "../api/api";

function EditProfileModalBtn() {
    const { loggedInUser, serverIP } = React.useContext(AppContext);
    const [description, setDescription] = React.useState(loggedInUser.description);

    useEffect(() => {
        setDescription(loggedInUser.descr);
    }, [loggedInUser.descr]);

    const handleSave = () => {
        changeUserDescription(serverIP, loggedInUser, description);
        loggedInUser.description = description;
    };

    return (
        <div>
            <button className="btn btn-neutral" onClick={() => document.getElementById('edit_profile_modal').showModal()}>
                <UserCircleIcon className="h-6 w-6" />
            </button>
            <dialog id="edit_profile_modal" className="modal">
                <div className="modal-box">
                    <h1 className="text-primary text-2xl font-bold mb-2">{loggedInUser.username}</h1>
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

export default EditProfileModalBtn;