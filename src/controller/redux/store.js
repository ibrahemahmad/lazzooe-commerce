import {createStore} from "redux";
import rootReducer from './RootResucers'

const store = createStore(rootReducer,);

export default store;