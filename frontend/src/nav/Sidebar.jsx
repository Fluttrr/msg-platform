import React from 'react';
import SidebarButtons from './SidebarButtons';
import SidebarChannels from './SidebarChannels';


function Sidebar() {
    return (
        <div className="overflow-auto static w-1/4 h-screen max-h-full bg-base-200 text-white">
            <SidebarButtons />
            <SidebarChannels />
        </div>
    );
}

export default Sidebar;