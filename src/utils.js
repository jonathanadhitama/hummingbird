import SimpleCrypto from "simple-crypto-js";

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

//URL Constants
export const LOGIN_URL = "/login";
export const PRIVATE_URL = "/private";
export const HOME_URL = "/home";
