import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import AppStore from "../stores/AppStore";
import withRoot from "../withRoot";

interface Props extends WithStyles<typeof styles> {
  store?: AppStore;
}

@inject("store")
@observer
class App extends Component<Props> {
  render() {
    const { classes } = this.props;
    const store = this.props.store!;
    return (
      <div className={classes.root}>
        <Dialog open={store.open} onClose={() => store.handleClose()}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => store.handleClose()}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          example project
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => store.handleClick()}
        >
          Super Secret Password
        </Button>
      </div>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing.unit * 20
    }
  });

export default withRoot(withStyles(styles)(App));
