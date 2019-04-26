import { createStyles, Theme } from "@material-ui/core";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import QuoteStore from "../stores/QuoteStore";
import QuoteListItem, { DataType } from "./QuoteListItem";

// https://react-window.now.sh/#/examples/list/memoized-list-items

interface Props extends WithStyles<typeof styles> {
  store?: QuoteStore;
}

@inject("store")
@observer
class QuoteList extends Component<Props> {
  itemStatusMap = {};

  handleSelectedItem = (id?: number) => {
    if (id) {
      this.props.store!.selectQuote(id);
    }
    // TODO: Else clear all selctions
  };

  loadMoreItems = async (startIndex, stopIndex) => {
    const { isNextPageLoading } = this.props.store!;
    return await this.props.store!.loadQuotes("foo");
  };

  isItemLoaded = (index) => {
    const { quotes: items, hasNextPage } = this.props.store!;
    return !hasNextPage || index < items.length;
  };

  itemKey = (index, { items }) => {
    if (items[index]) {
      return items[index].id;
    }

    return -1;
  };

  render() {
    const { classes } = this.props;
    const { quotes: items, hasNextPage } = this.props.store!;
    const itemData: DataType = { items, onItemSelect: this.handleSelectedItem };
    const itemCount = hasNextPage ? items.length + 1 : items.length;

    return (
      <div className={classes.root}>
        <AutoSizer>
          {({ width, height }) => (
            <InfiniteLoader isItemLoaded={this.isItemLoaded} itemCount={itemCount} loadMoreItems={this.loadMoreItems}>
              {({ onItemsRendered, ref }) =>
                items.length > 0 && (
                  <List
                    // itemKey={this.itemKey}
                    itemData={itemData}
                    width={width}
                    height={height}
                    itemCount={itemCount}
                    itemSize={itemSize}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {QuoteListItem}
                  </List>
                )
              }
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
    );
  }
}

// ---
// STYLES
// ---
const headerHeight = 130;
const itemSize = 64;
const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: `calc(100vh - ${headerHeight}px)`,
      width: 399,
      backgroundColor: theme.palette.background.paper
    }
  });

export default withStyles(styles)(QuoteList);
