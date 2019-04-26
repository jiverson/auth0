import { InputBase, Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import SearchIcon from "@material-ui/icons/Search";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import QuoteStore from "../stores/QuoteStore";

interface Props extends WithStyles<typeof styles> {
  store?: QuoteStore;
}

@inject("store")
@observer
class QuoteSearch extends Component<Props> {
  render() {
    const { classes } = this.props;
    const store = this.props.store!;
    return (
      <div className={classes.root}>
        <div className={classes.icon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={({ target }) => store.searchItem(target.value)}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
        />
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
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    },
    icon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      width: 200
    }
  });

export default withStyles(styles)(QuoteSearch);
