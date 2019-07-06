import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
} from "@material-ui/core";
import { SlideUpTransition } from "../../utils";
import CancelIcon from "@material-ui/icons/Cancel";
import DialogTitle from "./DialogTitleHelper";

const formatUser = ({ firstName, lastName, email }) =>
    `${firstName} ${lastName} - ${email}`;

const DeleteDialog = ({ deleteAction, cancelAction, users }) => (
    <Dialog
        open={true}
        TransitionComponent={SlideUpTransition}
        keepMounted
        onClose={cancelAction}
    >
        <DialogTitle onClose={cancelAction}>
            ARE YOU SURE YOU WANT TO DELETE{" "}
            {users.length > 1 ? "THESE EMPLOYEES" : "THIS EMPLOYEE"}?
        </DialogTitle>
        <DialogContent>
            <List>
                {users.map((user, index) => (
                    <ListItem key={`USER-${index}`}>
                        <ListItemIcon>
                            <CancelIcon />
                        </ListItemIcon>
                        <ListItemText primary={formatUser(user)} />
                    </ListItem>
                ))}
            </List>
        </DialogContent>
        <DialogActions>
            <Button
                style={{
                    color: "#2699FB",
                    backgroundColor: "white",
                    border: "2px solid #2699FB",
                    borderRadius: "5px"
                }}
                onClick={deleteAction}
                color="primary"
            >
                YES
            </Button>
            <Button
                style={{
                    color: "red",
                    backgroundColor: "white",
                    border: "2px solid red",
                    borderRadius: "5px"
                }}
                onClick={cancelAction}
                color="secondary"
            >
                NO
            </Button>
        </DialogActions>
    </Dialog>
);

DeleteDialog.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.objectOf({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ),
    deleteAction: PropTypes.func.isRequired,
    cancelAction: PropTypes.func.isRequired
};

export default DeleteDialog;
