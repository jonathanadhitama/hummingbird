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
import { renderTextField, GOOGLE_PLACES_URL, SUCCESS_CODE } from "../../utils";
import { withStyles } from "@material-ui/core/styles";
import validationSchema from "./validationSchema";
import axios from "axios";

const SectionContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    const [status, setStatus] = useState(null);
    return (
        <ContainerDiv
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <HeaderTitleDiv>HOME PAGE</HeaderTitleDiv>
            <SectionContainerDiv>
                <Formik
                    onSubmit={({ search }, { setSubmitting }) => {
                        setSubmitting(true);
                        axios
                            .create({
                                headers: {
                                    "Access-Control-Allow-Origin": "*"
                                }
                            })
                            .get(GOOGLE_PLACES_URL, {
                                params: {
                                    input: search,
                                    key: process.env.REACT_APP_MAPS_API
                                },
                                crossdomain: true
                            })
                            .then(({ data, status }) => {
                                if (status === SUCCESS_CODE) {
                                    setStatus(status);
                                    setSearchResult(data);
                                    setSubmitting(false);
                                }
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
        </ContainerDiv>
    );
};

export default withStyles(styles)(Home);
