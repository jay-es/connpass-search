import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import EventList from './components/EventList';
import Form from './components/Form';
import Header from './components/Header';
import Pagination from './components/Pagination';

const theme = createMuiTheme({
  palette: { primary: { main: '#a8230b' } },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <Box mt={6}>
        <Container maxWidth="lg">
          <Form />
        </Container>
      </Box>

      <Box id="results" bgcolor="grey.100" mt={2} py={3}>
        <Container maxWidth="md">
          <EventList />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Pagination />
      </Container>

      <Box mt={1} pb={2}>
        <Typography component="footer" variant="caption" align="center">
          &copy; J. Shindo
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
