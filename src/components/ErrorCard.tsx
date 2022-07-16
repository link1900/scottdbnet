import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { ErrorMessage } from './ErrorMessage';

interface Props {
  message?: string;
}

export function ErrorCard(props: Props) {
  const { message = 'There was an unexpected error' } = props;
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Error
        </Typography>
        <ErrorMessage message={message} />
      </CardContent>
    </Card>
  );
}
