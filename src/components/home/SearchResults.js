import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    listRootStyle: {
        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)"
    }
});

const SearchResult = ({ data, classes }) => {
    const { predictions = [] } = data || {};
    if (Array.isArray(predictions) && predictions.length > 0) {
        return (
            <React.Fragment>
                <h4 style={{ paddingRight: 10 }}>SEARCH RESULTS</h4>
                <List className={classes.listRootStyle}>
                    {predictions.map(
                        ({
                            id,
                            structured_formatting: { main_text, secondary_text }
                        }) => (
                            <ListItem key={id} divider>
                                <ListItemText
                                    primary={main_text}
                                    secondary={secondary_text}
                                />
                            </ListItem>
                        )
                    )}
                </List>
            </React.Fragment>
        );
    } else {
        return <React.Fragment />;
    }
};

SearchResult.propTypes = {
    data: PropTypes.object
};

export default withStyles(styles)(SearchResult);
