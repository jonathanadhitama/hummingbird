import React from "react";
import SimpleCrypto from "simple-crypto-js";
import { Slide } from "@material-ui/core";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

const user_emails = ["admin@test.com", "random@test.com", "user@test.com"];
const user_passwords = ["admin", "random", "user"];
const crypto = new SimpleCrypto(process.env.REACT_APP_SECRET);
const USER_TOKEN_KEY = "token";

export const USERS = user_emails.map((email, index) => ({
    email,
    password: crypto.encrypt(user_passwords[index])
}));

export const isLoggedIn = () => {
    return Boolean(localStorage.getItem(USER_TOKEN_KEY));
};

export const login = (loginEmail, password) => {
    const user = USERS.find(({ email }) => email === loginEmail);
    if (Boolean(user) && crypto.decrypt(user.password) === password) {
        localStorage.setItem(USER_TOKEN_KEY, user.password);
        return true;
    } else {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
};

export const SlideUpTransition = props => {
    return <Slide direction="up" {...props} />;
};

export const renderTextField = (name, required, type, label) => (
    <Field
        name={name}
        label={label}
        required={required}
        type={type}
        component={TextField}
        variant="outlined"
        fullWidth={true}
    />
);

//URL Constants
export const LOGIN_URL = "/login";
export const PRIVATE_URL = "/private";
export const HOME_URL = "/home";
export const EMPLOYEES_API = "https://jsonplaceholder.typicode.com/users";
export const SUCCESS_CODE = 200;
export const MIDDLEWARE_URL = "http://localhost:8000/places";
