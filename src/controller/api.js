//make global api, under name myApi

import axios from "axios";

const myApi = axios.create({
    baseURL: "http://localhost:3300",
})


export default myApi;
