import { AppBar, Button, Divider, Drawer, Toolbar, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import AuthStore from "../stores/AuthStore";
import QuoteStore from "../stores/QuoteStore";
import Profile from "./Profile";
import QuoteFilter from "./QuoteFilter";
import QuoteItem from "./QuoteItem";
import QuoteList from "./QuoteList";
import withRoot from "./withRoot";

interface Props extends WithStyles<typeof styles> {
  store?: QuoteStore;
  authStore?: AuthStore;
}

@inject("store", "authStore")
@observer
class App extends Component<Props> {
  render() {
    const { classes } = this.props;
    const { isAuthenticated, login, logout } = this.props.authStore!;
    const store = this.props.store!;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
              do not "quote" me
            </Typography>
            {isAuthenticated ? (
              <Button color="inherit" onClick={logout.bind(this)}>
                Log out
              </Button>
            ) : (
              <Button color="inherit" onClick={login.bind(this)}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbarIcon}>{isAuthenticated && <Profile />}</div>
          <Divider />
          {!store.isMyQuoteList && (
            <Toolbar className={classes.toolbar}>
              <QuoteFilter />
            </Toolbar>
          )}
          <Divider />
          <QuoteList />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <QuoteItem />
        </main>
      </div>
    );
  }
}

// ---
// STYLES
// ---
const drawerWidth = 400;
const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    appBarSpacer: theme.mixins.toolbar,
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: "100vh",
      overflow: "auto"
    },
    grid: {},
    appbar: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: {
      // backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  });

export default withRoot(withStyles(styles)(App));
