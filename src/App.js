import React from "react";
import Header from "./components/header/Header";
import { LOGIN_URL, HOME_URL, PRIVATE_URL, isLoggedIn } from "./utils";
import Home from "./components/home";
import Login from "./components/login";
import Private from "./components/private";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import styled from "styled-components";

const PUBLIC_ROUTES = [
    { url: LOGIN_URL, exact: true, component: Login },
    { url: HOME_URL, exact: true, component: Home }
];
const PRIVATE_ROUTES = [{ url: PRIVATE_URL, exact: true, component: Private }];

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const SectionContainer = styled.div`
    flex: 1;
    width: 100%;
`;

function App() {
    return (
        <Router>
            <AppContainer>
                <Header />
                <SectionContainer>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            if (isLoggedIn()) {
                                return <Redirect to={PRIVATE_URL} />;
                            } else {
                                return <Redirect to={HOME_URL} />;
                            }
                        }}
                    />
                    {PUBLIC_ROUTES.map((route, index) => (
                        <Route
                            key={`PUBLIC-${index}`}
                            exact={route.exact}
                            path={route.url}
                            component={route.component}
                        />
                    ))}
                    {PRIVATE_ROUTES.map((route, index) => (
                        <PrivateRoute
                            key={`PRIVATE-${index}`}
                            exact={route.exact}
                            path={route.url}
                            component={route.component}
                        />
                    ))}
                </SectionContainer>
            </AppContainer>
        </Router>
    );
}

export default App;
