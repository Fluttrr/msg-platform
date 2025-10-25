import React from "react";
import NewChatModalBtn from '../modals/NewChatModalBtn';
import BlocklistModalBtn from "../modals/BlocklistModalBtn";
import JoinGroupModalBtn from "../modals/JoinGroupModalBtn";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import EditProfileModalBtn from "../modals/EditProfileModalBtn";

function SidebarButtons() {
    const { setViewOwnProfile } = useContext(AppContext)

    return (
        <ul className="flex flex-wrap justify-around w-full text-left p-4 gap-4">
            <li>
                <NewChatModalBtn />
            </li>
            <li>
                <EditProfileModalBtn />
            </li>
            <li>
                <JoinGroupModalBtn />
            </li>
            <li>
                <BlocklistModalBtn />
            </li>
        </ul>

    );
}

export default SidebarButtons;