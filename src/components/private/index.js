import React from "react";
import { ContainerDiv, HeaderTitleDiv } from "../../commonStyles";
import styled from "styled-components";
import axios from "axios";
import { EMPLOYEES_API, SUCCESS_CODE, logout, LOGIN_URL } from "../../utils";
import { List, Map } from "immutable";
import Loading from "./Loading";
import MaterialTable from "material-table";
import { TableContainerDiv } from "./styles";
import { IconButton, Button } from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import DeleteDialog from "../dialog/DeleteDialog";
import CreateModifyDialog from "../dialog/CreateModifyDialog";
import uuidv4 from "uuid/v4";

const HeaderTitleDivModified = styled(HeaderTitleDiv)`
    width: 100%;
    display: flex;
    align-items: center;
`;

class Private extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: List(),
            openDialog: false,
            selectedUser: null,
            usersToBeDeleted: [],
            status: null
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.deleteUsers = this.deleteUsers.bind(this);
        this.addOrModifyUser = this.addOrModifyUser.bind(this);
        this.logoutAction = this.logoutAction.bind(this);
    }

    getEmployees() {
        axios.get(EMPLOYEES_API).then(({ status, data }) => {
            if (status === SUCCESS_CODE) {
                let users = List();
                data.forEach(({ id, name, email }) => {
                    const [firstName, lastName] = name.split(" ");
                    users = users.push(Map({ id, firstName, lastName, email }));
                });
                this.setState({ users, status });
            }
        });
    }

    openCreateDialog = () => this.setState({ openDialog: true });

    openEditDialog = selectedUser => _event =>
        this.setState({ selectedUser, openDialog: true });

    closeDialog = () =>
        this.setState({
            openDialog: false,
            selectedUser: null,
            usersToBeDeleted: []
        });

    openDeleteDialog = users => _event =>
        this.setState({
            openDialog: true,
            usersToBeDeleted: users.map(({ id }) => id)
        });

    deleteUsers = () => {
        const { users, usersToBeDeleted } = this.state;
        const updatedUsers = users.filter(
            user => !usersToBeDeleted.includes(user.get("id"))
        );
        this.setState({
            users: updatedUsers,
            openDialog: false,
            usersToBeDeleted: []
        });
    };

    addOrModifyUser({ id, firstName, lastName, email }) {
        const { users } = this.state;
        if (Boolean(id)) {
            //Edit existing user
            const existingUserIndex = users.findIndex(
                user => user.get("id") === id
            );
            if (existingUserIndex > -1) {
                const updatedUser = users
                    .get(existingUserIndex)
                    .merge({ firstName, lastName, email });
                this.setState({
                    users: users.set(existingUserIndex, updatedUser),
                    openDialog: false,
                    selectedUser: null
                });
            } else {
                //Cannot find existing user, create new user instead
                this.setState({
                    users: users.push(
                        Map({ id: uuidv4(), firstName, lastName, email })
                    ),
                    openDialog: false,
                    selectedUser: null
                });
            }
        } else {
            this.setState({
                users: users.push(
                    Map({ id: uuidv4(), firstName, lastName, email })
                ),
                openDialog: false
            });
        }
    }

    componentDidMount() {
        //Do API Call here
        this.getEmployees();
    }

    getDeletedUsers() {
        const { usersToBeDeleted, users } = this.state;
        return users
            .filter(user => usersToBeDeleted.includes(user.get("id")))
            .toJS();
    }

    logoutAction() {
        const { history } = this.props;
        logout();
        history.push(LOGIN_URL);
    }

    renderEmployeeTable() {
        const users = this.state.users.toJS();
        return (
            <TableContainerDiv>
                <MaterialTable
                    data={users}
                    title="EMPLOYEE LIST"
                    columns={[
                        { title: "FIRST NAME", field: "firstName" },
                        { title: "LAST NAME", field: "lastName" },
                        { title: "EMAIL", field: "email" },
                        {
                            title: "EDIT",
                            render: ({ id, firstName, lastName, email }) => (
                                <IconButton
                                    onClick={this.openEditDialog({
                                        id,
                                        firstName,
                                        lastName,
                                        email
                                    })}
                                >
                                    <EditIcon />
                                </IconButton>
                            )
                        },
                        {
                            title: "DELETE",
                            render: rowData => (
                                <IconButton>
                                    <DeleteIcon
                                        onClick={this.openDeleteDialog([
                                            { ...rowData }
                                        ])}
                                    />
                                </IconButton>
                            )
                        }
                    ]}
                    actions={[
                        {
                            icon: "add",
                            tooltip: "Add New Employee",
                            isFreeAction: true,
                            onClick: this.openCreateDialog
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete Existing Employee",
                            isFreeAction: false,
                            onClick: (_event, users) =>
                                this.setState({
                                    openDialog: true,
                                    usersToBeDeleted: users.map(({ id }) => id)
                                })
                        }
                    ]}
                    options={{ pageSizeOptions: [5], selection: true }}
                />
            </TableContainerDiv>
        );
    }

    render() {
        const {
            openDialog,
            status,
            usersToBeDeleted,
            selectedUser
        } = this.state;
        return (
            <ContainerDiv
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <HeaderTitleDivModified>
                    <div style={{ width: "80%" }}>PRIVATE PAGE</div>
                    <div style={{ width: "10%" }}>
                        <Button
                            style={{
                                color: "red",
                                backgroundColor: "white",
                                border: "2px solid red",
                                borderRadius: "5px",
                                fontSize: "20pt"
                            }}
                            onClick={this.logoutAction}
                            color="secondary"
                            fullWidth={true}
                        >
                            LOGOUT
                        </Button>
                    </div>
                </HeaderTitleDivModified>
                {status !== SUCCESS_CODE ? (
                    <Loading />
                ) : (
                    this.renderEmployeeTable()
                )}
                {openDialog &&
                Array.isArray(usersToBeDeleted) &&
                usersToBeDeleted.length > 0 ? (
                    <DeleteDialog
                        deleteAction={this.deleteUsers}
                        cancelAction={this.closeDialog}
                        users={this.getDeletedUsers()}
                    />
                ) : (
                    <React.Fragment>
                        {openDialog && (
                            <CreateModifyDialog
                                submitAction={this.addOrModifyUser}
                                cancelAction={this.closeDialog}
                                user={selectedUser}
                            />
                        )}
                    </React.Fragment>
                )}
            </ContainerDiv>
        );
    }
}

export default Private;
