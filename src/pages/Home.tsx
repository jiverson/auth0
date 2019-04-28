import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import withRoot from "../components/withRoot";
import AuthStore from "../stores/AuthStore";

interface Props extends WithStyles<typeof styles> {
  authStore?: AuthStore;
}

@inject("authStore")
@observer
class Home extends Component<Props> {
  render() {
    console.log(this.props);
    const { isAuthenticated, login, expiryDate } = this.props.authStore!;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {isAuthenticated && (
          <div>
            <h4>You are logged in!</h4>
            <h3>About Your Access Token</h3>
            <p>
              Your <code>access_token</code> has an expiry date of: {expiryDate}
            </p>
            <p>
              The token has been scheduled for renewal, but you can also renew it manually from the navbar if you don't
              want to wait. This manual renewal button is really just for demonstration and you probably won't want such
              a control in your actual application.
            </p>
          </div>
        )}
        {!isAuthenticated && (
          <h4>
            You are not logged in! Please{" "}
            <a style={{ cursor: "pointer" }} onClick={login.bind(this)}>
              Log In
            </a>{" "}
            to continue.
          </h4>
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
      display: "flex",
      width: "100%",
      height: "100%"
    }
  });

export default withRoot(withStyles(styles)(Home));
