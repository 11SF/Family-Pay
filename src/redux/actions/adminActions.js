import { ActionTypes } from "../contants/action-types";
export const setAdminData = (adminData) => {
    return {
        type: ActionTypes.SET_ADMINDATA,
        payload: adminData
    }
}