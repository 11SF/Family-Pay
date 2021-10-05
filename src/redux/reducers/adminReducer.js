import { ActionTypes } from "../contants/action-types";

const initialState = {
    adminData: {}
}

export const productReducer = (state, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_ADMINDATA:
            return state
    
        default:
            return state
    }
}