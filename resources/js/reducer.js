const Reducer = (state, action) => {
    switch (action.type) {
        case "IS_AUTH":
            return {
                ...state,
                currUserName: action.payload.name
            };
        case "GET_MESSAGES":
            return {
                ...state,
                messages: action.payload
            };
            case "SET_MESSAGE":
                return {
                    ...state,
                    messages: action.payload
                };
        case "ADD_MESSAGE":
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            };
        case "CLEAR_MESSAGES":
            return {
                ...state,
                selectedChannel: []
            };
        case "GET_USERS_IN_ROOM":
            return {
                ...state,
                usersInRoom: action.payload
            };
        case "GET_DM_USERS":
                return {
                    ...state,
                    dmUsers: action.payload
                };
        case "ADD_USER_TO_ROOM":
            return {
                ...state,
                usersInRoom: state.usersInRoom.concat(action.payload)
            };
        case "USER_LEAVES_ROOM":
            return {
                ...state,
                posts: state.usersInRoom.filter(user => user.id !== action.payload)
            };
        case "SET_SELECTED_CHANNEL":
            return {
                ...state,
                selectedChannel: action.payload
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;
