//because of project size i will use only one reducer.
import * as actions from '../Actions';

let initalState = {
    stores: [],
    categories: [],
    products: [],
    totalProduct: 0
}

function mainReducer(state = initalState, action) {
    switch (action.type) {
        case actions.GETSTORES:
            return {
                ...state,
                stores: action.payload
            }
        case actions.ADDSTORES:
            return {
                ...state,
                stores: [...state?.stores, action.payload]
            }
        case actions.GETCATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case  actions.ADDCATEGORIES:
            return {
                ...state,
                categories: [...state.categories, action.payload]

            }
        case actions.GETPRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case actions.GETPRODUCTSTWO:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case actions.STORETOTALPRODUCT:
            return {
                ...state,
                totalProduct: action.payload
            }

        default:
            return state;

    }
}


export default mainReducer;