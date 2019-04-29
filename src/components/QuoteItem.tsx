import { createStyles, Theme, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import QuoteModel from "../models/QuoteModel";
import AuthStore from "../stores/AuthStore";
import QuoteStore from "../stores/QuoteStore";

interface Props extends WithStyles<typeof styles> {
  store?: QuoteStore;
  authStore?: AuthStore;
}

@inject("store", "authStore")
@observer
class QuoteItem extends Component<Props> {
  render() {
    const { classes } = this.props;
    const store = this.props.store!;
    const { isAuthenticated } = this.props.authStore!;
    return (
      <div>
        {store.selectedQuote && (
          <div>
            <Typography variant="h4" gutterBottom>
              {store.selectedQuote.authorName || `An ${QuoteModel.defaultAuthorName.toLowerCase()} author`} said...
            </Typography>
            <Typography variant="h6">"{store.selectedQuote.text}"</Typography>
          </div>
        )}
        {isAuthenticated && (
          <div>
            <Fab color="primary" className={classes.fab}>
              <AddIcon />
            </Fab>
            <Fab color="secondary" className={classes.fab}>
              <EditIcon />
            </Fab>
          </div>
        )}
      </div>
    );
  }
}

// ---
// STYLES
// ---
const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "calc(100vh - 128px)",
      backgroundColor: theme.palette.background.paper
    },
    fab: {
      margin: theme.spacing.unit
    },
    authorName: {
      fontStyle: "italic"
    }
  });

export default withStyles(styles)(QuoteItem);
