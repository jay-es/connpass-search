import React from 'react';
import { useRecoilValue } from 'recoil';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { resultsState } from '../states/results';
import { useFetchEvents } from '../utils/useFetchEvents';

const count = 10;

const Pagination: React.FC = () => {
  const {
    events,
    results_available: resultsAvailable,
    results_start: resultsStart,
    results_returned: resultsReturned,
  } = useRecoilValue(resultsState);
  const fetchEvents = useFetchEvents();

  const current = events.length ? `${resultsStart}-${resultsStart + resultsReturned - 1}` : '0';
  const prev = resultsStart - count;
  const next = resultsStart + count;
  const last = Math.floor(resultsAvailable / count) * count + 1;
  const hasNext = next > resultsAvailable;

  const handleClick = (start: number) => () => {
    fetchEvents(start);

    const results = document.getElementById('results') as HTMLElement;
    const { top } = results.getBoundingClientRect();
    window.scrollBy({ top, behavior: 'smooth' });
  };

  return (
    <Box textAlign="center">
      <IconButton aria-label="First" color="primary" disabled={prev < 1} onClick={handleClick(1)}>
        <FirstPageIcon />
      </IconButton>
      <IconButton aria-label="Prev" color="primary" disabled={prev < 1} onClick={handleClick(prev)}>
        <NavigateBeforeIcon />
      </IconButton>
      {current} of {resultsAvailable}
      <IconButton aria-label="Next" color="primary" disabled={hasNext} onClick={handleClick(next)}>
        <NavigateNextIcon />
      </IconButton>
      <IconButton aria-label="Last" color="primary" disabled={hasNext} onClick={handleClick(last)}>
        <LastPageIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
