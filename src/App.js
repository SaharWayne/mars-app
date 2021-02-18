import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AboutPage from 'pages/AboutPage';
import ImagesPage from 'pages/ImagesPage';
import WeatherPage from 'pages/WeatherPage';

import { pathNames } from 'shared/routes/consts';

const App = () => (
  <Router>
    <Switch>
      <Route path={pathNames.ABOUT} component={AboutPage}/>
      <Route path={pathNames.IMAGES} component={ImagesPage}/>
      <Route path={pathNames.WEATHER} component={WeatherPage}/>
      <Redirect to={pathNames.ABOUT}/>
    </Switch>
  </Router>
);

export default App;
