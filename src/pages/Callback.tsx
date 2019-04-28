import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import React, { Component } from "react";
import withRoot from "../components/withRoot";
import AuthStore from "../stores/AuthStore";
import loading from "./loading.svg";

interface Props extends WithStyles<typeof styles> {
  authStore?: AuthStore;
  routing?: RouterStore;
}

@inject("authStore", "routing")
@observer
class Callback extends Component<Props> {
  constructor(props: Props) {
    super(props);
    const { location } = this.props.routing!;
    const { handleAuthentication } = this.props.authStore!;

    if (/access_token|id_token|error/.test(location.hash)) {
      handleAuthentication();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <img src={loading} alt="loading" />
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
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white"
    }
  });

export default withRoot(withStyles(styles)(Callback));
