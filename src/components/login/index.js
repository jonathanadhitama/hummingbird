import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { ContainerDiv, HeaderTitleDiv } from "../../commonStyles";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { login, PRIVATE_URL } from "../../utils";
import ErrorNotification from "../error/ErrorNotification";

const renderTextField = (name, required, type, label) => (
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

const TEXT_FIELDS = [
    { name: "email", label: "EMAIL ADDRESS", required: true, type: "text" },
    { name: "password", label: "PASSWORD", required: true, type: "password" }
];

const FormContainerDiv = styled.div`
    width: 50%;
    height: 40%;
`;

const FieldContainerDiv = styled.div`
    width: 100%;
    padding-bottom: 20px;
`;

const buttonStyles = () => ({
    loginButton: {
        color: "#2699FB",
        backgroundColor: "white",
        border: "2px solid #2699FB",
        width: "100%",
        fontSize: "11px",
        fontWeight: "bold",
        padding: "10px 0",
        marginBottom: 20
    }
});

const LoginButton = ({ classes, isSubmitting }) => (
    <Button
        variant="outlined"
        type="submit"
        className={classes.loginButton}
        disabled={isSubmitting}
    >
        LOGIN
    </Button>
);

const LoginButtonWithStyles = withStyles(buttonStyles)(LoginButton);

const Login = ({ history }) => {
    const [loginError, setLoginError] = useState(false);

    return (
        <ContainerDiv
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
        >
            <Formik
                onSubmit={({ email, password }, { setSubmitting }) => {
                    setSubmitting(true);
                    const result = login(email, password);
                    if (!result) {
                        setSubmitting(false);
                        setLoginError(true);
                    } else {
                        setSubmitting(false);
                        history.push(PRIVATE_URL);
                    }
                }}
            >
                {({ isSubmitting }) => {
                    return (
                        <FormContainerDiv>
                            <HeaderTitleDiv>LOGIN</HeaderTitleDiv>
                            <Form>
                                {TEXT_FIELDS.map(
                                    (
                                        { name, required, type, label },
                                        index
                                    ) => (
                                        <FieldContainerDiv key={index}>
                                            {renderTextField(
                                                name,
                                                required,
                                                type,
                                                label
                                            )}
                                        </FieldContainerDiv>
                                    )
                                )}
                                <FieldContainerDiv>
                                    <LoginButtonWithStyles
                                        isSubmitting={isSubmitting}
                                    />
                                </FieldContainerDiv>
                            </Form>
                            <ErrorNotification
                                error={loginError}
                                message="Please type in the correct credentials"
                            />
                        </FormContainerDiv>
                    );
                }}
            </Formik>
        </ContainerDiv>
    );
};

export default Login;
