#   User Microservice

##  Spring-Boot Microservice which manages Users and Groups in a Chat-Application

##  API Endpoints: 
        - POST:
            - CreateUser: //localhost:50010/users/createUser (Body=Username)
                //Function: Creates or Logs User {Username} in if already existing
                //Returns: User {Username}
            - CreateGroup: //localhost:50010/users/createGroup (Body=Groupname,Descr)
                //Function: Creates Group {Groupname} with Descr {Descr}
                //Returns: Group {Group}
            - Subscribe: //localhost:50010/users/subscribe (Body=Groupname,Username)
                //Function: Adds User {Username} as subscriber of Group {Groupname}
            - Block: //localhost:50010/users/block (Body=Blocker,Blockee)
                //Function: Adds User {Blockee} to User {Blocker}'s blocklist
            - BanUser: //localhost:50010/users/banUser (Body=Username)
                //Function: Bans User {Username}

        - PATCH:
            -ChangeUserDescr: //localhost:50010/users/changeUserDescr (Body=Username,Descr)
                //Function: Changes {Descr} of User {Username}
            -ChangeGroupDescr: //localhost:50010/users/changeGroupDescr (Body=Groupname,Descr)
                //Function: Changes {Descr} of Group {Groupname}

        - GET:
            - GetAllUsers: //localhost:50010/users/users
                //Returns: All Users
            - GetUserByID: //localhost:50010/users/uid/{id}
                //Returns: User {id}
            - GetUserByUsername: //localhost:50010/users/username/{Username}
                //Returns: User {Username}

            - GetAllGroups: //localhost:50010/users/groups
                //Returns: All Groups
            - GetGroupByID: //localhost:50010/users/gid/{id}
                //Returns: Group {id}
            - GetGroupByGroupname: //localhost:50010/users/groupname/{Groupname}
                //Returns: Group {Groupname}

            - GetSubscribers: //localhost:50010/users/subscribers/{Groupname}
                //Returns: List of all Users who subscribed to {Groupname} 
            - GetSubscribed: //localhost:50010/users/subscribed/{Username}
                //Returns: List of all Groups {Username} subscribed to 
            - IsSubscribed: //localhost:50010/users/isSubscribed/{Groupname}/{Username}
                //Returns: Bool if User {Username} is subscribed to Group {Groupname}

            - GetBlocking: //localhost:50010/users/blocking/{Username}
                //Returns: List of all the Users who are blocked by {Username}
            - GetBlockedBy: //localhost:50010/users/blockedBy/{Username}
                //Returns: List of all the Users who blocked {Username}
            - IsUserBlocked: //localhost:50010/users/isBlocked/{Blocker}/{Blockee}
                //Returns: Bool if User {Blockee} is blocked by User {Blocker}    

            - IsBanned: //localhost:50010/users/banned/{Username}
                //Returns: Bool if User {Username} is banned

        - DELETE:
            - deleteUser: //localhost:50010/users/username/{Username}
                //Function: Deletes User {Username} from all Tables
            - deleteGroup: //localhost:50010/users/groupname/{Groupname}
                //Function: Deletes Group {Groupname} from all Tables
            - unblockUser: //localhost:50010/users/unblock/{Blocker}/{Blockee}
                //Function: Removes User {Blockee} from User {Blocker}'s blocklist