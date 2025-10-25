class User {
    constructor(id, name, description, isGroup) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isGroup = isGroup;
    }
}

class Message {
    constructor(id, user, recipient, content, timestamp = new Date()) {
        this.id = id;
        this.user = user;
        this.recipient = recipient;
        this.content = content;
        this.timestamp = timestamp;
    }
}

class NewMessage {
    constructor(user, recipient, content) {
        this.user = user;
        this.recipient = recipient;
        this.content = content;
    }
}

export { User, Message };