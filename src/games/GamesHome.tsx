import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { gameDefinitions } from './gameDefinitons';
import { SubtitleText } from '../UI/SubtitleText';
import { FlatLink } from '../UI/FlatLink';

interface Props extends RouteComponentProps<any> {}

interface State {}

const PageFlow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PageTitle = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
`;

const GameTileContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const GameTileCard = styled(Card)`
    height: 250px;
    width: 300px;
    margin: 10px;
`;

const GameTileCardMedia = styled(CardMedia)`
    height: 80%;
`;

export default class GamesHome extends React.Component<Props, State> {
    public render() {
        const { match } = this.props;
        return (
            <PageFlow>
                <PageTitle style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                    <Typography variant="headline">Click on a game to play!</Typography>
                </PageTitle>
                <GameTileContainer>
                    {gameDefinitions.map(gameInfo => (
                        <FlatLink to={`${match.url}/${gameInfo.name}`}>
                            <GameTileCard key={gameInfo.name}>
                                <GameTileCardMedia image={gameInfo.image} title={gameInfo.title} />
                                <CardContent>
                                    <SubtitleText>{gameInfo.title}</SubtitleText>
                                </CardContent>
                            </GameTileCard>
                        </FlatLink>
                    ))}
                </GameTileContainer>
            </PageFlow>
        );
    }
}
