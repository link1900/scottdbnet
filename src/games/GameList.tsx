import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SitePage } from "../components/SitePage";
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
  const classes = useStyles();
  const history = useHistory();
  let { url } = useRouteMatch();

  const goToPage = async (location: string) => {
    history.push(location);
  };

  return (
    <SitePage>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Box paddingTop={4}>
            <Typography variant="h5">Click on game to play!</Typography>
          </Box>
        </Grid>
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
    </SitePage>
  );
}
