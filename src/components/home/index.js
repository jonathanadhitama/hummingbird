import React, { useState } from "react";
import {
    ContainerDiv,
    HeaderTitleDiv,
    FormContainerDiv,
    FieldContainerDiv
} from "../../commonStyles";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { renderTextField, SUCCESS_CODE, MIDDLEWARE_URL } from "../../utils";
import { withStyles } from "@material-ui/core/styles";
import validationSchema from "./validationSchema";
import axios from "axios";
import ErrorNotification from "../error/ErrorNotification";
import SearchResults from "./SearchResults";

const SectionContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchResultContainer = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
`;

const styles = () => ({
    searchButton: {
        color: "#2699FB",
        backgroundColor: "white",
        border: "2px solid #2699FB",
        width: "100%",
        fontSize: "20px",
        fontWeight: 600,
        padding: "10px 0"
    }
});

const Home = ({ classes }) => {
    const [searchResults, setSearchResult] = useState(null);
    const [status, setStatus] = useState(SUCCESS_CODE);
    const [errorMessage, setErrorMessage] = useState("");
    return (
        <ContainerDiv flexDirection="column" alignItems="center">
            <HeaderTitleDiv>HOME PAGE</HeaderTitleDiv>
            <SectionContainerDiv>
                <Formik
                    onSubmit={({ search }, { setSubmitting }) => {
                        setSubmitting(true);
                        axios
                            .get(MIDDLEWARE_URL, {
                                params: {
                                    input: search
                                }
                            })
                            .then(({ data, status }) => {
                                setStatus(status);
                                setSearchResult(data);
                                setErrorMessage("");
                                setSubmitting(false);
                            })
                            .catch(({ status, message }) => {
                                setStatus(status);
                                setSearchResult(null);
                                setErrorMessage(message);
                                setSubmitting(false);
                            });
                    }}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting }) => (
                        <FormContainerDiv>
                            <Form>
                                <FieldContainerDiv>
                                    {renderTextField(
                                        "search",
                                        true,
                                        "text",
                                        "SEARCH PLACE"
                                    )}
                                </FieldContainerDiv>
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    className={classes.searchButton}
                                    disabled={isSubmitting}
                                >
                                    SEARCH
                                </Button>
                            </Form>
                        </FormContainerDiv>
                    )}
                </Formik>
            </SectionContainerDiv>
            <SearchResultContainer>
                <SearchResults data={searchResults} />
            </SearchResultContainer>
            <ErrorNotification
                error={status !== SUCCESS_CODE}
                message={errorMessage}
            />
        </ContainerDiv>
    );
};

export default withStyles(styles)(Home);
