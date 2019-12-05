import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
// import 'dayjs/locale/ja';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { RootState } from '../stores/store';
import { EventInfo } from '../stores/results';

const useStyles = makeStyles({
  cardActionArea: {
    padding: 14,
  },
});

const EventListItem: React.FC<{ event: EventInfo }> = ({ event }) => {
  const classes = useStyles();
  const startedAt = dayjs(event.started_at).format('YYYY/MM/DD (ddd) H:mm');

  return (
    <Card>
      <Link href={event.event_url} underline="none" color="inherit">
        <CardActionArea className={classes.cardActionArea}>
          <Grid container spacing={2}>
            <Grid item xs={8} sm={9}>
              <Typography variant="subtitle2">{startedAt} ~</Typography>
            </Grid>

            <Grid item xs={4} sm={3}>
              <Typography align="right">
                {event.accepted}
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

          <Typography variant="caption" component="div">
            {event.address} {event.place}
          </Typography>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const EventList: React.FC = () => {
  const events = useSelector<RootState, EventInfo[]>(state => state.results.events);

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
