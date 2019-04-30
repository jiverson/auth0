import { IconButton, InputBase, Paper, Theme } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import SearchIcon from "@material-ui/icons/Search";
import debounce from "lodash.debounce";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { QUOTE_MIN_SEARCH } from "../constants";
import QuoteStore from "../stores/QuoteStore";

interface Props extends WithStyles<typeof styles> {
  store?: QuoteStore;
}

@inject("store")
@observer
class QuoteFilter extends Component<Props> {
  filterItem: any;

  componentWillMount() {
    const store = this.props.store!;
    this.filterItem = debounce(({ target }) => {
      store.filterItem("author", target.value);
    }, 500);
  }

  handleInputChange = (e) => {
    if (!e.target.value) {
      // TODO: Nice to have - add in empty list set
    }
    if (e.target.value.length < QUOTE_MIN_SEARCH) {
      return;
    }
    e.persist();
    this.filterItem(e);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase onChange={this.handleInputChange} className={classes.input} placeholder="Filter by author..." />
        <IconButton className={classes.iconButton}>
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

// ---
// STYLES
// ---
const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    input: {
      marginLeft: 8,
      flex: 1
    }
  });

export default withStyles(styles)(QuoteFilter);
