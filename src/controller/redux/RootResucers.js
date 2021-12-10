
import {combineReducers} from "redux";
import mainReducer from "./mainreducer/MainReducer";


const rootReducer = combineReducers({
    mainReducer: mainReducer,


})
export default rootReducer;