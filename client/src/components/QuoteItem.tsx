import { createStyles, Theme, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { inject, observer } from "mobx-react";
import React, { Component, Fragment } from "react";
import QuoteModel from "../models/QuoteModel";
import QuoteStore from "../stores/QuoteStore";
import QuoteForm from "./QuoteForm";

interface Props extends WithStyles<typeof styles> {
  store?: QuoteStore;
}

@inject("store")
@observer
class QuoteItem extends Component<Props, { mode: string }> {
  constructor(props: Props) {
    super(props);
    this.state = { mode: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleMode = this.handleMode.bind(this);
  }

  async handleMode(type: "add" | "edit" | "delete") {
    const store = this.props.store!;

    if (type === "add") {
      this.setState({ mode: "add" });
      store.selectQuote("");
      return;
    }

    if (type === "edit") {
      this.setState({ mode: "edit" });
      return;
    }

    if (type === "delete") {
      this.setState({ mode: "" });
      const store = this.props.store!;
      store.deleteMyQuote(store.selectedQuote.id);
      return;
    }
  }

  async handleSubmit({ id, authorName, text }: { id?: string | number; authorName: string; text: string }) {
    const store = this.props.store!;
    if (!id) {
      await store.createMyQuote(authorName, text);
      this.setState({ mode: "" });
      return;
    }

    if (id !== store.selectedQuote.id) {
      return;
    }

    await store.updateMyQuote(id, authorName, text);
    this.setState({ mode: "" });
  }

  handleCancel() {
    this.setState({ mode: "" });
  }

  render() {
    const { classes } = this.props;
    const { selectedQuote, isMyQuoteList } = this.props.store!;
    const { mode } = this.state;
    return (
      <div className={classes.root}>
        {selectedQuote && (
          <Fragment>
            <Typography variant="h4" gutterBottom>
              {selectedQuote.authorName || `An ${QuoteModel.defaultAuthorName.toLowerCase()} author`} said...
            </Typography>
            <Typography variant="h6" gutterBottom>
              {selectedQuote.text ? `"${selectedQuote.text}"` : ""}
            </Typography>
          </Fragment>
        )}
        {isMyQuoteList && (
          <div className={classes.fabContainer}>
            <Fab color="primary" size="medium" className={classes.fab} onClick={() => this.handleMode("add")}>
              <AddIcon />
            </Fab>
            {selectedQuote && (
              <Fragment>
                <Fab color="secondary" size="medium" className={classes.fab} onClick={() => this.handleMode("edit")}>
                  <EditIcon />
                </Fab>
                <Fab className={classes.fab} size="medium" onClick={() => this.handleMode("delete")}>
                  <DeleteIcon />
                </Fab>
              </Fragment>
            )}
          </div>
        )}
        {mode === "edit" && (
          <QuoteForm selectedQuote={selectedQuote} onSubmit={this.handleSubmit} onCancel={this.handleCancel} />
        )}
        {mode === "add" && <QuoteForm onSubmit={this.handleSubmit} onCancel={this.handleCancel} />}
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
      marginTop: theme.spacing.unit * 3
    },
    fabContainer: {
      position: "absolute",
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2
    },
    fab: {
      margin: theme.spacing.unit
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    authorName: {
      fontStyle: "italic"
    }
  });

export default withStyles(styles)(QuoteItem);
