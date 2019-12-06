import React, { KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { RootState } from '../stores/store';
import { setYear, setMonth, setOrder, setCities, setKeyword, FormState } from '../stores/form';
import cityNames from '../utils/cityNames';
import fetchEvents from '../utils/fetchEvents';

const useStyles = makeStyles({
  month: {
    width: 42,
  },
  order: {
    width: 104,
  },
  btn: {
    marginTop: 28,
  },
  searchIcon: {
    marginRight: 0,
  },
});

const startYear = 2010;
const nextYear = new Date().getFullYear() + 1;
const yearOptions = [...Array(nextYear - startYear + 1)].map((_, i) => startYear + i);
const monthOptions = [...Array(12)].map((_, i) => i + 1);

type ChangeEvent = React.ChangeEvent<{ value: unknown }>;
type Handler = (event: ChangeEvent) => void;
const useFormState = <T extends keyof FormState>(key: T): [FormState[T], Handler] => {
  const dispatch = useDispatch();
  const val = useSelector<RootState, FormState[T]>(state => state.form[key]);
  const handlers = {
    year: (event: ChangeEvent) => dispatch(setYear(event.target.value as number)),
    month: (event: ChangeEvent) => dispatch(setMonth(event.target.value as number)),
    order: (event: ChangeEvent) => dispatch(setOrder(event.target.value as number)),
    cities: (event: ChangeEvent) => dispatch(setCities(event.target.value as string[])),
    keyword: (event: ChangeEvent) => dispatch(setKeyword(event.target.value as string)),
  };

  return [val, handlers[key]];
};

const Form: React.FC = () => {
  const classes = useStyles();
  const [year, handleYearChange] = useFormState('year');
  const [month, handleMonthChange] = useFormState('month');
  const [order, handleOrderChange] = useFormState('order');
  const [cities, handleCitiesChange] = useFormState('cities');
  const [keyword, handleKeywordChange] = useFormState('keyword');

  const handleKeywordKeydown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      fetchEvents();
    }
  };

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item xs={12} md="auto">
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Keyword"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeywordKeydown}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl margin="normal" fullWidth>
          <InputLabel>City</InputLabel>
          <Select
            value={cities}
            multiple
            onChange={handleCitiesChange}
            renderValue={selected => (selected as string[]).join(', ')}
          >
            {cityNames.map(c => (
              <MenuItem key={c} value={c}>
                <Checkbox color="primary" checked={cities.includes(c)} />
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs="auto">
        <FormControl margin="normal">
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={handleYearChange}>
            {yearOptions.map(y => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="normal">
          <InputLabel>Month</InputLabel>
          <Select className={classes.month} value={month} onChange={handleMonthChange}>
            {monthOptions.map(m => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs="auto">
        <FormControl margin="normal">
          <InputLabel>Order</InputLabel>
          <Select className={classes.order} value={order} onChange={handleOrderChange}>
            <MenuItem value={3}>新着順</MenuItem>
            <MenuItem value={2}>開催日降順</MenuItem>
            <MenuItem value={1}>更新日時順</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs="auto">
        <Button
          className={classes.btn}
          color="primary"
          variant="contained"
          onClick={() => fetchEvents()}
          startIcon={<SearchIcon className={classes.searchIcon} />}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default Form;
