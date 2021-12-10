//all Categories transaction with server..


import myApi from "../api";
import * as actions from '../redux/Actions';

import store from "../redux/store";
import {responseDone, responseNotFound} from "../ServerErrorHandling";
import {message} from "antd";

export const getAllCategoriesInServer = async () => {
    try {
        const response = await myApi.get("/categories/categories")
        store.dispatch({type: actions.GETCATEGORIES, payload: response?.data?.data});
        return responseDone;
    } catch (e) {
        return responseNotFound;
    }
}

export const addCategoryForServer = async (formData, id) => {
    try {
        const response = await myApi.post(`/categories/${id}/category/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        store.dispatch({type: actions.ADDCATEGORIES, payload: response?.data?.data[0]});
        return responseDone;
    } catch (e) {

        const st = e?.response?.data?.message.toString()
        if (st?.includes("ER_DUP_ENTRY")) {
            message.error(`duplicate name!`);
        }


        return responseNotFound;
    }
}

