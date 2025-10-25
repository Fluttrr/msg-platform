import { User } from '../models.js';

export const identify = (ws, user) => {
    const request = {
        type: 'identify',
        payload: {
            id: user.id,
        },
    };

    wsSend(ws, request);
}

// Function to receive messages
export const chatConnect = (ws, id, is_group) => {
    const request = {
        type: 'messagelist',
        payload: {
            id: id,
            is_group: is_group,
        },
    }

    wsSend(ws, request);
};

// Function to send a message
export const sendMessage = (ws, sender, recipient, message, is_group_msg = false) => {
    const request = {
        type: 'sendmessage',
        payload: {
            sender: sender,
            recipient: recipient,
            content: message,
            is_group_msg: is_group_msg,
        },
    };

    wsSend(ws, request);
};

function wsSend(ws, json) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(json));
    } else {
        console.error('WebSocket is not open');
    }
}

// Function to get user info
export const getChats = (ws) => {
    const request = {
        type: 'userlist',
        payload: {},
    };

    wsSend(ws, request);
}

export const getUserById = async (ip, id) => {
    let url = `http://${ip}:50010/users/uid/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getUserByName = async (ip, name) => {
    let url = `http://${ip}:50010/users/username/${name}`;
    const response = await fetch(url);
    if (response.status === 404) {
        return null;
    }
    const data = await response.json();
    return data;
}

export const changeUserDescription = async (ip, user, description) => {
    let url = `http://${ip}:50010/users/changeUserDescr`;
    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id, descr: description }),
    });
}

export const loginWithUsername = async (ip, username) => {
    let url = `http://${ip}:50010/users/createUser`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
    });
    const data = await response.json();
    return data;
}

export const isUserBlocked = async (ip, blocker, blockee) => {
    let url = `http://${ip}:50010/users/isBlocked/${blocker}/${blockee}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const blockUser = async (ip, blocker, blockee) => {
    let url = `http://${ip}:50010/users/block`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blocker: blocker.id, blockee: blockee.id }),
    });
}

export const unblockUser = async (ip, blocker, blockee) => {
    let url = `http://${ip}:50010/users/unblock/${blocker.id}/${blockee.id}`;
    const response = await fetch(url, {
        method: 'DELETE',
    });
}

export const getBlocklist = async (ip, user) => {
    const userIdUrl = `http://${ip}:50010/users/blocking/${user.id}`;
    const response = await fetch(userIdUrl);
    const data = await response.json();

    const blocklistPromises = data.map(async (userId) => {
        const userUrl = `http://${ip}:50010/users/uid/${userId}`;
        const userResponse = await fetch(userUrl);
        return await userResponse.json();
    });

    const blocklist = await Promise.all(blocklistPromises);
    return blocklist;
}

export const createOrJoinGroup = async (ip, groupName, user) => {
    let url = `http://${ip}:50010/users/createGroup/${user.id}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName }),
    });
    const data = await response.json();
    return data;
}

export const getGroups = async (ip, user) => {
    let url = `http://${ip}:50010/users/subscribed/${user.id}`;
    const response = await fetch(url);
    const groupIds = await response.json();

    const groupPromises = groupIds.map(async (groupId) => {
        const groupUrl = `http://${ip}:50010/users/gid/${groupId}`;
        const groupResponse = await fetch(groupUrl);
        return await groupResponse.json();
    });

    const groups = await Promise.all(groupPromises);
    return groups;
}

export const changeGroupDescription = async (ip, group, description) => {
    let url = `http://${ip}:50010/users/changeGroupDescr`;
    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: group, descr: description }),
    });
}

export const getGroupUserlist = async (ip, group) => {
    let url = `http://${ip}:50010/users/subscribers/${group}`;
    const response = await fetch(url);
    const data = await response.json();

    const userPromises = data.map(async (user) => {
        const userUrl = `http://${ip}:50010/users/uid/${user}`;
        const userResponse = await fetch(userUrl);
        return await userResponse.json();
    });

    const users = await Promise.all(userPromises);
    return users;
}