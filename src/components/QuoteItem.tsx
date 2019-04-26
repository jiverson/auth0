import { createStyles, Theme, Typography } from "@material-ui/core";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import QuoteModel from "../models/QuoteModel";
import QuoteStore from "../stores/QuoteStore";

interface Props extends WithStyles<typeof styles> {
  store?: QuoteStore;
}

@inject("store")
@observer
class QuoteItem extends Component<Props> {
  render() {
    const { classes } = this.props;
    const store = this.props.store!;
    return (
      <>
        {store.selectedQuote && (
          <div>
            <Typography variant="h4" gutterBottom>
              {store.selectedQuote.authorName || `An ${QuoteModel.defaultAuthorName} author`} said...
            </Typography>
            <Typography variant="h6">"{store.selectedQuote.text}"</Typography>
          </div>
        )}
      </>
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
    authorName: {
      fontStyle: "italic"
    }
  });

export default withStyles(styles)(QuoteItem);
