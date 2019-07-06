import React from "react";
import styled from "styled-components";
import { LOGIN_URL, PRIVATE_URL, HOME_URL } from "../../utils";
import { Link } from "react-router-dom";

const ContainerDiv = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
`;

const EachLinkDiv = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: grey;
    border-right: ${props =>
        props.index === LINKS.length - 1 ? "none" : "2px solid white"};
`;

const LINKS = [
    { url: LOGIN_URL, label: "LOGIN PAGE" },
    { url: PRIVATE_URL, label: "PRIVATE PAGE" },
    { url: HOME_URL, label: "HOME PAGE" }
];

const Header = () => (
    <ContainerDiv>
        {LINKS.map(({ url, label }, index) => (
            <EachLinkDiv key={`HEADER-${index}`} index={index}>
                <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={url}
                >
                    {label}
                </Link>
            </EachLinkDiv>
        ))}
    </ContainerDiv>
);

export default Header;
