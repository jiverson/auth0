import { Avatar, Theme, Typography } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { inject, observer } from "mobx-react";
import React, { Component, Fragment } from "react";
import AuthStore from "../stores/AuthStore";

interface Props extends WithStyles<typeof styles> {
  authStore?: AuthStore;
}

@inject("authStore")
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

    return (
      <Fragment>
        {name && <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>}
        <Typography component="span" className={classes.inline} color="textPrimary">
          {name}
        </Typography>
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
    inline: {
      display: "inline"
    }
  });

export default withStyles(styles)(Profile);
