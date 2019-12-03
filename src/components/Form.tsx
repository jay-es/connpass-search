import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { setYear, setMonth, setCities, setKeyword } from '../stores/form';
import cityNames from '../utils/cityNames';
import './Form.css';

const thisYear = new Date().getFullYear();
const yearOptions = [...Array(7)].map((_, i) => thisYear - 3 + i);
const monthOptions = [...Array(12)].map((_, i) => i + 1);

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const keyword = useSelector<RootState, string>(state => state.form.keyword);
  const cities = useSelector<RootState, string[]>(state => state.form.cities);
  const year = useSelector<RootState, number>(state => state.form.year);
  const month = useSelector<RootState, number>(state => state.form.month);

  const handleKeywordChange = (event: ChangeEvent<{ value: unknown }>): void => {
    dispatch(setKeyword(event.target.value as string));
  };

  const handleCitiesChange = (event: ChangeEvent<{ value: unknown }>): void => {
    dispatch(setCities(event.target.value as string[]));
  };

  const handleYearChange = (event: ChangeEvent<{ value: unknown }>): void => {
    dispatch(setYear(event.target.value as number));
  };

  const handleMonthChange = (event: ChangeEvent<{ value: unknown }>): void => {
    dispatch(setMonth(event.target.value as number));
  };

  const handleButtonClick = (): void => {};

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item className="Form-kw" xs={12} sm={9} md={3}>
        <FormControl margin="normal" fullWidth>
          <TextField label="Keyword" value={keyword} onChange={handleKeywordChange} />
        </FormControl>
      </Grid>

      <Grid item className="Form-city" xs={12} sm={9} md={5}>
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

      <Grid item className="Form-ym" xs="auto">
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
          <Select value={month} onChange={handleMonthChange}>
            {monthOptions.map(m => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item className="Form-btn" xs="auto">
        <FormControl margin="normal">
          <Button
            color="primary"
            variant="contained"
            onClick={handleButtonClick}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Form;
