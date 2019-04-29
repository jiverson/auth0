import { createStyles, Theme } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import React, { PureComponent } from "react";
import QuoteModel from "../models/QuoteModel";

export type DataType = {
  items: Array<QuoteModel>;
  onItemSelect: (id: number | string) => void;
};

interface Props extends WithStyles<typeof styles> {
  data: DataType;
  style: any;
  index: number;
}

/* TODO: NTH
 * Add in a proper loading animation.
 * */
class QuoteListItem extends PureComponent<Props> {
  render() {
    const {
      data: { items, onItemSelect },
      index,
      style,
      classes
    } = this.props;
    const item = items[index] || new QuoteModel({ text: "Loading..." });
    return (
      <ListItem onClick={() => onItemSelect(item.id)} button style={style} className={classes.root}>
        <ListItemText
          primaryTypographyProps={{ noWrap: true }}
          primary={item.text}
          secondary={`— ${item.authorName || QuoteModel.defaultAuthorName}`}
        />
      </ListItem>
    );
  }
}

// ---
// STYLES
// ---
const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${theme.palette.primary.light}`,
      textAlign: "left",
      display: "flex",
      alignItems: "flex-start",
      overflow: "hidden"
    },
    authorName: {
      fontStyle: "italic"
    }
  });

export default withStyles(styles)(QuoteListItem);
