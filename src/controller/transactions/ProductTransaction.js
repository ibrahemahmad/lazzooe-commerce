//all products transaction with server..

import myApi from "../api";
import store from "../redux/store";
import * as actions from "../redux/Actions";
import {responseDone, responseNotFound} from "../ServerErrorHandling";
import {message} from "antd";

export const getProductsInServer = async ({startAt = 0, limit = 10000000}) => {
    try {
        const response = await myApi.get(`/products/paginate?start=${startAt}&limit=${limit}`)

        if (startAt > 1) {
            store.dispatch({type: actions.GETPRODUCTSTWO, payload: response?.data?.data});
        } else {
            store.dispatch({type: actions.GETPRODUCTS, payload: response?.data?.data});

        }

        store.dispatch({type: actions.STORETOTALPRODUCT, payload: response?.data?.count});

        return responseDone;
    } catch (e) {
        return responseNotFound;
    }
}
export const addProductForServer = async (formData, idStore, idCat) => {
    try {
        const response = await myApi.post(`/products/${idStore}/${idCat}/products/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        await getProductsInServer({startAt: 0, limit: 5});
        return responseDone;
    } catch (e) {

        const st = e?.response?.data?.message.toString()
        if (st?.includes("ER_DUP_ENTRY")) {
            message.error(`duplicate name!`);
        }

        return responseNotFound;
    }
}
