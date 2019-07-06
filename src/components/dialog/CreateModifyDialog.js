import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button
} from "@material-ui/core";
import DialogTitle from "./DialogTitleHelper";
import { Formik, Form } from "formik";
import { renderTextField, SlideUpTransition } from "../../utils";
import { FieldContainerDiv } from "../../commonStyles";
import validationSchema from "./validationSchema";

const TEXT_FIELDS = [
    { name: "firstName", label: "FIRST NAME", required: true, type: "text" },
    { name: "lastName", label: "LAST NAME", required: true, type: "text" },
    { name: "email", label: "EMAIL ADDRESS", required: true, type: "text" }
];

const CreateModifyDialog = ({ user, submitAction, cancelAction }) => (
    <Dialog
        open={true}
        TransitionComponent={SlideUpTransition}
        keepMounted
        onClose={cancelAction}
    >
        <DialogTitle onClose={cancelAction}>
            {Boolean(user)
                ? "MODIFY AN EXISTING EMPLOYEE"
                : "CREATE A NEW EMPLOYER"}
        </DialogTitle>
        <Formik
            initialValues={
                Boolean(user) &&
                Boolean(user.id) &&
                Boolean(user.firstName) &&
                Boolean(user.lastName) &&
                Boolean(user.email)
                    ? {
                          id: user.id,
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email
                      }
                    : {
                          id: null,
                          firstName: "",
                          lastName: "",
                          email: ""
                      }
            }
            validationSchema={validationSchema}
            onSubmit={(
                { id, firstName, lastName, email },
                { setSubmitting }
            ) => {
                setSubmitting(true);
                submitAction({ id, firstName, lastName, email });
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <DialogContent>
                        {TEXT_FIELDS.map(
                            ({ name, label, required, type }, index) => (
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
                    </DialogContent>
                    <DialogActions>
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            style={{
                                color: "#2699FB",
                                backgroundColor: "white",
                                border: "2px solid #2699FB",
                                borderRadius: "5px"
                            }}
                            color="primary"
                        >
                            {Boolean(user) ? "MODIFY" : "CREATE"}
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            style={{
                                color: "red",
                                backgroundColor: "white",
                                border: "2px solid red",
                                borderRadius: "5px"
                            }}
                            onClick={cancelAction}
                            color="secondary"
                        >
                            CANCEL
                        </Button>
                    </DialogActions>
                </Form>
            )}
        </Formik>
    </Dialog>
);

CreateModifyDialog.propTypes = {
    user: PropTypes.objectOf({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),
    submitAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func.isRequired
};

export default CreateModifyDialog;
