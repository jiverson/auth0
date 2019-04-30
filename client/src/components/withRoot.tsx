import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React, { ComponentType } from "react";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 3
      }
    }
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#eb5424"
    },
    secondary: {
      main: "#009E74" // not sure
    }
  }
});

function withRoot<P>(Component: ComponentType<P>) {
  function WithRoot(props: P) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
