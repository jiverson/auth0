import { Avatar, Button, Theme, Typography } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { inject, observer } from "mobx-react";
import React, { Component, Fragment } from "react";
import AuthStore from "../stores/AuthStore";
import QuoteStore from "../stores/QuoteStore";

interface Props extends WithStyles<typeof styles> {
  authStore?: AuthStore;
  store?: QuoteStore;
}

@inject("authStore", "store")
@observer
class Profile extends Component<Props> {
  componentWillMount() {
    const { userProfile, getProfile } = this.props.authStore!;
    if (!userProfile) {
      getProfile((err, profile) => {
        // TODO
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { userProfile } = this.props.authStore!;
    const name = userProfile && userProfile.nickname;
    const { loadMyQuotes, isMyQuoteList, loadQuotes } = this.props.store!;
    return (
      <Fragment>
        {name && <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>}
        <Typography component="span" className={classes.inline} color="textPrimary">
          {name}
        </Typography>
        <div className={classes.spacer} />
        {!isMyQuoteList && (
          <Button
            size="small"
            className={classes.download}
            variant="contained"
            color="secondary"
            onClick={loadMyQuotes.bind(this.props.store!)}
          >
            <CloudDownloadIcon className={classes.downloadIcon} fontSize="small" />
            my quotes
          </Button>
        )}
        {isMyQuoteList && (
          <Button
            size="small"
            className={classes.download}
            variant="contained"
            color="secondary"
            onClick={loadQuotes.bind(this.props.store!)}
          >
            <CloudDownloadIcon className={classes.downloadIcon} fontSize="small" />
            all quotes
          </Button>
        )}
      </Fragment>
    );
  }
}

// ---
// STYLES
// ---
const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      margin: 10,
      textTransform: "capitalize"
    },
    spacer: {
      flexGrow: 1
    },
    inline: {
      display: "inline"
    },
    download: {
      margin: theme.spacing.unit
    },
    downloadIcon: {
      marginRight: theme.spacing.unit
    }
  });

export default withStyles(styles)(Profile);
