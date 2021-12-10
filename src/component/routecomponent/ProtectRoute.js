import React from "react";
import {Route} from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                //note you can put your logic into here for each route
                return <Component {...props} />;


            }}
        />
    );

};

ProtectedRoute.prototype = {
    component: PropTypes.node.isRequired,
}


export default ProtectedRoute;

