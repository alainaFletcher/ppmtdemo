import axios from "axios";
import { SET_CURRENT_USER } from "../actions/types";
import jwt_decode from "jwt-decode";
import { logout } from "../actions/securityActions";

const setAuthHeader = token => {
    if(token){
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

const updateToken = store => {
    const jwtToken = localStorage.getItem("jwtToken")

    if(jwtToken){
        setAuthHeader(jwtToken);
        const decoded = jwt_decode(jwtToken);
        store.dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
        })

        const currTime = Date.now()/1000
        if(decoded.exp < currTime){
            store.dispatch(logout())
            window.location.href="/"
        }
    }
}

export {setAuthHeader, updateToken}