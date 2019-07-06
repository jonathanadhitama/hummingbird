import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, LOGIN_URL } from "../../utils";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            return (
                <React.Fragment>
                    {isLoggedIn() ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: LOGIN_URL,
                                state: { from: props.location }
                            }}
                        />
                    )}
                </React.Fragment>
            );
        }}
    />
);

export default PrivateRoute;
