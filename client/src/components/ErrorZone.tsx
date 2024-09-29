import React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  Box
} from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";

interface Props {
  error?: Error;
}

interface State {
  error?: Error;
}

export class ErrorZone extends React.PureComponent<Props, State> {
  public state: State = {};

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error });
  }

  public render() {
    const { children, error: propsError } = this.props;
    const { error: stateError } = this.state;
    const error = stateError ?? propsError ?? undefined;
    if (error) {
      return (
        <Container>
          <Grid container direction={"column"} alignItems={"center"}>
            <Grid item xs={6}>
              <Box height={128} />
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Grid
                    container
                    direction={"column"}
                    alignItems={"center"}
                    spacing={2}
                  >
                    <Grid item>
                      <ErrorIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" gutterBottom>
                        Sorry, something went wrong!
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => window.location.reload()}
                        data-id="button-reload-page"
                      >
                        Try again
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      );
    }

    return children;
  }
}
