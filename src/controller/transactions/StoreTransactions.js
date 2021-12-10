//all Stores transaction with server..

import myApi from "../api";
import * as actions from '../redux/Actions';
import store from "../redux/store";
import {responseDone, responseNotFound} from "../ServerErrorHandling";
import {message} from "antd";

export const getAllStoresInServer = async () => {
    try {
        const response = await myApi.get("/stores/getStores")
        store.dispatch({type: actions.GETSTORES, payload: response?.data?.data});
        return responseDone;
    } catch (e) {
        return responseNotFound;
    }
}
export const addStoresForServer = async (formData) => {
    try {
        const response = await myApi.post("/stores/addStore", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        store.dispatch({type: actions.ADDSTORES, payload: response?.data?.objectData});
        return responseDone;
    } catch (e) {

        const st = e?.response?.data?.message.toString()
        if (st?.includes("ER_DUP_ENTRY")) {
            message.error(`duplicate name!`);
        }


        return responseNotFound;
    }
}