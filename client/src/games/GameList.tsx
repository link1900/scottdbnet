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
import { useGreyBody } from "../home/useBackgroundColor";
import { gameDefinitions, GameLinkType } from "./gameDefinitons";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const goToPage = async (
    location: string,
    linkType: GameLinkType = "react"
  ) => {
    if (linkType === "unity") {
      window.location.href = "/unity/" + location;
    } else {
      navigate(location);
    }
  };

  return (
    <Page title={"Games"}>
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
                      onClick={() =>
                        goToPage(gameDefinition.name, gameDefinition.linkType)
                      }
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
