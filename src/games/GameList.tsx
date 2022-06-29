import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Page } from "../components/Page";
import { useGreyBody } from '../home/useBackgroundColor';
import { gameDefinitions } from "./gameDefinitons";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    height: "250px",
    width: "300px"
  },
  cardMedia: {
    height: "180px"
  }
});

export function GameList() {
  useGreyBody();
  const classes = useStyles();
  const history = useHistory();
  let { url } = useRouteMatch();

  const goToPage = async (location: string) => {
    history.push(location);
  };

  return (
    <Page>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {gameDefinitions.map((gameDefinition) => {
              return (
                <Grid key={gameDefinition.name} item>
                  <Card className={classes.card}>
                    <CardActionArea
                      onClick={() => goToPage(`${url}/${gameDefinition.name}`)}
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={gameDefinition.image}
                        title={gameDefinition.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {gameDefinition.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
