import React from "react";
import {Route, Redirect, useHistory} from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    const history = useHistory();
    return (
        <Route>
            {() =>
                props.loggedIn ? <Component {...props} /> : <Redirect to={'/'} />
            }
        </Route>
    );
}

export default ProtectedRoute;