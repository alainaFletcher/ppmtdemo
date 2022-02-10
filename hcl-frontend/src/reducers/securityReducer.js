import { SET_CURRENT_USER } from "../actions/types";

const initState = {
    user: {},
    validToken: false
}

const validatePayload=payload=>{
    if(payload){
        return true
    }else {
        return false
    }
}

export default function(state=initState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: validatePayload(action.payload),
                user: action.payload
            }
    
        default:
            return state;
    }
}