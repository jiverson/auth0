import { Button, createStyles, Grid, Paper, TextField, Theme, Typography } from "@material-ui/core";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { observer } from "mobx-react";
import React, { Component } from "react";
import QuoteModel from "../models/QuoteModel";
import QuoteStore from "../stores/QuoteStore";

interface Props extends WithStyles<typeof styles> {
  store?: QuoteStore;
  onSubmit: (values: { id?: number | string; authorName: string; text: string }) => void;
  onCancel: () => void;
  selectedQuote?: Partial<QuoteModel>;
}

interface State {
  authorName: string;
  text: string;
}

@observer
class QuoteForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authorName: "",
      text: ""
    };
  }

  componentWillMount() {
    const { selectedQuote } = this.props;
    this.setState({
      authorName: selectedQuote ? selectedQuote.authorName : "",
      text: selectedQuote ? selectedQuote.text : ""
    });
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    const { selectedQuote } = this.props;
    let id = null;

    if (selectedQuote && selectedQuote.id) {
      id = selectedQuote.id;
    }

    this.props.onSubmit({ id, ...this.state });
  };

  inputChangeHandler = (name: "authorName" | "text") => (event) => {
    this.setState({ [name]: event.target.value } as Pick<State, keyof State>);
  };

  render() {
    const { classes, onCancel, selectedQuote } = this.props;
    const { authorName, text } = this.state;
    return (
      <Paper className={classes.root}>
        <form noValidate autoComplete="off" onSubmit={this.submitFormHandler}>
          <Typography variant="h6">{selectedQuote ? "edit quote" : "add new quote"}</Typography>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="authorName"
                label="Author Name"
                value={authorName}
                className={classes.textField}
                onChange={this.inputChangeHandler("authorName")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="authorText"
                value={text}
                label="Quote..."
                multiline={true}
                rowsMax={4}
                onChange={this.inputChangeHandler("text")}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </Grid>
          <div className={classes.actions}>
            <Button type="button" onClick={() => onCancel()}>
              cancel
            </Button>
            <Button type="submit" color="primary">
              submit
            </Button>
          </div>
          {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        </form>
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
      marginTop: theme.spacing.unit * 2,
      width: 600,
      padding: theme.spacing.unit * 2
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end"
    },
    fabContainer: {
      position: "absolute",
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2
    },
    fab: {
      margin: theme.spacing.unit
    },
    textField: {},
    authorName: {
      fontStyle: "italic"
    }
  });

export default withStyles(styles)(QuoteForm);
