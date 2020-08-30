import React from 'react';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { resultsState, EventInfo } from '../states/results';

const useStyles = makeStyles({
  cardActionArea: {
    padding: 14,
  },
  sep: {
    color: '#999',
  },
});

const EventListItem: React.FC<{ event: EventInfo }> = ({ event }) => {
  const classes = useStyles();
  const startedAt = dayjs(event.started_at).format('YYYY/MM/DD (ddd) H:mm');
  const updatedAt = dayjs(event.updated_at).format('YYYY/MM/DD H:mm');

  return (
    <Card>
      <Link href={event.event_url} underline="none" color="inherit" target="_blank">
        <CardActionArea className={classes.cardActionArea}>
          <Grid container spacing={2}>
            <Grid item xs={8} sm={9}>
              <Typography variant="subtitle2">{startedAt} ~</Typography>
            </Grid>

            <Grid item xs={4} sm={3}>
              <Typography align="right">
                {event.accepted + event.waiting}
                {event.limit !== null && ` / ${event.limit}`}人
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" color="primary">
            {event.title}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {event.catch}
          </Typography>

          <Grid container>
            <Grid item xs={12} sm="auto">
              <Typography variant="caption">{event.address}</Typography>
            </Grid>

            <Hidden only="xs">
              <span className={classes.sep}>｜</span>
            </Hidden>

            <Grid item xs={12} sm="auto">
              <Typography variant="caption">{event.place}</Typography>
            </Grid>
          </Grid>

          <Typography variant="caption">更新: {updatedAt}</Typography>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const EventList: React.FC = () => {
  const { events } = useRecoilValue(resultsState);

  if (!events.length) {
    return <Typography align="center">No Events Found</Typography>;
  }

  return (
    <Grid container spacing={1}>
      {events.map(ev => (
        <Grid item xs={12} key={ev.event_url}>
          <EventListItem event={ev} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;
