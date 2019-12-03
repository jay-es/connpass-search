import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import EventList from './components/EventList';
import Form from './components/Form';

const theme = createMuiTheme({
  palette: { primary: { main: '#a8230b' } },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Typography component="h1" variant="h6" align="center">
          connpass.tokyo
        </Typography>
      </AppBar>

      <Container maxWidth="lg">
        <Form />
      </Container>
      <Box bgcolor="grey.100" my={2} py={3}>
        <Container maxWidth="md">
          <EventList />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
