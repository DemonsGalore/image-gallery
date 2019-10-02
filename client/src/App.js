import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './global';
import { Gallery, NotFound, FileUpload } from './pages';
import { Navigation } from './layout';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <Navigation />
        <main>
          <Switch>
            <Route exact path="/" component={FileUpload} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/upload" component={FileUpload} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
