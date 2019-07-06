import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { ContainerDiv, HeaderTitleDiv } from "../../commonStyles";
import LoginButton from "./LoginButton";
import { login, PRIVATE_URL } from "../../utils";
import ErrorNotification from "../error/ErrorNotification";
import { FormContainerDiv, FieldContainerDiv } from "./styles";

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
                                    <LoginButton isSubmitting={isSubmitting} />
                                </FieldContainerDiv>
                            </Form>
                            {loginError && (
                                <ErrorNotification
                                    error={loginError}
                                    message="Please type in the correct credentials"
                                />
                            )}
                        </FormContainerDiv>
                    );
                }}
            </Formik>
        </ContainerDiv>
    );
};

export default Login;
