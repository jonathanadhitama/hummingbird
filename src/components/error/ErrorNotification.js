import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Error as ErrorIcon, Close as CloseIcon } from "@material-ui/icons";

const errorStyles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark
    },
    message: {
        display: "flex",
        alignItems: "center"
    },
    errorIcon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    closeIcon: {
        fontSize: 20
    }
});

const ErrorNotification = ({ error, message, classes }) => {
    const [open, setOpen] = useState(Boolean(error));
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setOpen(Boolean(error));
    }, [error]);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <SnackbarContent
                className={classes.error}
                message={
                    <span className={classes.message}>
                        <ErrorIcon className={classes.errorIcon} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon className={classes.closeIcon} />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
};
ErrorNotification.propTypes = {
    error: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(errorStyles)(ErrorNotification);
